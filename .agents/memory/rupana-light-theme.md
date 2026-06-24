---
name: Rupana light theme
description: Full light theme palette and component conversion decisions for the Rupana agency site
---

# Light Theme Palette

- Page background: `#f5f3ef` (warm off-white)
- Footer background: `#eceae4` (slightly darker warm off-white)
- Primary text: `#111`
- Secondary text: `rgba(0,0,0,0.5)`
- Borders: `rgba(0,0,0,0.08)`
- Surfaces: `rgba(0,0,0,0.04)` / `rgba(255,255,255,0.7)`
- Primary accent: `#6366f1` (indigo)
- Secondary accent: `#0ea5e9` (sky blue)
- CTA button: `#111` bg, `#fff` text
- Scrollbar: track `#f5f3ef`, thumb `rgba(99,102,241,0.3)`

# Component decisions

- **Navbar**: white glass capsule `rgba(255,255,255,0.82)`, dark logo dot, dark nav links, black "Get Started" button
- **Hero**: light lavender radial gradient bg + light overlay on video, white glass form card, dark inputs, black submit button
- **Projects**: `#f5f3ef` bg, dark headings, indigo accents for labels/toggles/arrows, white semi-transparent cards
- **Services**: `#f5f3ef` bg, hover rows get accent-tinted bg, black CTA
- **About**: `#f5f3ef` bg, dark text (text-gray-900/600/500), indigo gradient stats, glitter particles changed to `bg-gray-700`, "Crafted For Impact" final reveal stays white (overlaid on dark video)
- **Footer**: `#eceae4` bg, dark text, indigo glow dot

**Why:** User requested full dark→light theme conversion for the entire site.

**How to apply:** Any new section or component should use `#f5f3ef` as background, `#111` for text, `rgba(0,0,0,0.08)` for borders, and `#6366f1`/`#0ea5e9` as accent colors.
