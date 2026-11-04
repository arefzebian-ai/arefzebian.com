// CMS query engine. Executes the query AST that the original runtime's code generator emits
// (`{ select, from, where, orderBy, limit, offset }`) against record sources.
//
// A record source is anything with a schema and a way to list its records —
// the `DatabaseCollection` objects bundled with each converted collection
// (binary CMS chunks on the asset CDN) or a `JsonCollection`
// built from plain records. Execution happens in two phases:
//   1. prepare: load the records of every collection the query mentions
//      (async; uses an index for `slug == "…"` style lookups when possible),
//   2. evaluate: run where / joins / subqueries / order / offset / limit
//      synchronously over the loaded records.
// Results come back "raw" (typed values, JSON-serialisable, used for the SSR
// handover) and are then resolved to plain props (rich text → React nodes).

import { ControlType } from "../content";
import { renderRichText, type RichTextOptions } from "./rich-text";
import {
  caseInsensitive,
  castValue,
  compareValues,
  equal,
  greaterOrEqual,
  greaterThan,
  indexOf,
  isIn,
  kindOf,
  lessOrEqual,
  lessThan,
  parseValue,
  textMatch,
  toBoolean,
  toNumber,
  typedValue,
  type TypeDefinition,
  type Value,
} from "./values";

// ---------------------------------------------------------------------------
// Record sources

export type FieldDefinition = TypeDefinition;

export interface CollectionItem {
  /** Stable record address; sources order records by it (see compareItems). */
  pointer: string;
  data: Record<string, Value | undefined>;
}

export interface IndexLookupResult {
  pointer: string;
}

/** An equality-lookup index over one field (the original runtime's DatabaseDictionaryIndex shape). */
export interface RecordIndex {
  options?: { fieldNames?: string[] };
  lookupItems(query: Array<{ type: "Equals" | "All"; value?: Value }>): Promise<IndexLookupResult[]>;
}

/**
 * The interface the engine needs from a collection. The original runtime's bundled
 * DatabaseCollection already satisfies it; `JsonCollection` below implements it
 * over plain records so a converter can ship CMS data as JSON instead.
 */
export interface RecordSource {
  id?: string;
  schema: Record<string, FieldDefinition>;
  /** All records, in collection order. */
  scanItems(): Promise<CollectionItem[]>;
  /** Records for specific pointers (used after index lookups). */
  resolveItems?(pointers: string[]): Promise<CollectionItem[]>;
  /** Collection order of two records. */
  compareItems?(left: CollectionItem, right: CollectionItem): number;
  indexes?: RecordIndex[];
  /** Turns a stored rich-text value into renderable content. */
  resolveRichText?(pointer: any): unknown;
  /** Turns a stored vector-set-item value into its icon component (usually async). */
  resolveVectorSetItem?(pointer: any): unknown;
}

type JsonRecords = Array<Record<string, unknown>>;

/**
 * Plain-JSON record source: `{ schema, records: [{ id, title: "…", tags: ["…"], … }] }`.
 * Records hold plain values; the schema types them (typedValue). `records` may be a
 * loader (`() => import("./journal.fr.json")`) so a locale's records are only
 * downloaded when a page in that locale queries them. Rich text is a JSON tree
 * (./rich-text.tsx) rendered with `richTextComponents`; a collection still on one of
 * The original runtime's rich-text readers passes it as `resolveRichText` instead.
 */
export class JsonCollection implements RecordSource {
  readonly id?: string;
  readonly schema: Record<string, FieldDefinition>;
  readonly indexes: RecordIndex[] = [];
  private items?: CollectionItem[];
  private loading?: Promise<CollectionItem[]>;
  private readonly source: JsonRecords | (() => Promise<{ default: JsonRecords } | JsonRecords>);
  private readonly richText?: (value: any) => unknown;
  private readonly richTextOptions: RichTextOptions;
  /** Rendered rich text by tree, so a value renders to the same elements every time (as the original runtime's reader caches them). */
  private readonly renderedRichText = new WeakMap<object, unknown>();
  private readonly vectorSetItem?: (value: any) => unknown;

