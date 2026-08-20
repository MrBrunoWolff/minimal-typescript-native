/**
 * Development server.
 *
 * `public/index.html` is imported, not served as a file: Bun follows the
 * `<script>` and `<link>` it references, bundles src/index.tsx (through the
 * custom JSX runtime in src/jsx-runtime.ts) and style.css on demand, and
 * hot-reloads them. That replaces the hand-rolled router this used to be — a
 * /bundle.js branch that called Bun.build() on *every request*, plus separate
 * branches to hand back the CSS and the HTML with their content types.
 *
 * Run with: bun --hot server.ts
 */
import index from "./public/index.html";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/*": index,
  },
  development: true,
});

console.log(`🚀 Server running at ${server.url}`);
console.log(`   Press Ctrl+C to stop`);
console.log(`   Files are watched — changes will auto-reload!`);
