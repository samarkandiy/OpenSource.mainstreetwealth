# Main Street Wealth · Open Source

Open-source M&A tools for lower middle-market deals in home services and the trades. Lives at [opensource.mainstreetwealth.ai](https://opensource.mainstreetwealth.ai).

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 3

## Local dev

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint via `next lint` |
| `npm run typecheck` | TypeScript check without emit |

## Structure

```
app/           # routes (hub, directory, tool pages)
components/    # shared UI + calculators
lib/           # tool catalog + helpers
public/        # logo and static assets
```

## Brand

Colors are pulled directly from the logo SVG:

| Role | Hex |
| --- | --- |
| Violet 600 (primary) | `#7d2cfb` |
| Violet 500 | `#8947fc` |
| Mint 500 | `#03e798` |
| Teal 600 | `#02d5bb` |
| Green 700 | `#00bc7b` |
| Ink 900 (text) | `#140036` |

Light theme only, by design — this is a trust-sensitive M&A domain where clarity beats novelty.
