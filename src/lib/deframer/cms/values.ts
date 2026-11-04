// Typed CMS values ("DatabaseValue"): `{ type, value }` or null, the unit the
// query engine compares, casts and returns. Types are ControlType names; they
// are compared case-insensitively so values written by the original runtime's bundled
// collection code and values created here always agree.

export interface DbValue {
  type: string;
  value: any;
}
export type Value = DbValue | null;

/** 0 = case-insensitive (the original runtime's default for queries), 1 = case-sensitive. */
export interface Collation {
  type: 0 | 1;
}
export const caseInsensitive: Collation = { type: 0 };
export const caseSensitive: Collation = { type: 1 };

export const kindOf = (value: Value): string | undefined => value?.type?.toLowerCase();

const isValidDate = (date: unknown): date is Date => date instanceof Date && !Number.isNaN(date.getTime());

/**
 * A field's static type, as collection schemas declare it: a ControlType name, the
 * item type of arrays (`definition`) and the field types of objects (`definitions`).
 */
export interface TypeDefinition {
  type: string;
  isNullable?: boolean;
  definition?: TypeDefinition;
  definitions?: Record<string, TypeDefinition>;
}

/**
 * Types a plain JSON record value by its field definition — the inverse of
 * unwrapping a query result: `["a", "b"]` with `{ type: "array", definition:
 * { type: "string" } }` becomes `{ type: "array", value: [{ type: "string",
 * value: "a" }, …] }`, exactly what the original runtime's bundled reader returns.
 */
export function typedValue(value: unknown, definition: TypeDefinition | undefined): Value {
  if (value === undefined || value === null) return null;
  const type = definition?.type ?? "unknown";
  switch (type.toLowerCase()) {
    case "array":
      return Array.isArray(value) ? { type, value: value.map((item) => typedValue(item, definition!.definition)) } : null;
    case "object": {
      if (typeof value !== "object") return null;
      const fields = definition!.definitions ?? {};
      const entries = Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, typedValue(item, fields[key])]);
      return { type, value: Object.fromEntries(entries) };
    }
    case "unknown":
      return parseValue(value);
    default:
      return { type, value };
  }
}

/** Converts a plain JS literal (from a query) into a typed value. */
export function parseValue(value: unknown): Value {
  if (typeof value === "boolean") return { type: "boolean", value };
  if (isValidDate(value)) return { type: "date", value: value.toISOString() };
  if (typeof value === "number") return { type: "number", value };
  if (typeof value === "string") return { type: "string", value };
  if (Array.isArray(value)) return { type: "array", value: value.map(parseValue) };
  return null;
}

function order<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Compares two values of the same kind. Nulls compare equal to each other. */
export function compareValues(left: Value, right: Value, collation: Collation): number {
  if (left === null || right === null) return 0;
  switch (kindOf(left)) {
    case "array": {
      const a = left.value as Value[];
      const b = right.value as Value[];
      if (a.length !== b.length) return a.length < b.length ? -1 : 1;
      for (let i = 0; i < a.length; i++) {
        const result = compareValues(a[i] ?? null, b[i] ?? null, collation);
        if (result !== 0) return result;
      }
      return 0;
    }
    case "object": {
      const aKeys = Object.keys(left.value).sort();
      const bKeys = Object.keys(right.value).sort();
      if (aKeys.length !== bKeys.length) return aKeys.length < bKeys.length ? -1 : 1;
      for (let i = 0; i < aKeys.length; i++) {
        const keyOrder = order(aKeys[i], bKeys[i]);
        if (keyOrder !== 0) return keyOrder;
        const result = compareValues(left.value[aKeys[i]] ?? null, right.value[bKeys[i]] ?? null, collation);
        if (result !== 0) return result;
      }
      return 0;
    }
    case "date":
      return order(new Date(left.value).getTime(), new Date(right.value).getTime());
    case "link":
    case "responsiveimage":
      return order(JSON.stringify(left.value), JSON.stringify(right.value));
    case "string": {
      const fold = collation.type === 0;
      return order(fold ? String(left.value).toLowerCase() : left.value, fold ? String(right.value).toLowerCase() : right.value);
    }
    default:
      return order(left.value, right.value);
  }
}

const sameKind = (left: Value, right: Value) => kindOf(left) === kindOf(right);

export const equal = (l: Value, r: Value, c = caseInsensitive) => sameKind(l, r) && compareValues(l, r, c) === 0;
export const lessThan = (l: Value, r: Value, c = caseInsensitive) => sameKind(l, r) && compareValues(l, r, c) < 0;
export const lessOrEqual = (l: Value, r: Value, c = caseInsensitive) => sameKind(l, r) && compareValues(l, r, c) <= 0;
export const greaterThan = (l: Value, r: Value, c = caseInsensitive) => sameKind(l, r) && compareValues(l, r, c) > 0;
export const greaterOrEqual = (l: Value, r: Value, c = caseInsensitive) => sameKind(l, r) && compareValues(l, r, c) >= 0;

export function isIn(item: Value, list: Value, collation = caseInsensitive): boolean {
  if (kindOf(list) !== "array") return false;
  return (list!.value as Value[]).some((entry) => equal(entry, item, collation));
}

export function indexOf(list: Value, item: Value): number {
  if (kindOf(list) !== "array") return -1;
  return (list!.value as Value[]).findIndex((entry) => equal(entry, item, caseSensitive));
}

// --- casts -------------------------------------------------------------------

export function toBoolean(value: Value): boolean {
  return castValue(value, "boolean")?.value ?? false;
}
export function toNumber(value: Value): number | null {
  return castValue(value, "number")?.value ?? null;
}
export function toText(value: Value): string | null {
  return castValue(value, "string")?.value ?? null;
}

/**
 * The original runtime's TypeCast: converts between compatible kinds, null otherwise. Also
 * used to give query literals the type of the field they are compared with
 * (so `enumField == "option"` compares two enums).
 */
export function castValue(value: Value, target: TypeDefinition | string): Value {
  const definition = typeof target === "string" ? { type: target } : target;
  const kind = kindOf(value);
  const to = definition.type.toLowerCase();
  if (value === null || to === "unknown") return value;
  if (to === "array") {
    if (kind !== "array") return null;
    const item = definition.definition;
    return item ? { type: "array", value: (value.value as Value[]).map((entry) => castValue(entry, item)) } : value;
  }
  if (kind === to) return value;
  switch (to) {
    case "boolean":
      return kind === "number" || kind === "string" ? { type: "boolean", value: Boolean(value.value) } : null;
    case "number": {
      if (kind !== "string") return null;
      const number = Number(value.value);
      return Number.isFinite(number) ? { type: "number", value: number } : null;
    }
    case "string":
      return kind === "number" ? { type: "string", value: String(value.value) } : null;
    case "date": {
      if (kind !== "number" && kind !== "string") return null;
      const date = new Date(value.value);
      return isValidDate(date) ? { type: "date", value: date.toISOString() } : null;
    }
    case "enum":
      return kind === "string" ? { type: "enum", value: value.value } : null;
    case "link":
      return kind === "string" && /^https?:/i.test(value.value) ? { type: "link", value: value.value } : null;
    default:
      return null;
  }
}

/** Substring tests used by CONTAINS / STARTS_WITH / ENDS_WITH (case-insensitive). */
export function textMatch(source: Value, target: Value, test: "includes" | "startsWith" | "endsWith"): boolean {
  const a = toText(source);
  const b = toText(target);
  if (a === null || b === null) return false;
  return a.toLowerCase()[test](b.toLowerCase());
}
