# Minimal TypeScript Native

A minimal vanilla TypeScript + JSX starter on Bun, type-checked with TypeScript 7’s native compiler (`tsc`) and linted/formatted with Oxc.

[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## Features

- Bun dev server (`Bun.serve` with an HTML import) that bundles `src/index.tsx` on demand and hot-reloads via `bun --hot`
- Custom JSX runtime (`h`, `Fragment`) that creates real DOM elements; no runtime dependencies
- Type checking with stable TypeScript 7 (`typescript` and `tsc`), configured with `noEmit`
- Linting with oxlint and formatting with oxfmt
- Tests with `bun test` and happy-dom, preloaded through `bunfig.toml`
- Production build with `bun build` from `public/index.html`, emitting content-hashed assets to `dist/`
- GitHub Actions CI: check, test, build and `bun audit`, then npm publish via trusted publishing
- Install hardening: `minimumReleaseAge` in `bunfig.toml` refuses packages published less than 3 days ago

## Quick start

### Clone

```sh
git clone https://github.com/MrBrunoWolff/minimal-typescript-native.git
cd minimal-typescript-native
bun install
bun run dev
```

The dev server runs at http://localhost:3000.

## Scripts

| Command              | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `bun run dev`        | Start the dev server (`server.ts`) with hot reload         |
| `bun run build`      | Bundle `public/index.html` into `dist/`, minified          |
| `bun run test`       | Run the test suite in parallel                             |
| `bun run test:watch` | Run tests in watch mode                                    |
| `bun run typecheck`  | Type check with tsc                                        |
| `bun run lint`       | Lint with oxlint                                           |
| `bun run lint:fix`   | Lint and auto-fix with oxlint                              |
| `bun run fmt`        | Format all files with oxfmt                                |
| `bun run fmt:check`  | Check formatting with oxfmt                                |
| `bun run check`      | Run `typecheck`, `lint` and `fmt:check` in parallel        |
| `bun run audit`      | Audit dependencies, failing on high or critical advisories |

## Project structure

```
minimal-typescript-native/
├── .github/workflows/ci.yml     # Quality checks + npm publish
├── bin/
│   └── create-ts-native-app.js  # Project scaffolder (package bin)
├── public/
│   ├── index.html               # Entry point for both dev and build
│   └── style.css                # Global styles
├── src/
│   ├── index.tsx                # App entry
│   ├── jsx-runtime.ts           # Custom JSX factory (h, Fragment)
│   ├── jsx.d.ts                 # JSX type declarations
│   ├── components/
│   │   └── Counter.tsx          # Example component
│   └── utils/
│       └── helpers.ts           # formatDate, createElement, debounce
├── tests/
│   ├── components/
│   │   └── Counter.test.ts
│   └── utils/
│       └── helpers.test.ts
├── server.ts                    # Dev server
├── happydom.ts                  # happy-dom test preload
├── bunfig.toml                  # Bun install, test and JSX config
├── tsconfig.json
├── package.json
└── LICENSE
```

## JSX runtime

`tsconfig.json` sets `"jsx": "react"` with `jsxFactory: "h"` and `jsxFragmentFactory: "Fragment"`, so any `.tsx` file that imports `h` from `src/jsx-runtime.ts` gets real DOM nodes from JSX. `className`, `on*` event handlers, `style` objects and `ref` callbacks are handled; other props become attributes.

```tsx
import { h } from "../jsx-runtime";

export function Greeting({ name }: { name: string }): HTMLElement {
  return (
    <div className="greeting">
      <p>Hello, {name}</p>
      <button onClick={() => console.log("clicked")}>Click me</button>
    </div>
  ) as HTMLElement;
}
```

Components are plain functions returning `HTMLElement`; see `src/components/Counter.tsx` for state handled with direct DOM updates.

## Dev server and build

`public/index.html` is the single entry point. `server.ts` imports it and serves it on every route, so Bun follows its `<script>` and `<link>` tags, bundles `src/index.tsx` and `style.css` on demand, and hot-reloads them. `bun run build` passes the same file to `bun build`, which emits content-hashed assets to `dist/` with the references rewritten.

## Publishing

On a push to `main` (or a manual `gh workflow run ci.yml`), CI runs the quality job and then publishes `@mrbrunowolff/minimal-typescript-native` to npm through trusted publishing (OIDC, no token) when the `package.json` version is not yet on the registry. Trusted publishing cannot do a package's first publish: until the package has been published once manually and the trusted publisher is configured (repository `MrBrunoWolff/minimal-typescript-native`, workflow `ci.yml`), the publish step is skipped.

## License

MIT — see [LICENSE](LICENSE).
