// What converted collection modules (src/cms/<name>.ts) are written with, in place of the
// code the original runtime generates for every collection: slug lookups and enum option titles.

import { QueryEngine, type Query, type QueryLocale } from "./engine";
import type { TypeDefinition } from "./values";

const engine = new QueryEngine();

/**
 * A collection's slug ⇄ id lookups (the original runtime's collection `utils`): links that name an item by
 * id find its slug, collection-reference query parameters (`?category=<slug>`) its id.
 */
export function slugUtils(collection: object, slugField: string) {
  const lookup = async (select: string, field: string, value: string, locale?: QueryLocale | null) => {
    const query: Query = {
      from: { type: "Collection", data: collection },
      select: [{ type: "Identifier", name: select }],
      where: { type: "BinaryOperation", operator: "==", left: { type: "Identifier", name: field }, right: { type: "LiteralValue", value } },
      limit: { type: "LiteralValue", value: 1 },
    };
    const [item] = await engine.query(query, locale);
    return item?.[select];
  };
  return {
    getSlugByRecordId: (id: string, locale?: QueryLocale | null) => lookup(slugField, "id", id, locale),
    getRecordIdBySlug: (slug: string, locale?: QueryLocale | null) => lookup("id", slugField, slug, locale),
  };
}

/** An enum field: its options (the stored values), their titles and, where translated, their titles per locale code. */
export interface EnumField extends TypeDefinition {
  options?: string[];
  optionTitles?: string[];
  /** Locale code -> a title per option (`null`: not translated, the fallback locale's or default title shows). */
  localizedOptionTitles?: Record<string, Array<string | null>>;
}

type TitleLocale = { code?: string; fallback?: TitleLocale | null } | null | undefined;

/**
 * The title functions of a schema's enum fields (`enumToDisplayNameFunctions.region(value, locale)`):
 * the locale's title, else its fallback locale's, else the default title; "" for a value that
 * is not an option.
 */
export function enumDisplayNames(schema: Record<string, EnumField>): Record<string, (value: unknown, locale?: TitleLocale) => string> {
  const functions: Record<string, (value: unknown, locale?: TitleLocale) => string> = {};
  for (const [name, { options = [], optionTitles, localizedOptionTitles }] of Object.entries(schema)) {
    if (!optionTitles) continue;
    functions[name] = (value, locale) => {
      const index = options.indexOf(value as string);
      if (index < 0) return "";
      for (let current = locale; current; current = current.fallback) {
        const title = current.code ? localizedOptionTitles?.[current.code]?.[index] : undefined;
        if (typeof title === "string") return title;
      }
      return optionTitles[index];
    };
  }
  return functions;
}

/** A schema field with what the original runtime's editor control said about it: its title, and its control type where it isn't the stored type. */
export interface ControlledField extends EnumField {
  title?: string;
  /** The control's type when it differs from the stored one: `"collectionreference"` for a field storing an item id. */
  control?: string;
}

/** One field's editor control, as the original runtime's `addPropertyControls` gave it to the collection. */
export interface CollectionControl {
  title: string;
  type: string;
  options?: string[];
  optionTitles?: string[];
}

/**
 * A collection's `propertyControls` derived from its schema, for code that reads them (CMS filter
 * libraries look fields up by title and type): every field with a title, in schema order.
 */
export function propertyControlsOf(schema: Record<string, ControlledField>): Record<string, CollectionControl> {
  const controls: Record<string, CollectionControl> = {};
  for (const [name, { title, control, type, options, optionTitles }] of Object.entries(schema)) {
    if (title === undefined) continue; // no editor control: the record id
    controls[name] = { title, type: control ?? type, ...(options && { options }), ...(optionTitles && { optionTitles }) };
  }
  return controls;
}
