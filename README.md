# FuturMind AI

**Explore. Create. Earn with AI.**

Free, beginner-friendly guides on AI tools, content creation and online earning.
Website: https://futurmindai.com · Owner: Ghulam Mustafa Janjua (Dubai, UAE)

## Structure

| Path | Purpose |
|------|---------|
| `index.html` | Homepage |
| `tools.html` | AI tools directory |
| `blog.html` | All articles (newest first) |
| `news.html` | AI news for creators (update monthly) |
| `about.html`, `contact.html` | Brand and contact pages |
| `privacy.html`, `terms.html`, `disclaimer.html` | Legal pages (AdSense-ready) |
| `404.html` | Custom "page not found" page |
| `*-2026.html`, `what-is-chatgpt.html` | Articles |
| `thumbnails/` | Blog card images (SVG) |
| `images/og/` | Social sharing images (PNG, 1200x630) |
| `brand/` | Favicon and brand assets |
| `styles.css`, `script.js` | Design and site behaviour (do not edit by hand) |
| `sitemap.xml`, `robots.txt`, `ads.txt` | Search engine and AdSense files |

## Rules for new articles

1. File name = URL slug, e.g. `my-article-2026.html` -> `https://futurmindai.com/my-article-2026`
2. Canonical, og:url and all internal links use clean URLs (no `.html`)
3. Every article needs: thumbnail in `thumbnails/`, social image in `images/og/`, a card in `blog.html`, and an entry in `sitemap.xml`
4. After uploading: Cloudflare "Purge Everything" (only if CSS/JS/images changed) and Search Console "Request Indexing"