  /** Field id -> key used in the records (records may use readable names). */
  private readonly keys: Record<string, string>;

  constructor(options: {
    id?: string;
    schema: Record<string, FieldDefinition>;
    records: JsonRecords | (() => Promise<{ default: JsonRecords } | JsonRecords>);
    /** Readable record key -> field id, e.g. { title: "UFw6v_1z7" }. Unlisted fields use their id. */
    fields?: Record<string, string>;
    /** Components rich text embeds (`{ "type": "component", "name": "YouTube" }`), by name. */
    richTextComponents?: RichTextOptions["components"];
    /** False for sites whose rich text embeds components without following the page's breakpoint (older readers). */
    componentsFollowBreakpoint?: boolean;
    /** The original runtime's rich-text reader, for values that are still its pointers. */
    resolveRichText?: (value: any) => unknown;
    resolveVectorSetItem?: (value: any) => unknown;
  }) {
    this.id = options.id;
    this.schema = options.schema;
    this.richText = options.resolveRichText;
    this.richTextOptions = { components: options.richTextComponents, followBreakpoint: options.componentsFollowBreakpoint };
    this.vectorSetItem = options.resolveVectorSetItem;
    this.keys = Object.fromEntries(Object.entries(options.fields ?? {}).map(([key, id]) => [id, key]));
    this.source = options.records;
    if (Array.isArray(options.records)) this.items = this.toItems(options.records);
  }

  private toItems(records: JsonRecords): CollectionItem[] {
    return records.map((record, index) => ({ pointer: String(index), data: this.toValues(record) }));
  }

  private load(): Promise<CollectionItem[]> | CollectionItem[] {
    if (this.items) return this.items;
    const loader = this.source as () => Promise<{ default: JsonRecords } | JsonRecords>;
    this.loading ??= loader().then((module) => (this.items = this.toItems(Array.isArray(module) ? module : module.default)));
    return this.loading;
  }

  private toValues(record: Record<string, unknown>): CollectionItem["data"] {
    const data: CollectionItem["data"] = {};
    for (const [name, definition] of Object.entries(this.schema)) {
      const value = typedValue(record[this.keys[name] ?? name], definition);
      if (value) data[name] = value;
    }
    return data;
  }

  async scanItems() {
    return this.load();
  }
  async resolveItems(pointers: string[]) {
    const items = await this.load();
    return pointers.map((pointer) => items[Number(pointer)]).filter(Boolean);
  }
  compareItems(left: CollectionItem, right: CollectionItem) {
    return Number(left.pointer) - Number(right.pointer);
  }
  resolveRichText(value: any) {
    if (this.richText) return this.richText(value);
    if (value === null || typeof value !== "object") return renderRichText(value, this.richTextOptions);
    let rendered = this.renderedRichText.get(value);
    if (rendered === undefined) this.renderedRichText.set(value, (rendered = renderRichText(value, this.richTextOptions)));
    return rendered;
  }
  resolveVectorSetItem(value: any) {
    return this.vectorSetItem ? this.vectorSetItem(value) : value;
  }
}

// ---------------------------------------------------------------------------
// Collections, locales and stable ids

export interface QueryLocale {
  id: string;
  code?: string;
  fallback?: QueryLocale | null;
}

const randomIds = new WeakMap<object, string>();
/** Keys of record sources without an id of their own: their collection's, per locale. */
const sourceKeys = new WeakMap<object, string>();
const legacySources = new WeakMap<object, RecordSource>();
/** Prefix of ids that only live in this JS realm (never handed over to the client). */
export const RANDOM_ID_PREFIX = "$r_";

/**
 * Stable key of a collection or record source, the same on the server and in the browser
 * (query results are handed over by it): its id, else the one its collection gives it.
 */
