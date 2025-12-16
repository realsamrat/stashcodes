---
name: StashCode Component Library
overview: Build a Next.js component library website with Convex database, featuring a dark-themed homepage matching the Figma design, component cards with live previews, Tweakpane integration for interactive debugging, and support for GitHub/CodePen links.
todos: []
---

# StashCode Component Library

## Overview

A component sharing platform where developers can browse handmade UI components, preview them with Tweakpane controls, and get the code via copy or GitHub/CodePen links.

## Tech Stack

- **Framework**: Next.js 16.0.8 (already installed)
- **Database**: Convex (secrets in Doppler)
- **Styling**: Tailwind CSS v4
- **Fonts**: Instrument Serif (headline), Geist/Geist Mono (body/code)
- **Component Tweaking**: [Tweakpane](https://tweakpane.github.io/docs/v3/getting-started/)

## Project Structure

```
stashcode/
├── app/
│   ├── page.tsx                 # Homepage (from Figma)
│   ├── layout.tsx               # Root layout with fonts
│   ├── globals.css              # Global styles
│   ├── components/
│   │   ├── [id]/page.tsx        # Component detail page with Tweakpane
│   │   └── page.tsx             # Browse all components
│   └── submit/page.tsx          # Submit component page
├── components/
│   ├── ui/                      # Shared UI components
│   │   ├── Logo.tsx             # StashCode logo
│   │   ├── Button.tsx
│   │   ├── ComponentCard.tsx    # Card for component grid
│   │   └── Header.tsx
│   └── tweakpane/
│       └── TweakpanePanel.tsx   # Tweakpane wrapper
├── convex/
│   ├── schema.ts                # Database schema
│   ├── components.ts            # Component CRUD functions
│   └── _generated/              # Convex generated files
├── public/
│   └── logo.svg                 # StashCode logo
└── lib/
    └── convex.ts                # Convex client setup
```

## Database Schema (Convex)

```typescript
// convex/schema.ts
components: defineTable({
  name: v.string(),
  description: v.string(),
  code: v.string(),
  previewImage: v.optional(v.string()),
  category: v.string(),
  tags: v.array(v.string()),
  githubUrl: v.optional(v.string()),
  codepenUrl: v.optional(v.string()),
  tweakpaneConfig: v.optional(v.any()), // For Tweakpane props
  author: v.optional(v.string()),
  createdAt: v.number(),
})
```

## Key Features

1. **Homepage**: Dark theme matching Figma with component grid, hero section, gradient fade
2. **Component Cards**: Preview thumbnail, name, category, action buttons (copy, GitHub, CodePen)
3. **Component Detail**: Live preview + Tweakpane panel for adjusting props
4. **Submit Flow**: Form to add new components with code, links, and metadata

## Design Tokens (from Figma)

- Background: `#0a0a0a`
- Card background: `rgba(255,255,255,0.07)`
- Card border: `#424242`
- Primary button: `#9a2323` (red)
- Secondary button: `#