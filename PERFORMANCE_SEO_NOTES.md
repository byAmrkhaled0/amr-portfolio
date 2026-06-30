# Performance and SEO Notes

This version keeps the portfolio premium but avoids heavy continuous 4D effects that caused lag.

## What changed
- Removed infinite background/orbit/scan animations that were always running.
- Kept light motion for hover, first render, and the technology marquee.
- Project screenshots now use `object-fit: contain` so full website images appear without cropping.
- Firebase is loaded with dynamic imports, so reviews do not block the first page load.
- Google Fonts now load from `index.html` using preconnect instead of CSS `@import`.
- Added stronger SEO metadata, Open Graph/Twitter tags, JSON-LD graph, robots, and sitemap image entries.
- Disabled expensive blur/backdrop effects on project and content cards.

## Run
```bash
npm install
npm run dev
```

## Production check
```bash
npm run build
npm run preview
```
