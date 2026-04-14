---
description: Change your site's color scheme
---

# /colors — Color Scheme Picker

You are helping the user change the color scheme of their TabulaKit site. Present the available schemes and apply the user's choice.

## Available Schemes

TabulaKit uses five colors: sidebar background, body background, primary accent (headings), secondary accent (links/nav highlights), and text color.

Present the options using a visual preview format. Use the AskUserQuestion tool with preview panels showing a mockup of each scheme:

| Scheme | Accent | Secondary | Sidebar BG | Body BG | Text | Vibe |
|--------|--------|-----------|------------|---------|------|------|
| **Heatherstone** | `#e84118` (red-orange) | `#3bc0cb` (teal) | `#2a2a2a` | `#222222` | `#dddddd` | Bold, warm, professional |
| **Ocean** | `#3b82f6` (blue) | `#22d3ee` (cyan) | `#1e293b` | `#0f172a` | `#e2e8f0` | Cool, calm, corporate |
| **Forest** | `#22c55e` (green) | `#a3e635` (lime) | `#1a2e1a` | `#141e14` | `#d4e4d4` | Natural, balanced, grounded |
| **Amethyst** | `#8b5cf6` (purple) | `#f472b6` (pink) | `#1e1b2e` | `#15121e` | `#e2ddf0` | Creative, bold, modern |
| **Ember** | `#f97316` (orange) | `#fbbf24` (amber) | `#2a2019` | `#221a12` | `#ede0d0` | Warm, energetic, inviting |
| **Minimal** | `#64748b` (slate) | `#94a3b8` (light slate) | `#1e1e1e` | `#171717` | `#d4d4d4` | Clean, neutral, understated |
| **Custom** | User picks colors | | | | | |

For each scheme in the preview, show a formatted block like:
```
┌─────────────────────────────────────┐
│  SIDEBAR        │  CONTENT          │
│  ▓▓▓▓▓▓▓▓▓▓▓▓  │                   │
│  ■ SECTION      │  ██ Heading       │
│    · Page One   │  Body text here   │
│    · Page Two   │  Link text here   │
│                 │                   │
└─────────────────────────────────────┘
```
Using the actual colors described in words (e.g., "red-orange heading, teal links on dark gray").

If the user picks **Custom**, ask them for their primary accent color and secondary accent color, then auto-generate harmonious sidebar/body/text colors.

## Applying the Scheme

Update `site/css/custom.css` with CSS variable overrides for the chosen scheme. The variables to set:

```css
:root {
  --theme-color: <accent>;
  --theme-color-teal: <secondary>;
  --base-background-color: <body-bg>;
  --base-color: <text>;
  --sidebar-background: <sidebar-bg>;
  --link-color: var(--theme-color-teal);
  --link-color--hover: <lighter version of secondary>;
  --sidebar-nav-strong-color: var(--theme-color-teal);
  --code-inline-color: var(--theme-color-teal);
  --heading-color: var(--theme-color);
  --heading-h2-color: var(--theme-color);
  --sidebar-nav-link-color--active: var(--theme-color);
  --sidebar-name-color: var(--theme-color);
}
body { background: <body-bg>; }
```

Also update `site/config.js` → `theme.color` and `theme.tealColor` to match.

After applying, tell the user to refresh the preview to see the changes. If they don't like it, offer to try another scheme or tweak individual colors.

## Notes

- Preserve any other custom CSS the user has added — only replace the color-related variables
- If `custom.css` doesn't exist yet, create it with just the color overrides
- The user can run this command any time to change schemes — it's not a one-time thing
