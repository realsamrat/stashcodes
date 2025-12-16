# Stashcode

A growing library of thoughtfully designed UI components. You won't find these in standard kits.

## Features

- Interactive component previews
- Test every state and variation
- Copy code or fork from GitHub
- Built with Next.js 16, React 19, and Tailwind CSS 4
- Smooth animations powered by Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the component library.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Tech Stack

- **Framework**: Next.js 16
- **UI**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Motion
- **Syntax Highlighting**: Shiki
- **Icons**: Iconify, Font Awesome

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── components/       # Page-specific components
│   └── page.tsx          # Home page
├── components/           # Shared components
│   ├── library/          # UI component library
│   ├── preview/          # Preview components
│   └── ui/               # Core UI components
├── lib/                  # Utilities and helpers
├── public/
│   └── registry/         # Component registry JSON files
└── packages/             # Additional packages
```

## License

MIT
