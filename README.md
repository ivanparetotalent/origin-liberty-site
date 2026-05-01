# Origin Liberty

> Move your family to Uruguay in 90 days. A relocation concierge for U.S. and global founders.

Marketing site for [originliberty.com](https://originliberty.com). Single long-scroll landing page, thank-you page, and an empty blog scaffold ready for MDX articles.

## Tech stack

- **Astro 4** (static output, no SSR for v1)
- **TypeScript** (strict mode)
- **Tailwind CSS v3** with custom oxblood/bone/brass theme tokens
- **MDX** for the blog (content collection wired, posts not yet written)
- **Self-hosted variable fonts** via `@fontsource-variable` (Fraunces + Inter)
- **`astro-icon`** with the Lucide collection
- **`@astrojs/sitemap`** + manual `robots.txt` + `@astrojs/rss`
- **No JS framework** — every interactive bit is plain `<details>` or vanilla JS islands

Deploy target: **Cloudflare Pages** (pure static; works out of the box).

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to ./dist
npm run preview  # serve the production build locally
npm run og       # regenerate the Open Graph JPG from public/og-default.svg
```

Node 20+ recommended (an `.nvmrc` is included).

## Project layout

```
src/
├── components/
│   ├── ui/                    # primitives: Button, Card, PillBadge, SectionHeader, ScrollReveal, AccordionItem, PullQuote
│   ├── sections/              # 14 landing-page sections (Hero → StickyCTABand)
│   ├── BookingFormPlaceholder.astro   # swap target for the booking embed
│   ├── Nav.astro              # sticky top bar
│   └── Footer.astro
├── content/
│   ├── config.ts              # blog collection schema
│   └── blog/
│       └── _template.mdx      # reference scaffold (excluded from build)
├── layouts/
│   └── Layout.astro           # head, fonts, SEO, JSON-LD
├── lib/
│   └── seo.ts                 # SITE config + structured-data builders
├── pages/
│   ├── index.astro            # the landing page (composes all sections)
│   ├── thank-you.astro        # post-booking confirmation
│   ├── blog/
│   │   ├── index.astro        # blog index ("no articles yet" until posts exist)
│   │   └── [...slug].astro    # individual post renderer
│   └── rss.xml.ts             # RSS feed for the blog
└── styles/
    └── global.css             # Tailwind + scroll-reveal + base resets

public/
├── favicon.svg, og-default.svg, og-default.jpg, robots.txt, _headers
└── images/                    # photography slots (see public/images/README.md)

scripts/
└── render-og.mjs              # SVG → JPG OG image converter (sharp)
```

## Where to swap content

| What | File | Notes |
|---|---|---|
| Booking form embed | `src/components/sections/StickyCTABand.astro` | Pass `embedUrl` prop; placeholder swaps for an iframe automatically. |
| Ivan's story FACT-CHECK passages | `src/components/sections/Story.astro` | Italic paragraphs are placeholder until Ivan supplies the real memories. |
| Photography | `public/images/` | See `public/images/README.md` for slot list and aspect ratios. Until then, warm gradient placeholders render inline. |
| Blog posts | `src/content/blog/<slug>.mdx` | Copy `_template.mdx` and set `draft: false`. |
| Site URL / metadata | `src/lib/seo.ts` | Single source of truth for title, description, email, OG image. |
| Brand color tokens | `tailwind.config.mjs` | `ink`, `bone`, `oxblood`, `brass`, `border` palettes. |

## Brand reference

- **Colors:** `oxblood` (`#591C2A`) primary, `bone` (`#F5F0E8`) page bg, `brass` (`#A47148`) accent, `ink` (`#1B1B1B`) text. **Not red-white-blue** — "liberty" here is philosophical, not patriotic.
- **Type:** Fraunces (display serif, optical-size axis) + Inter (sans body). Both self-hosted, both variable.
- **Voice:** Direct response, second-person, founder-to-founder. Short sentences. No "exclusive," "bespoke," "world-class."

## Deploying to Cloudflare Pages

1. Log into Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick the `origin-liberty-site` repository and approve the GitHub permission.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** *(leave blank — repo root)*
   - **Environment variable:** `NODE_VERSION = 20`
4. **Save and Deploy.** First build takes ~1 minute. You'll get a `*.pages.dev` URL.
5. Add the production domain: project → **Custom domains** → **Set up a custom domain** → `originliberty.com`. If the domain is on Cloudflare, DNS is auto-configured. Otherwise, add the CNAME Cloudflare gives you at your registrar.
6. Every `git push` to `main` auto-deploys; PR branches get preview URLs.

The repo includes a `public/_headers` file with sensible cache rules and security headers — Cloudflare Pages picks it up automatically.

### Why Pages, not Workers

For a pure static marketing site, Cloudflare **Pages** is the right product (static asset hosting + edge cache + automatic CI). Workers is for serverless functions. If you ever need server-side rendering or APIs, Pages supports Workers Functions in the same project — no migration needed.

## Acceptance status

- [x] Astro 4 + TypeScript + Tailwind v3 + MDX + sitemap + icons
- [x] Self-hosted Fraunces + Inter variable fonts
- [x] Single landing page composing all 14 sections, copy verbatim from spec
- [x] Thank-you page (`/thank-you`)
- [x] Blog scaffold (`/blog`, content collection, RSS)
- [x] Booking-form placeholder ready for one-prop swap
- [x] SEO: per-page meta, OG image, sitemap, robots, JSON-LD (Organization + Service)
- [x] Mobile-first responsive, scroll-reveal animations, `prefers-reduced-motion` honored
- [x] `npm run build` completes cleanly
- [ ] Lighthouse 95+ — verify after first deploy on the real edge

## License

All rights reserved. © Origin Liberty.
