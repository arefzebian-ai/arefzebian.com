// Development twin of ./jsx-runtime (see there for why it exists).

import * as runtime from "react/jsx-dev-runtime";
import { react18Props } from "./jsx-runtime";

export const Fragment = runtime.Fragment;
// TypeScript resolves JSX element/attribute types from the jsxImportSource module.
export type { JSX } from "./jsx-runtime";

export function jsxDEV(type: any, props: any, key: any, isStatic: boolean, source?: any, self?: any) {
  return runtime.jsxDEV(type, react18Props(type, props), key, isStatic, source, self);
}