export function getCollectionKey(collection: any): string {
  if (typeof collection?.id === "string" && collection.id) return collection.id;
  let id = sourceKeys.get(collection) ?? randomIds.get(collection);
  if (!id) {
    id = RANDOM_ID_PREFIX + Math.random().toString(36).slice(2);
    randomIds.set(collection, id);
  }
  return id;
}

/**
 * Picks the record source for a locale (the original runtime: collectionByLocaleId with fallbacks). Sources
 * are keyed by locale code (`"ja-JP"`) or the original locale id; `default` holds the default records.
 */
export function getSourceForLocale(data: any, locale?: QueryLocale | null): RecordSource {
  if (data && typeof data === "object" && data.collectionByLocaleId) {
    const byLocale = data.collectionByLocaleId;
    let key = "default";
    for (let current = locale; current; current = current.fallback) {
      const found = [current.code, current.id].find((candidate) => candidate && byLocale[candidate]);
      if (found) {
        key = found;
        break;
      }
    }
    const source = byLocale[key];
    // A source without an id is known by its collection's: `journal`, `journal/ja-JP`.
    if (source && typeof data.id === "string" && data.id && !sourceKeys.has(source)) sourceKeys.set(source, key === "default" ? data.id : `${data.id}/${key}`);
    return source;
  }
  if (Array.isArray(data)) return legacyArraySource(data);
  return data as RecordSource;
}

/** Old-style collections were plain arrays of records; give them a schema. */
function legacyArraySource(records: Array<Record<string, unknown>>): RecordSource {
  let source = legacySources.get(records);
  if (source) return source;
  const schema: Record<string, FieldDefinition> = { id: { type: "string" } };
  for (const record of records) {
    for (const [name, value] of Object.entries(record)) {
      if (schema[name] || value === null || value === undefined) continue;
      schema[name] = { type: typeof value === "number" ? "number" : typeof value === "boolean" ? "boolean" : typeof value === "string" ? "string" : "richtext" };
    }
  }
  source = new JsonCollection({ schema, records });
  legacySources.set(records, source);
  return source;
}

// ---------------------------------------------------------------------------
// Query AST (as generated by the original runtime)

type Expr = Record<string, any> & { type: string };
export interface Query {
  select: Expr[];
  from: Expr;
  where?: Expr;
  /** `direction` is "asc" or "desc" (generated queries are object literals, so typed as plain strings). */
  orderBy?: Array<Expr & { direction?: string }>;
  limit?: Expr;
  offset?: Expr;
}

/** One collection record bound to a FROM alias inside a result row. */
interface Bound {
  alias?: string;
  source: RecordSource;
  item: CollectionItem | null;
  /** Position in collection order (the original runtime's virtual `index` field). */
  position: number;
}
type Row = Bound[];
interface Scope {
  row: Row;
  outer?: Scope;
}
export type RawRow = Record<string, Value>;

interface Loaded {
  source: RecordSource;
  items: CollectionItem[];
}

const VIRTUAL_INDEX = "index";

/** Values that must be resolved lazily remember which collection they came from. */
function wrapLazyValue(value: Value, source: RecordSource): Value {
  const kind = kindOf(value);
  if (kind !== "richtext" && kind !== "vectorsetitem") return value;
  return { type: kind, value: { collection: getCollectionKey(source), pointer: value!.value } };
}

class Execution {
  private readonly loaded = new Map<object, Loaded>();

  constructor(private readonly locale: QueryLocale | null | undefined) {}

  // --- phase 1: load records ------------------------------------------------

