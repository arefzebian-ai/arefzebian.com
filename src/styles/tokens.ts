// Design tokens for the Aref Zebian portfolio.
// Injected by <SiteStyles siteCSS={designTokens} /> in src/app/layout.tsx.
// Prefer these CSS variables over one-off magic numbers in page modules.

export const designTokens: string[] = [
  `body{
  --token-white:#fff;
  --token-black:#000;
  --df-will-change-override:none;

  /* Color roles (existing black/white identity) */
  --color-bg:#ffffff;
  --color-bg-inverse:#000000;
  --color-surface:#ffffff;
  --color-text:#000000;
  --color-text-inverse:#ffffff;
  --color-text-muted:rgba(0,0,0,0.55);
  --color-text-muted-inverse:rgba(255,255,255,0.55);
  --color-border:rgba(0,0,0,0.12);
  --color-border-inverse:rgba(255,255,255,0.18);
  --color-accent:#000000;

  /* Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96 */
  --space-1:4px;
  --space-2:8px;
  --space-3:12px;
  --space-4:16px;
  --space-5:24px;
  --space-6:32px;
  --space-7:48px;
  --space-8:64px;
  --space-9:96px;

  --gutter-phone:16px;
  --gutter-tablet:24px;
  --gutter-desktop:32px;
  --gutter:var(--gutter-desktop);

  --section-gap-mobile:48px;
  --section-gap-desktop:96px;
  --section-gap:var(--section-gap-desktop);

  --grid-gap:20px;
  --text-gap:12px;

  /* Type + chrome */
  --font-sans:"Favorit Light","Favorit Light Placeholder",sans-serif;
  --font-sans-medium:"Favorit Regular","Favorit Regular Placeholder",sans-serif;
  --radius-sm:5px;
  --radius-md:10px;
  --touch-min:44px;

  /* Motion */
  --ease-out:cubic-bezier(0.16,1,0.3,1);
  --duration-reveal:350ms;
  --duration-interact:180ms;
  --reveal-distance:8px;
}`,
  `@media (max-width:1023.98px){body{--gutter:var(--gutter-tablet);--section-gap:var(--section-gap-mobile)}}`,
  `@media (max-width:639.98px){body{--gutter:var(--gutter-phone);--section-gap:var(--section-gap-mobile);--grid-gap:16px}}`,
];
