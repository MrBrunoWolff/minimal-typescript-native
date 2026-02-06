/**
 * Development server with on-the-fly TypeScript/JSX transpilation
 * Run with: bun --hot server.ts
 */

const server = Bun.serve({
  port: 3000,

  async fetch(req) {
    const url = new URL(req.url);

    // Serve bundled JavaScript (transpiled on-the-fly)
    if (url.pathname === "/bundle.js") {
      const result = await Bun.build({
        entrypoints: ["./src/index.tsx"],
        target: "browser",
        format: "esm",
        sourcemap: "inline",
      });

      if (!result.success) {
        console.error("Build failed:");
        for (const log of result.logs) {
          console.error(log);
        }
        return new Response("Build failed", { status: 500 });
      }

      const [output] = result.outputs;
      return new Response(output, {
        headers: {
          "Content-Type": "application/javascript",
          "Cache-Control": "no-cache",
        },
      });
    }

    // Serve static CSS
    if (url.pathname === "/style.css") {
      const file = Bun.file("./public/style.css");
      return new Response(file, {
        headers: {
          "Content-Type": "text/css",
        },
      });
    }

    // Serve index.html for root and unknown paths
    const file = Bun.file("./public/index.html");
    return new Response(file, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
console.log(`   Press Ctrl+C to stop`);
console.log(`   Files are watched - changes will auto-reload!`);
