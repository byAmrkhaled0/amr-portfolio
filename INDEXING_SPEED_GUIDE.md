# Indexing & Speed Guide

## After deployment
1. Open Google Search Console.
2. Add the exact deployed domain as a URL-prefix property.
3. Verify with the existing Google HTML verification file or DNS.
4. Go to Sitemaps and submit: `sitemap.xml`.
5. Use URL Inspection for the homepage and click Request indexing.

## Current SEO files
- `/robots.txt` allows crawling and points to the sitemap.
- `/sitemap.xml` includes homepage, CV, important images, and llms.txt.
- `index.html` includes canonical URL, Open Graph, Twitter cards, Person/ProfilePage/WebSite schema, and mobile-friendly metadata.

## Current speed work
- Hero image preload only.
- Non-critical project screenshots lazy-loaded with async decoding.
- Firebase reviews are dynamically imported and loaded near the Reviews section only.
- Vite chunks separate React, icons, and Firebase.
- Static images/assets have long cache headers on Vercel.
- Offscreen sections use content-visibility to reduce rendering cost.