  async prepare(query: Query): Promise<void> {
    // Collection node → WHERE that may be answered by an index (null: full scan).
    const nodes = new Map<Expr, Expr | null>();
    const visit = (node: unknown, hint?: Expr) => {
      if (Array.isArray(node)) return node.forEach((child) => visit(child));
      if (!node || typeof node !== "object") return;
      const expr = node as Expr;
      if (expr.type === "Collection" && expr.data) {
        // A node object reused elsewhere in the query always gets a full scan.
        nodes.set(expr, nodes.has(expr) ? null : hint ?? null);
        return; // never walk into the collection object itself
      }
      if (expr.type === "Select" || (expr.select && expr.from)) {
        visit(expr.from, expr.from?.type === "Collection" ? expr.where : undefined);
        for (const key of Object.keys(expr)) if (key !== "from") visit(expr[key]);
        return;
      }
      for (const key of Object.keys(expr)) visit(expr[key]);
    };
    visit(query);
    await Promise.all([...nodes].map(([node, hint]) => this.load(node, hint ?? undefined)));
  }

  private async load(node: Expr, where: Expr | undefined): Promise<void> {
    const source = getSourceForLocale(node.data, this.locale);
    if (!source || typeof source.scanItems !== "function") throw new Error("Unsupported CMS collection");
    const items = (where && (await this.lookupWithIndex(source, node.alias, where))) || (await source.scanItems());
    this.loaded.set(node, { source, items });
  }

  /** `field == "literal"` on an indexed string field → fetch only the matching records. */
  private async lookupWithIndex(source: RecordSource, alias: string | undefined, where: Expr): Promise<CollectionItem[] | undefined> {
    if (!source.indexes?.length || !source.resolveItems) return undefined;
    for (const condition of conjuncts(where)) {
      const match = equalityWithLiteral(condition, alias);
      if (!match || kindOf({ type: source.schema[match.field]?.type } as Value) !== "string") continue;
      const index = source.indexes.find((candidate) => {
        const names = candidate.options?.fieldNames;
        return names?.length === 1 && names[0] === match.field;
      });
      if (!index) continue;
      try {
        const hits = await index.lookupItems([{ type: "Equals", value: { type: ControlType.String, value: match.value } }]);
        if (hits.length === 0) return undefined; // fall back to a scan (case-insensitive semantics)
        const items = await source.resolveItems(hits.map((hit) => hit.pointer));
        return source.compareItems ? [...items].sort((a, b) => source.compareItems!(a, b)) : items;
      } catch {
        return undefined;
      }
    }
    return undefined;
  }

  // --- phase 2: evaluate ------------------------------------------------------

  select(query: Query, outer?: Scope): RawRow[] {
    let rows = this.from(query.from);
    if (query.where) rows = rows.filter((row) => toBoolean(this.evaluate(query.where!, { row, outer })));
    if (query.orderBy?.length) rows = this.sort(rows, query.orderBy, outer);

    const offset = query.offset ? toNumber(this.evaluate(query.offset, outer)) ?? 0 : 0;
    const limit = query.limit ? toNumber(this.evaluate(query.limit, outer)) ?? Infinity : Infinity;
    if (offset > 0 || limit !== Infinity) rows = rows.slice(offset, limit === Infinity ? undefined : offset + limit);

    return rows.map((row) => this.project(query.select, { row, outer }));
  }

  private from(node: Expr): Row[] {
    if (node.type === "Collection") {
      const loaded = this.loaded.get(node);
      if (!loaded) throw new Error("Collection was not loaded");
      return loaded.items.map((item, position) => [{ alias: node.alias, source: loaded.source, item, position }]);
    }
    if (node.type === "LeftJoin") return this.leftJoin(node);
    throw new Error(`Unsupported FROM type: ${node.type}`);
  }

