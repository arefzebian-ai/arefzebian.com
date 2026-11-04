// Design tokens (colour styles) from the published site, light and dark.
// Each colour style is named after its name in the design where the site publishes it (--token-white),
// else after its light value.
// Components find colour styles by the --token- prefix, so it stays.
// Tokens this site doesn't define, used by components copied from other projects (they show their
// fallback colour; named after their style name or that colour): --token-ffffff, --token-line.
// Rendered by <SiteStyles siteCSS={designTokens} /> in src/app/layout.tsx.

export const designTokens: string[] = [
  `body{
  --token-white:#fff;
  --token-black:#000;
  --df-will-change-override:none
}`,
];
