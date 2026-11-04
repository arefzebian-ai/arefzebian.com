# Aref

Converted from https://arefzebian.com/ with [Deframer](https://deframer.co).

```sh
npm install
npm run dev
```

## Project structure

```
src/
  app/           Next.js routes only: one `page.tsx` per URL (title and description in its `metadata`), the root layout, `not-found.tsx`
  views/         Pages (26): `home.tsx` with its `home.module.css`
  layouts/       Layout templates (2): the navigation and footer around pages
  components/    Components (26), in the folders of the design project
  styles/        Site-wide styles
    tokens.ts    Colour styles as CSS variables (`--token-…`)
    text/        Shared text and link styles (20): `<style>.css` classes, `<style>.ts` exports them
    fonts/       `@font-face` rules, one stylesheet per family
  cms/           CMS collections (2): `<collection>.ts` (schema, queries) + `<collection>.json` (the records)
  code/          The site's own code components and overrides (2), in their code folders
  vendor/        Code from outside the project (26): marketplace code components, shared modules; `lib/` holds what only they import
  site/          Site tables: `routes.ts` (routes, locales, page transitions)
  lib/deframer/  The runtime kit (deframer): the runtime APIs this code uses, imported as `@/deframer`
public/          Static files served as they are
```

Every file and folder name is kebab-case. Imports use the `@/` alias for `src/`
(`@/components/header/logo`); `@/deframer` is the kit in `src/lib/deframer` (tsconfig `paths`).

## Where to edit

| To change | Edit |
| --- | --- |
| A page's content and layout | `src/views/<page>.tsx` and its `.module.css` |
| A page's title, description and social image | `metadata` in its `src/app/**/page.tsx` (Next applies it on client navigation too) |
| Something shared by many pages | its component in `src/components/` (navigation and footer: `src/layouts/`) |
| CMS content (blog posts, team members …) | `src/cms/<collection>.json` |
| Colours and typography | `src/styles/tokens.ts`, `src/styles/text/` |

## Routes

| URL | Route file |
| --- | --- |
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/works/grid-view` | `src/app/works/grid-view/page.tsx` |
| `/works/list-view` | `src/app/works/list-view/page.tsx` |
| `/blog-unused` | `src/app/blog-unused/page.tsx` |
| `/contact-unused` | `src/app/contact-unused/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |
| `/404` and unknown URLs | `src/app/not-found.tsx` |
| `/legal-unused` | `src/app/legal-unused/page.tsx` |
| `/playground` | `src/app/playground/page.tsx` |
| `/halv-draft` | `src/app/halv-draft/page.tsx` |
| `/halv` | `src/app/halv/page.tsx` |
| `/halv-casestudy` | `src/app/halv-casestudy/page.tsx` |
| `/pelagostone-casestudy` | `src/app/pelagostone-casestudy/page.tsx` |
| `/revimo-casestudy` | `src/app/revimo-casestudy/page.tsx` |
| `/aether-branding` | `src/app/aether-branding/page.tsx` |
| `/pelagostone` | `src/app/pelagostone/page.tsx` |
| `/rivited` | `src/app/rivited/page.tsx` |
| `/aether` | `src/app/aether/page.tsx` |
| `/revimo` | `src/app/revimo/page.tsx` |
| `/rivited-draft` | `src/app/rivited-draft/page.tsx` |
| `/pelagostone-draft` | `src/app/pelagostone-draft/page.tsx` |
| `/aether-draft` | `src/app/aether-draft/page.tsx` |
| `/revimo-draft` | `src/app/revimo-draft/page.tsx` |
| `/works/grid-view/[slug]` | `src/app/works/grid-view/[slug]/page.tsx` |
| `/blog-unused/[slug]` | `src/app/blog-unused/[slug]/page.tsx` |