  private leftJoin(node: Expr): Row[] {
    const left = this.from(node.left);
    const right = this.from(node.right);
    const emptyRight = this.emptyRow(node.right);
    const joined: Row[] = [];
    const hashKeys = this.hashJoinSides(node);

    if (hashKeys) {
      // Equality joins (reference field == id) are matched through a hash map.
      const byKey = new Map<string, Row[]>();
      for (const row of right) {
        const key = JSON.stringify(this.evaluate(hashKeys.right, { row })?.value ?? null);
        byKey.set(key, [...(byKey.get(key) ?? []), row]);
      }
      for (const row of left) {
        const key = JSON.stringify(this.evaluate(hashKeys.left, { row })?.value ?? null);
        const matches = byKey.get(key);
        if (matches) for (const match of matches) joined.push([...row, ...match]);
        else joined.push([...row, ...emptyRight]);
      }
      return joined;
    }

    for (const row of left) {
      let matched = false;
      for (const candidate of right) {
        const combined = [...row, ...candidate];
        if (toBoolean(this.evaluate(node.constraint, { row: combined }))) {
          joined.push(combined);
          matched = true;
        }
      }
      if (!matched) joined.push([...row, ...emptyRight]);
    }
    return joined;
  }

  private hashJoinSides(node: Expr): { left: Expr; right: Expr } | undefined {
    const constraint = node.constraint;
    if (constraint?.type !== "BinaryOperation" || constraint.operator !== "==") return undefined;
    const leftAliases = aliasesOf(node.left);
    const sideOf = (expr: Expr) => (expr.type === "Identifier" && expr.collection ? (leftAliases.has(expr.collection) ? "left" : "right") : undefined);
    const a = sideOf(constraint.left);
    const b = sideOf(constraint.right);
    if (a === "left" && b === "right") return { left: constraint.left, right: constraint.right };
    if (a === "right" && b === "left") return { left: constraint.right, right: constraint.left };
    return undefined;
  }

  /** Bounds with no record: the right side of an unmatched left join. */
  private emptyRow(node: Expr): Row {
    if (node.type === "Collection") return [{ alias: node.alias, source: this.loaded.get(node)!.source, item: null, position: -1 }];
    return [...this.emptyRow(node.left), ...this.emptyRow(node.right)];
  }

  private sort(rows: Row[], orderBy: NonNullable<Query["orderBy"]>, outer?: Scope): Row[] {
    const keyed = rows.map((row) => ({
      row,
      keys: orderBy.map((order) => this.sortKey(order, { row, outer })),
    }));
    keyed.sort((a, b) => {
      for (let i = 0; i < orderBy.length; i++) {
        const sign = orderBy[i].direction === "desc" ? -1 : 1;
        const result = compareForSort(a.keys[i], b.keys[i]);
        if (result !== 0) return result * sign;
      }
      return 0; // stable: keeps collection order as the tie-breaker
    });
    return keyed.map((entry) => entry.row);
  }

  private sortKey(order: Expr, scope: Scope): Value {
    if (order.type === "Identifier" && order.name === VIRTUAL_INDEX) {
      const bound = scope.row.find((b) => !order.collection || b.alias === order.collection);
      if (bound && !(VIRTUAL_INDEX in bound.source.schema)) return { type: "number", value: bound.position };
    }
    return this.evaluate(order, scope);
  }

  private project(select: Expr[], scope: Scope): RawRow {
    const result: RawRow = {};
    for (const expr of select) {
      if (expr.type === "Identifier") {
        const field = this.resolveField(expr, scope);
        if (!field) continue;
        result[expr.alias ?? expr.name] = field.value;
      } else {
        result[expr.alias] = this.evaluate(expr, scope);
      }
    }
    return result;
  }

  private resolveField(expr: Expr, scope: Scope | undefined): { value: Value; definition: FieldDefinition } | undefined {
    for (let current = scope; current; current = current.outer) {
      const candidates = current.row.filter(
        (bound) => (!expr.collection || bound.alias === expr.collection) && Object.prototype.hasOwnProperty.call(bound.source.schema, expr.name),
      );
      if (candidates.length > 1) throw new Error(`Ambiguous CMS field: ${expr.name}`);
      const bound = candidates[0];
      if (bound) {
        return { value: wrapLazyValue(bound.item?.data[expr.name] ?? null, bound.source), definition: bound.source.schema[expr.name] };
      }
    }
    return undefined;
  }

