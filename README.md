# ⚡ Minimal TypeScript Native + Bun

A minimal, modern TypeScript Native starter template powered by Bun. Zero-build development with TypeScript, JSX, tsgo, and Oxc tooling.

## ✨ Features

- **TypeScript Native (tsgo)** - 10x faster type checking with Microsoft's Go-based compiler
- **Bun Runtime** - Fast JavaScript runtime and bundler
- **Custom JSX Runtime** - Vanilla TypeScript JSX that creates real DOM elements
- **Zero Runtime Dependencies** - Pure vanilla TypeScript, no frameworks
- **Zero-Build Dev** - On-the-fly transpilation during development
- **Hot Reload** - Automatic server reload with `bun --hot`
- **Oxlint** - Lightning-fast linting (zero-config, ESLint compatible)
- **Oxfmt** - Ultra-fast formatting (Prettier compatible)
- **DOM Testing** - Built-in testing with happy-dom
- **ES Modules** - Modern JavaScript module system
- **Production Build** - Optimized bundling for deployment

## 🚀 Quick Start

### Create a new project

```bash
bunx minimal-typescript-native create my-app
```

### Or clone this repository

```bash
git clone https://github.com/yourusername/minimal-typescript-native.git my-app
cd my-app
bun install
```

## 📦 Usage

### Development

Start the development server with hot reload:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The server watches for file changes and automatically reloads. Just refresh your browser to see updates!

### Type Checking

Run type checking with tsgo (TypeScript 7 native):

```bash
bun run typecheck
```

### Linting

Lint your code with oxlint:

```bash
# Check for issues
bun run lint

# Auto-fix issues
bun run lint:fix
```

### Formatting

Format your code with oxfmt:

```bash
# Format files
bun run fmt

# Check formatting
bun run fmt:check
```

### Testing

Run tests with happy-dom:

```bash
# Run all tests
bun test

# Watch mode
bun test --watch
```

### Production Build

Create an optimized bundle:

```bash
bun run build
```

This generates a minified bundle in the `dist/` directory.

`public/index.html` is the entry point for both dev and build: Bun follows the
`<script>` and `<link>` it references, so the same file drives the dev server and
the production bundle. The build emits content-hashed assets with the references
rewritten, rather than copying files and renaming a bundle to match a hardcoded
`<script src>`.

### Run All Checks

Run type checking, linting, and format checking together:

```bash
bun run check
```

## 📁 Project Structure

```
minimal-typescript-native/
├── src/
│   ├── jsx-runtime.ts         # Custom JSX factory (h, Fragment)
│   ├── index.tsx              # Main entry point
│   ├── components/
│   │   └── Counter.tsx        # Example JSX component
│   └── utils/
│       └── helpers.ts         # Utility functions
├── public/
│   ├── index.html             # Entry point: <script src> drives both dev and build
│   └── style.css              # Global styles
├── tests/
│   ├── components/
│   │   └── Counter.test.ts    # Component tests
│   └── utils/
│       └── helpers.test.ts    # Utility tests
├── server.ts                  # Dev server: imports index.html, Bun bundles + hot-reloads
├── happydom.ts                # DOM testing setup
├── bunfig.toml                # Bun configuration
└── package.json
```

## 🎯 Philosophy

This starter embraces a **minimal, vanilla approach** to TypeScript development:

- **No runtime dependencies** - Pure vanilla TypeScript, no frameworks
- **Custom JSX runtime** - Real DOM elements from JSX syntax
- **No build step in development** - Bun transpiles TypeScript on-the-fly
- **Component functions** - Clean component structure returning HTMLElement
- **Vanilla DOM APIs** - Direct DOM manipulation and events
- **Modern tooling** - tsgo for type checking, Oxc for linting/formatting
- **ES modules** - Modern import/export syntax
- **Production-ready** - Optimized builds when you need them

## 💡 Examples

### Custom JSX Runtime

```typescript
import { h } from './jsx-runtime';

// JSX creates real DOM elements
const element = (
  <div className="container">
    <h1>Hello TypeScript Native!</h1>
    <button onClick={() => console.log('Clicked!')}>
      Click me
    </button>
  </div>
) as HTMLElement;

document.body.appendChild(element);
```

### Component Functions

```typescript
import { h } from '../jsx-runtime';

interface CounterProps {
  initialCount: number;
}

export function Counter({ initialCount }: CounterProps): HTMLElement {
  let count = initialCount;

  const display = <div className="display">{count}</div> as HTMLDivElement;

  return (
    <div className="counter">
      {display}
      <button onClick={() => {
        count++;
        display.textContent = String(count);
      }}>
        Increment
      </button>
    </div>
  ) as HTMLElement;
}

// Use the component
const counter = Counter({ initialCount: 0 });
document.getElementById('app')!.appendChild(counter);
```

### Testing with happy-dom

```typescript
/// <reference lib="dom" />

import { test, expect } from "bun:test";
import { Counter } from "../src/components/Counter";

test("Counter increments on button click", () => {
  const counter = Counter({ initialCount: 0 });
  document.body.appendChild(counter);

  const button = document.querySelector("button") as HTMLButtonElement;
  const display = document.querySelector(".display") as HTMLElement;

  button.click();
  expect(display.textContent).toBe("1");
});
```

## 🛠️ Tech Stack

- [TypeScript Native (tsgo)](https://github.com/microsoft/typescript-go) - 10x faster type checking
- [Oxc (oxlint + oxfmt)](https://oxc.rs/) - Lightning-fast linting and formatting
- [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [happy-dom](https://github.com/capricorn86/happy-dom) - Fast DOM implementation for testing

## 📖 Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `bun run dev`       | Start development server with hot reload |
| `bun run build`     | Create production bundle                 |
| `bun test`          | Run tests                                |
| `bun test --watch`  | Run tests in watch mode                  |
| `bun run typecheck` | Type check with tsgo                     |
| `bun run lint`      | Lint with oxlint                         |
| `bun run lint:fix`  | Auto-fix lint issues                     |
| `bun run fmt`       | Format with oxfmt                        |
| `bun run fmt:check` | Check formatting                         |
| `bun run check`     | Run all checks (typecheck + lint + fmt)  |

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🔗 Links

- [TypeScript Native (tsgo)](https://github.com/microsoft/typescript-go)
- [Oxc Documentation](https://oxc.rs/)
- [Bun Documentation](https://bun.sh/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Happy coding with TypeScript Native! 🎉**
