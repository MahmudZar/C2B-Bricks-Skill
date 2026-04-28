#!/usr/bin/env node

import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const getArg = (name) => {
  const index = args.indexOf(name);
  return index === -1 ? null : args[index + 1];
};

const htmlPath = getArg("--html");
const cssPath = getArg("--css");
const jsPath = getArg("--js");
const errors = [];
const warnings = [];

if (!htmlPath || !cssPath || !jsPath) {
  console.error("Usage: node validate-output.mjs --html output.html --css output.css --js output.js");
  process.exit(1);
}

const html = readFileSync(htmlPath, "utf8");
const css = readFileSync(cssPath, "utf8");
const js = readFileSync(jsPath, "utf8");
const combined = `${html}\n${css}\n${js}`;

if (/<\/?(html|head|body|main)\b/i.test(html)) {
  errors.push("HTML should start at the component root and not include html, head, body, or main.");
}

if (!/data-bricks=["']container["']/.test(html)) {
  warnings.push("No data-bricks=\"container\" marker found. Add it if the component has an intended Bricks container.");
}

if (!/data-component=["'][a-z0-9-]+["']/.test(html) && js.trim()) {
  warnings.push("JavaScript exists but no data-component root was found.");
}

if (/\b(className|import\s+React|from\s+["']react["']|<script\s+type=["']module["'])/i.test(combined)) {
  errors.push("Framework or module syntax detected. Output must be plain browser HTML, CSS, and JavaScript.");
}

if (/\b(tailwind|className=|jsx|tsx)\b/i.test(combined)) {
  errors.push("Tailwind, JSX, or TSX language detected.");
}

if (/transition\s*:\s*all\b/i.test(css)) {
  errors.push("Avoid transition: all. Specify exact properties.");
}

if (/transform\s*:\s*scale\(0\)/i.test(css)) {
  errors.push("Do not animate from scale(0). Use scale(0.95) with opacity instead.");
}

if (/display\s*:\s*flex/i.test(css) && !/flex-direction\s*:/i.test(css)) {
  warnings.push("Flex is used but flex-direction was not found. Bricks output should define flex containers explicitly.");
}

if (js.trim() && !/DOMContentLoaded/.test(js)) {
  errors.push("JavaScript must be wrapped in DOMContentLoaded.");
}

if (/[\u2014\u2013\u201c\u201d\u2018\u2019\u2026]/.test(combined)) {
  errors.push("Smart punctuation or dash characters detected. Use plain ASCII punctuation.");
}

const bannedCopy = [
  "seamless",
  "elevate",
  "leverage",
  "utilize",
  "empower",
  "cutting-edge",
  "next-generation",
  "state-of-the-art",
  "game-changing",
  "unlock",
  "unleash",
  "supercharge",
  "best-in-class",
  "world-class"
];

for (const phrase of bannedCopy) {
  const pattern = new RegExp(`\\b${phrase}\\b`, "i");
  if (pattern.test(combined)) warnings.push(`Banned or risky copy phrase detected: ${phrase}`);
}

if (errors.length) {
  console.error("Output validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  if (warnings.length) {
    console.error("Warnings:");
    for (const warning of warnings) console.error(`- ${warning}`);
  }
  process.exit(1);
}

if (warnings.length) {
  console.log("Output validation passed with warnings:");
  for (const warning of warnings) console.log(`- ${warning}`);
} else {
  console.log("Output validation passed.");
}
