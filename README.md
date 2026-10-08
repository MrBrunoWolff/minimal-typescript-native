# Minimal TypeScript Native

A TypeScript and JSX starter that renders real DOM elements through a small custom JSX runtime, without a UI framework.

[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## Quick start

Use the Bun version declared in [package.json](package.json).

```sh
git clone https://github.com/MrBrunoWolff/minimal-typescript-native.git
cd minimal-typescript-native
bun install --frozen-lockfile
bun run dev
```

Open [localhost:3000](http://localhost:3000).

## Features

- Custom JSX runtime with event handlers, styles and refs.
- Bun hot reloading and production bundling.
- Native TypeScript checking, Oxc tooling and happy-dom tests.

## Scripts

| Command            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `bun run dev`      | Start development with hot reloading            |
| `bun run build`    | Bundle and minify the app into dist/            |
| `bun run check`    | Check types, lint and formatting                |
| `bun run test`     | Run DOM and utility tests                       |
| `bun run audit`    | Audit dependencies                              |
| `bun run check:ci` | Run the complete repository validation contract |

## Development

See the [development guide](docs/development.md) for project structure, implementation details and maintenance. The complete command list is in [package.json](package.json).

## License

MIT — see [LICENSE](LICENSE).
