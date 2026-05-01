# Image slots

This directory is where real photography drops in once shot/sourced. Until then, placeholder gradients are rendered inline in the section components.

## Slots needed

| Slot | Used in | Aspect | Treatment | Notes |
|---|---|---|---|---|
| `hero-doorway.{jpg,webp}` | `Hero.astro` (top card) | 4:5 portrait | B&W or warm sepia, documentary | Montevideo doorway / harbor / quiet street |
| `hero-data-card.{svg,png}` | `Hero.astro` (bottom card) | n/a | Currently rendered inline as SVG | No swap needed unless you want a real visualization |
| `ivan-portrait.{jpg,webp}` | `Story.astro` | 3:4 portrait | B&W or warm sepia | Ivan, Montevideo |
| `og-default.jpg` | `Layout.astro` (social card) | 1200×630 | Auto-generated from `public/og-default.svg` via `npm run og` | Re-run if the wordmark or strapline changes |

## Re-rendering the OG image

```bash
npm run og
```

Edit `public/og-default.svg` and re-run; the script writes a 1200×630 JPG suitable for Open Graph and Twitter.
