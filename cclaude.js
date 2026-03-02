#!/usr/bin/env node
import { spawn } from "child_process";
import chalk from "chalk";
import { readSettings, getCurrentProvider } from "../src/settings.js";
import { PRESETS } from "../src/presets.js";
import { loadKeys, loadProfiles } from "../src/profiles.js";

const RATE_LIMIT_PATTERNS = [
  /usage limit reached/i,
  /rate limit/i,
  /Claude\.ai usage limit/i,
  /exceeded.*limit/i,
  /quota exceeded/i,
];

function getAvailableFallbacks(current) {
  const keys = loadKeys();
  const customProfiles = loadProfiles();
  const allProviders = { ...PRESETS, ...customProfiles };

  return Object.entries(allProviders)
    .filter(([name, preset]) => {
      if (name === current) return false;
      if (preset.requiresKey === false) return true; // pro (OAuth) always "available"
      return !!keys[name]; // only if key is saved
    })
    .map(([name, preset]) => ({ name, label: preset.name || name }));
}

function notifyRateLimit(current, fallbacks) {
  console.error("\n" + chalk.yellow("━".repeat(50)));
  console.error(chalk.yellow.bold("  ⚠  Claude usage limit reached"));
  console.error(chalk.yellow("━".repeat(50)));

  if (fallbacks.length === 0) {
    console.error(chalk.gray("\n  No saved fallback providers."));
    console.error(chalk.gray(`  Add one: ${chalk.cyan("cc-switch add <provider>")}\n`));
    return;
  }

  console.error(chalk.bold("\n  Available fallbacks:\n"));
  fallbacks.forEach(({ name, label }) => {
    console.error(`  ${chalk.cyan("→")} ${label.padEnd(20)} ${chalk.gray(`cc-switch use ${name}`)}`);
  });

  const top = fallbacks[0];
  console.error(
    `\n  ${chalk.bold("Quick switch:")} ${chalk.cyan(`cc-switch use ${top.name}`)}\n` +
    `  Then restart: ${chalk.cyan("cclaude")}\n`
  );
  console.error(chalk.yellow("━".repeat(50)) + "\n");
}

// run claude, intercept output for rate limit signals
const settings = readSettings();
const current = getCurrentProvider(settings);

const child = spawn("claude", process.argv.slice(2), {
  stdio: ["inherit", "inherit", "pipe"], // intercept stderr
});

let stderrBuffer = "";

child.stderr.on("data", (data) => {
  const text = data.toString();
  stderrBuffer += text;
  process.stderr.write(data); // still show to user

  const isRateLimit = RATE_LIMIT_PATTERNS.some((p) => p.test(stderrBuffer));
  if (isRateLimit) {
    const fallbacks = getAvailableFallbacks(current);
    notifyRateLimit(current, fallbacks);
    stderrBuffer = ""; // reset to avoid re-triggering
  }
});

child.on("exit", (code) => process.exit(code ?? 0));
