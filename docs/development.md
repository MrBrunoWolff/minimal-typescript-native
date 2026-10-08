# Minimal TypeScript Native development

[Project overview](../README.md)

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

## Validation and dependencies

Run `bun run check:ci` before a commit or pull request. See [QUALITY.md](../QUALITY.md) for the validation stages. Bun applies the three-day minimum release age in `bunfig.toml`; preserve it when updating dependencies. Verify a frozen install after refreshing the lockfile.
