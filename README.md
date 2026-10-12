# Zara Handmade — React (Vite)

React 18 + Vite conversion of `zara-handmade-v7`, including your edits
(nav labels, hero layout, category order and covers, CSS tweaks). Your `style.css` is used unchanged
(`src/styles/style.css`), so the design is identical.

## Run
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the build locally
```
Needs Node 18+. The built `dist/` folder works from any folder or sub-path (`base: "./"`).

## Structure
```
public/assets/            your photos + video (served as /assets/…)
src/
  main.jsx                entry (StrictMode + ShopProvider)
  App.jsx                 page composition + body scroll-lock
  data/catalog.js         CATS, PRODUCTS, descriptions, tags — edit products & photos here
  context/ShopContext.jsx cart, saved items, filters, sort, show more/less, drawer, quick view, toast
  hooks/index.js          useRafScroll, useMagnetic, useDialog (focus trap/Esc), useLiveDate
  components/
    Loader, ScrollProgress, Cursor, Header, Hero, Manifesto, Categories,
    Shop (ProductCard), QuickView, Reel, Craft, Gallery, Contact,
    CartDrawer, Toast, Reveal
  styles/style.css        global stylesheet (unchanged class names)
```

## What changed vs. the HTML/JS version
- `document.querySelector` + `innerHTML` rendering → components, props and state.
- Cart and saved items live in one context; they still persist in localStorage (same key `zara-v5`).
- Scroll effects share one rAF-throttled hook; dialogs share one focus-trap hook.
- Product cards are memoised and keyed, so hearting or adding an item no longer re-animates the whole grid.
- Photos are referenced with `asset("file.jpg")` from `data/catalog.js`.
