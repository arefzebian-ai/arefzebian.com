// React 18 compatibility. The original runtime publishes on React 18; some npm packages used
// by code components were compiled against it and read React's internal
// `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` (typically a bundled old
// JSX runtime reading `ReactCurrentOwner`). React 19 removed that object, which
// makes those packages throw on import. Provide inert stand-ins.

import React from "react";

const KEY = "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED";
const react = React as unknown as Record<string, unknown>;

if (react && !react[KEY] && Object.isExtensible(react)) {
  react[KEY] = {
    ReactCurrentOwner: { current: null },
    ReactCurrentDispatcher: { current: null },
    ReactCurrentBatchConfig: { transition: null },
    ReactCurrentActQueue: { current: null },
    ReactDebugCurrentFrame: { getCurrentStack: null, getStackAddendum: () => "" },
  };
}

// Types for what this project's React does as the original runtime's did (see jsx-runtime.ts):
// every component type honours `defaultProps`, a component may carry the original runtime's data
// `loader` (component.tsx `forwardLoader`), and style objects pass CSS custom
// properties (`"--df-font-size": "14px"`) and any vendor-prefixed property, as
// The original runtime's code writes them.
declare module "react" {
  interface ForwardRefExoticComponent<P> {
    defaultProps?: Partial<P> & Record<string, unknown>;
    loader?: unknown;
  }
  interface NamedExoticComponent<P> {
    defaultProps?: Partial<P> & Record<string, unknown>;
  }
  interface FunctionComponent<P> {
    defaultProps?: Partial<P> & Record<string, unknown>;
    loader?: unknown;
  }
  interface CSSProperties {
    [customProperty: `--${string}`]: any;
    // Vendor-prefixed properties beyond those React's types list (`MozMaskImage`).
    [vendorProperty: `Webkit${string}` | `Moz${string}` | `ms${string}`]: any;
  }
}