  evaluate(expr: Expr, scope: Scope | undefined): Value {
    switch (expr.type) {
      case "Identifier":
        return this.resolveField(expr, scope)?.value ?? null;
      case "LiteralValue":
        return parseValue(expr.value);
      case "TypeCast":
        return castValue(this.evaluate(expr.value, scope), expr.dataType);
      case "UnaryOperation":
        if (expr.operator === "not") return { type: "boolean", value: !toBoolean(this.evaluate(expr.value, scope)) };
        throw new Error(`Unsupported unary operator: ${expr.operator}`);
      case "BinaryOperation":
        return this.binary(expr, scope);
      case "FunctionCall":
        return this.call(expr, scope);
      case "Case":
        return this.caseExpression(expr, scope);
      default:
        throw new Error(`Unsupported CMS expression: ${expr.type}`);
    }
  }

  /**
   * Static type of an expression; undefined for untyped literals. The original runtime casts
   * an untyped literal to the type of what it is compared with.
   */
  private typeOf(expr: Expr, scope: Scope | undefined): TypeDefinition | undefined {
    switch (expr.type) {
      case "Identifier":
        return this.resolveField(expr, scope)?.definition;
      case "TypeCast":
        return { type: String(expr.dataType).toLowerCase() };
      case "UnaryOperation":
      case "BinaryOperation":
        return { type: "boolean" };
      case "FunctionCall":
        if (expr.functionName === "LENGTH" || expr.functionName === "INDEX_OF") return { type: "number" };
        if (expr.functionName === "INTERSECT") return { type: "array", definition: { type: "string" } };
        if (expr.functionName === "ARRAY" || expr.functionName === "FLAT_ARRAY") return { type: "array" };
        return { type: "boolean" };
      default:
        return undefined;
    }
  }

  private binary(expr: Expr, scope: Scope | undefined): Value {
    let left = this.evaluate(expr.left, scope);
    let right = this.evaluate(expr.right, scope);
    if (expr.operator === "in") {
      const listType = this.typeOf(expr.right, scope);
      let itemType = this.typeOf(expr.left, scope);
      if (!itemType && listType?.definition) left = castValue(left, (itemType = listType.definition));
      if (!listType && itemType) right = castValue(right, { type: "array", definition: itemType });
    } else if (expr.operator !== "and" && expr.operator !== "or") {
      const leftType = this.typeOf(expr.left, scope);
      const rightType = this.typeOf(expr.right, scope);
      if (!leftType && rightType) left = castValue(left, rightType);
      if (!rightType && leftType) right = castValue(right, leftType);
    }
    const bool = (value: boolean): Value => ({ type: "boolean", value });
    switch (expr.operator) {
      case "and": return bool(toBoolean(left) && toBoolean(right));
      case "or": return bool(toBoolean(left) || toBoolean(right));
      case "==": return bool(equal(left, right));
      case "!=": return bool(!equal(left, right));
      case "<": return bool(lessThan(left, right));
      case "<=": return bool(lessOrEqual(left, right));
      case ">": return bool(greaterThan(left, right));
      case ">=": return bool(greaterOrEqual(left, right));
      case "in": return bool(isIn(left, right));
      default: throw new Error(`Unsupported binary operator: ${expr.operator}`);
    }
  }

