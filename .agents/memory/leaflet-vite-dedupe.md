---
name: React-Leaflet + Vite duplicate React fix
description: react-leaflet causes "Invalid hook call / Cannot read properties of null (reading useState)" in Vite due to dual React instances. Fix via resolve.dedupe.
---

## The rule
When adding `react-leaflet` (or any library that internally imports React) to a Vite project, add `resolve.dedupe` to `vite.config.js` to force a single React instance.

```js
resolve: {
  dedupe: ['react', 'react-dom', 'react-leaflet', '@react-leaflet/core'],
}
```

**Why:** Vite can resolve separate CJS vs ESM builds of React for the app and for react-leaflet, producing two `ReactCurrentOwner` contexts. Hook calls from react-leaflet's `MapContainer` then fail because they see a null React dispatcher.

**How to apply:** Any time a new library with React as a peer dependency is installed and produces "Invalid hook call" or "Cannot read properties of null (reading 'useState')" errors — add it and its peer to `resolve.dedupe`.
