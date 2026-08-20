#!/usr/bin/env node

import { existsSync, cpSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {
  console.log("");
  console.log("Usage: bunx @mrbrunowolff/minimal-typescript-native create <project-name>");
  console.log("   or: npx @mrbrunowolff/minimal-typescript-native create <project-name>");
  console.log("");
  console.log("Example:");
  console.log("  bunx @mrbrunowolff/minimal-typescript-native create my-app");
  console.log("");
  process.exit(1);
}

const targetDir = join(process.cwd(), projectName);

// Check if directory already exists
if (existsSync(targetDir)) {
  console.error(`Error: Directory "${projectName}" already exists.`);
  process.exit(1);
}

console.log(`Creating TypeScript Native project: ${projectName}...`);
console.log("");

// Copy template files from the package directory
const templateDir = join(__dirname, "..");
const filesToCopy = [
  "src",
  "public",
  "tests",
  "server.ts",
  "happydom.ts",
  "bunfig.toml",
  "tsconfig.json",
  "package.json",
  "README.md",
  "LICENSE",
];

try {
  // Create target directory and copy files
  for (const file of filesToCopy) {
    const sourcePath = join(templateDir, file);
    const targetPath = join(targetDir, file);

    if (existsSync(sourcePath)) {
      cpSync(sourcePath, targetPath, { recursive: true });
    }
  }

  // Modify package.json
  const packageJsonPath = join(targetDir, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

  packageJson.name = projectName;
  packageJson.version = "0.1.0";
  packageJson.description = `A minimal TypeScript Native application`;
  delete packageJson.bin;
  delete packageJson.files;

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log("✓ Files copied");
  console.log("");

  // Initialize git repository
  try {
    execSync("git init", { cwd: targetDir, stdio: "ignore" });
    console.log("✓ Git repository initialized");
  } catch {
    console.log("⚠ Could not initialize git repository");
  }

  // Create .gitignore
  const gitignoreContent = `node_modules/
dist/
.DS_Store
*.log
.env
.vscode/
`;
  writeFileSync(join(targetDir, ".gitignore"), gitignoreContent);
  console.log("✓ .gitignore created");
  console.log("");

  // Install dependencies
  console.log("Installing dependencies...");
  try {
    // Try Bun first
    execSync("bun --version", { stdio: "ignore" });
    execSync("bun install", { cwd: targetDir, stdio: "inherit" });
  } catch {
    // Fallback to npm
    try {
      execSync("npm install", { cwd: targetDir, stdio: "inherit" });
    } catch {
      console.log('⚠ Could not install dependencies. Run "bun install" or "npm install" manually.');
    }
  }

  console.log("");
  console.log("✅ Project created successfully!");
  console.log("");
  console.log("Next steps:");
  console.log(`  cd ${projectName}`);
  console.log("  bun run dev        # Start development server");
  console.log("  bun test           # Run tests");
  console.log("  bun run typecheck  # Type check with tsgo");
  console.log("  bun run lint       # Lint with oxlint");
  console.log("  bun run fmt        # Format with oxfmt");
  console.log("  bun run build      # Build for production");
  console.log("");
  console.log("The dev server will run at http://localhost:3000");
  console.log("");
} catch (error) {
  console.error("Error creating project:", error.message);
  process.exit(1);
}