  private call(expr: Expr, scope: Scope | undefined): Value {
    const args: Expr[] = expr.arguments ?? [];
    const arg = (index: number) => this.evaluate(args[index], scope);
    switch (expr.functionName) {
      case "CONTAINS": return { type: "boolean", value: textMatch(arg(0), arg(1), "includes") };
      case "STARTS_WITH": return { type: "boolean", value: textMatch(arg(0), arg(1), "startsWith") };
      case "ENDS_WITH": return { type: "boolean", value: textMatch(arg(0), arg(1), "endsWith") };
      case "LENGTH": {
        const list = arg(0);
        return { type: "number", value: kindOf(list) === "array" ? list!.value.length : 0 };
      }
      case "INDEX_OF": return { type: "number", value: indexOf(arg(0), arg(1)) };
      case "INTERSECT": return intersect(arg(0), arg(1));
      case "ARRAY": {
        const rows = this.select(args[0] as unknown as Query, scope);
        return { type: "array", value: rows.map((row) => ({ type: "object", value: row })) };
      }
      case "FLAT_ARRAY": {
        const rows = this.select(args[0] as unknown as Query, scope);
        return { type: "array", value: rows.map((row) => Object.values(row)[0] ?? null) };
      }
      default:
        throw new Error(`Unsupported CMS function: ${expr.functionName}`);
    }
  }

  private caseExpression(expr: Expr, scope: Scope | undefined): Value {
    const input = expr.value ? this.evaluate(expr.value, scope) : undefined;
    const inputType = expr.value ? this.typeOf(expr.value, scope) : undefined;
    for (const condition of expr.conditions ?? []) {
      let when = this.evaluate(condition.when, scope);
      if (inputType && !this.typeOf(condition.when, scope)) when = castValue(when, inputType);
      const matches = expr.value ? equal(input!, when) : toBoolean(when);
      if (matches) return this.evaluate(condition.then, scope);
    }
    return expr.else ? this.evaluate(expr.else, scope) : null;
  }
}

/** The original runtime's sort order: nulls first, then ascending case-insensitive values. */
function compareForSort(left: Value, right: Value): number {
  if (equal(left, right)) return 0;
  if (left === null) return -1;
  if (right === null) return 1;
  if (kindOf(left) !== kindOf(right)) return 0;
  return compareValues(left, right, caseInsensitive);
}

function intersect(left: Value, right: Value): Value {
  const toSet = (value: Value) =>
    new Set(kindOf(value) === "array" ? (value!.value as Value[]).filter((item) => kindOf(item) === "string").map((item) => item!.value) : []);
  const a = toSet(left);
  const b = toSet(right);
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  return { type: "array", value: [...small].filter((item) => large.has(item)).map((item) => ({ type: "string", value: item })) };
}

function aliasesOf(node: Expr): Set<string> {
  if (node.type === "Collection") return new Set(node.alias ? [node.alias] : []);
  return new Set([...aliasesOf(node.left), ...aliasesOf(node.right)]);
}

function conjuncts(expr: Expr): Expr[] {
  if (expr.type === "BinaryOperation" && expr.operator === "and") return [...conjuncts(expr.left), ...conjuncts(expr.right)];
  return [expr];
}

/** Matches `field == "text"` (optionally `CAST(field AS STRING)`), either way round. */
function equalityWithLiteral(expr: Expr, alias: string | undefined): { field: string; value: string } | undefined {
  if (expr.type !== "BinaryOperation" || expr.operator !== "==") return undefined;
  const fieldOf = (side: Expr): string | undefined => {
    const target = side.type === "TypeCast" && side.dataType === "STRING" ? side.value : side;
    if (target?.type !== "Identifier") return undefined;
    if (target.collection && target.collection !== alias) return undefined;
    return target.name;
  };
  const literalOf = (side: Expr) => (side.type === "LiteralValue" && typeof side.value === "string" && side.value ? side.value : undefined);
  const field = fieldOf(expr.left) ?? fieldOf(expr.right);
  const value = literalOf(expr.right) ?? literalOf(expr.left);
  return field && value ? { field, value } : undefined;
}

