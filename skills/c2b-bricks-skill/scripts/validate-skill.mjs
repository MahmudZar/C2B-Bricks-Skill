#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const skillDir = dirname(scriptDir);
const skillPath = join(skillDir, "SKILL.md");
const skillText = readFileSync(skillPath, "utf8");
const errors = [];

const frontmatter = skillText.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!frontmatter) {
  errors.push("SKILL.md must start with YAML frontmatter.");
} else {
  const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();

  if (!name) errors.push("Missing frontmatter name.");
  if (!description) errors.push("Missing frontmatter description.");
  if (name && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    errors.push(`Invalid skill name: ${name}`);
  }
  if (name && name !== "c2b-bricks-skill") {
    errors.push(`Skill name must match directory name: ${name}`);
  }
  if (description && description.length > 1024) {
    errors.push("Description must be under 1024 characters.");
  }
  if (description && /\b(I|me|my|you|your)\b/i.test(description)) {
    errors.push("Description should be third-person and avoid first/second person pronouns.");
  }
}

const lineCount = skillText.split(/\r?\n/).length;
if (lineCount > 500) {
  errors.push(`SKILL.md has ${lineCount} lines. Keep it under 500.`);
}

for (const folder of ["references", "assets", "scripts"]) {
  const folderPath = join(skillDir, folder);
  for (const entry of readdirSync(folderPath)) {
    const entryPath = join(folderPath, entry);
    if (statSync(entryPath).isDirectory()) {
      errors.push(`Nested directory is not allowed: ${relative(skillDir, entryPath)}`);
    }
  }
}

if (/\\/.test(skillText)) {
  errors.push("Use forward slashes for paths in SKILL.md.");
}

if (errors.length) {
  console.error("Skill validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Skill validation passed.");
