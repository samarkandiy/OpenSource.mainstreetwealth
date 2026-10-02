# Main Street Wealth · Open Source

Open-source M&A tools for lower middle-market deals in home services and the trades. Lives at [opensource.mainstreetwealth.ai](https://opensource.mainstreetwealth.ai).

Source: [github.com/samarkandiy/OpenSource.mainstreetwealth](https://github.com/samarkandiy/OpenSource.mainstreetwealth)

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 3

## Local dev

```bash
git clone https://github.com/samarkandiy/OpenSource.mainstreetwealth.git
cd OpenSource.mainstreetwealth
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
lib/           # tool catalog, authors, schema, mainstreet.ai cross-link map
public/        # logo and static assets
```

## What's in the hub

- 100-tool catalog in `lib/tools.ts` with 8 interactive calculators live today
- Internal cross-link layer to [mainstreetwealth.ai](https://mainstreetwealth.ai) — all 20 live main-site tools plus industry, broker, and long-tail SEO pages mapped by trade and topic
- schema.org JSON-LD on every page (Organization, WebSite, SoftwareApplication, Article, Person, FAQPage, BreadcrumbList)
- Author bylines, methodology, FAQ, and sources on every featured tool

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

## Contributing

- Issues: [github.com/samarkandiy/OpenSource.mainstreetwealth/issues](https://github.com/samarkandiy/OpenSource.mainstreetwealth/issues)
- Discussions: [github.com/samarkandiy/OpenSource.mainstreetwealth/discussions](https://github.com/samarkandiy/OpenSource.mainstreetwealth/discussions)
- Contributor guide: [/contribute](https://opensource.mainstreetwealth.ai/contribute)

## License

- Code: MIT
- Data: Open Data Commons Attribution (ODC-BY)
- Legal templates: CC-BY (not legal advice)

See [/license-governance](https://opensource.mainstreetwealth.ai/license-governance) for the full detail.