/** Every collection a query references, by collection key (for resolving lazy values). */
export function getQuerySources(query: unknown, locale?: QueryLocale | null): Map<string, RecordSource> {
  const sources = new Map<string, RecordSource>();
  const visit = (node: any) => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== "object") return;
    if (node.type === "Collection" && node.data) {
      const source = getSourceForLocale(node.data, locale);
      sources.set(getCollectionKey(source), source);
      return;
    }
    for (const key of Object.keys(node)) visit(node[key]);
  };
  visit(query);
  return sources;
}

// ---------------------------------------------------------------------------
// Resolving raw rows into props

const isThenable = (value: any): value is PromiseLike<unknown> => typeof value?.then === "function";
const vectorCache = new WeakMap<RecordSource, Map<string, { value?: unknown; promise?: PromiseLike<unknown> }>>();

function resolveVectorSetItem(source: RecordSource, pointer: unknown): unknown {
  let cache = vectorCache.get(source);
  if (!cache) vectorCache.set(source, (cache = new Map()));
  const key = JSON.stringify(pointer);
  const cached = cache.get(key);
  if (cached) return "value" in cached ? cached.value : cached.promise;
  const result = source.resolveVectorSetItem?.(pointer) ?? null;
  if (!isThenable(result)) {
    cache.set(key, { value: result });
    return result;
  }
  const entry: { value?: unknown; promise?: PromiseLike<unknown> } = {};
  entry.promise = result.then((value) => {
    entry.value = value;
    return value;
  });
  cache.set(key, entry);
  return entry.promise;
}

/**
 * Converts raw rows to the plain objects components receive. Synchronous when
 * nothing needs loading (so hydration with handed-over data never suspends),
 * otherwise returns a promise.
 */
export function resolveRows(raw: RawRow[], sources: Map<string, RecordSource>): any[] | Promise<any[]> {
  const pending: Array<PromiseLike<unknown>> = [];

  const resolve = (value: Value, assign: (resolved: unknown) => void): void => {
    switch (kindOf(value)) {
      case "array": {
        const list: unknown[] = [];
        assign(list);
        (value!.value as Value[]).forEach((item, i) => resolve(item, (resolved) => (list[i] = resolved)));
        return;
      }
      case "object": {
        const object: Record<string, unknown> = {};
        assign(object);
        for (const [key, item] of Object.entries(value!.value as Record<string, Value>)) resolve(item, (resolved) => (object[key] = resolved));
        return;
      }
      case "richtext":
      case "vectorsetitem": {
        const { collection, pointer } = value!.value ?? {};
        const source = sources.get(collection);
        if (!source) return assign(null);
        const result = kindOf(value) === "richtext" ? source.resolveRichText?.(pointer) ?? null : resolveVectorSetItem(source, pointer);
        if (isThenable(result)) pending.push(result.then(assign));
        else assign(result);
        return;
      }
      default:
        assign(value?.value ?? null);
    }
  };

  const rows = raw.map((row) => {
    const object: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(row)) resolve(value, (resolved) => (object[key] = resolved));
    return object;
  });
  return pending.length > 0 ? Promise.all(pending).then(() => rows) : rows;
}

// ---------------------------------------------------------------------------

/** The original runtime's QueryEngine: `await new QueryEngine().query(query, locale)`. */
export class QueryEngine {
  /** Typed, JSON-serialisable result rows. */
  async queryRaw(query: Query, locale?: QueryLocale | null): Promise<RawRow[]> {
    const execution = new Execution(locale);
    await execution.prepare(query);
    return execution.select(query);
  }

  /** Rows with values resolved to props (rich text as React nodes, images as objects, …). */
  async query(query: Query, locale?: QueryLocale | null): Promise<any[]> {
    const raw = await this.queryRaw(query, locale);
    return resolveRows(raw, getQuerySources(query, locale));
  }

  /** Resolve rows previously produced by queryRaw (e.g. handed over from the server). */
  resolveRaw(raw: RawRow[], query: Query, locale?: QueryLocale | null): any[] | Promise<any[]> {
    return resolveRows(raw, getQuerySources(query, locale));
  }
}
