#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { useCommand } from "../src/commands/use.js";
import { listCommand } from "../src/commands/list.js";
import { statusCommand } from "../src/commands/status.js";
import { addCommand } from "../src/commands/add.js";
import { doctorCommand } from "../src/commands/doctor.js";
import { readSettings, getCurrentProvider } from "../src/settings.js";
import { PRESETS } from "../src/presets.js";
import { loadProfiles, isFirstRun } from "../src/profiles.js";

if (isFirstRun()) {
  const settings = readSettings()
  const current = getCurrentProvider(settings)
  const preset = PRESETS[current] || loadProfiles()[current]
  const name = preset?.name || current

  console.log()
  console.log(chalk.cyan('  ╔══════════════════════════════════════════════╗'))
  console.log(chalk.cyan('  ║          Welcome to cc-switch! 🎉            ║'))
  console.log(chalk.cyan('  ║   Switch Claude Code between providers       ║'))
  console.log(chalk.cyan('  ╚══════════════════════════════════════════════╝'))
  console.log()
  console.log(chalk.white('  Quick start:'))
  console.log()
  console.log(chalk.gray('  1. See all providers:     cc-switch list'))
  console.log(chalk.gray('  2. Switch provider:       cc-switch use zai'))
  console.log(chalk.gray('  3. Add your API key:      cc-switch use kimi   (prompts for key)'))
  console.log(chalk.gray('  4. Save for next time:    keys saved in ~/.cc-switch/keys.json'))
  console.log()
  console.log(chalk.gray('  Hit a rate limit? Use cclaude instead of claude —'))
  console.log(chalk.gray('  it detects limits and shows fallback options.'))
  console.log()
  console.log(chalk.white(`  Active: ${chalk.green.bold(name)}`))
  console.log()
}

const program = new Command();

program
  .name("cc-switch")
  .description("Switch Claude Code between providers")
  .version("1.0.0");

program
  .command("use <provider>")
  .description("Switch to a provider (pro, zai, kimi, openrouter, deepseek, qwen, ollama)")
  .action(async (provider) => {
    await useCommand(provider);
  });

program
  .command("list")
  .alias("ls")
  .description("List all providers and their status")
  .action(() => listCommand());

program
  .command("status")
  .description("Show current active provider")
  .action(() => statusCommand());

program
  .command("add <name>")
  .description("Add a custom provider profile")
  .action(async (name) => {
    await addCommand(name);
  });

program
  .command("doctor")
  .description("Check setup and saved keys")
  .action(async () => {
    await doctorCommand();
  });

// default: no args → show status + hint
program.action(() => {
  try {
    const settings = readSettings();
    const current = getCurrentProvider(settings);
    const customProfiles = loadProfiles();
    const preset = PRESETS[current] || customProfiles[current];
    const name = preset?.name || current;

    console.log(`\n  ${chalk.bold("cc-switch")} — Claude Code provider switcher`);
    console.log(`  Active: ${chalk.green.bold(name)}\n`);
    console.log(`  ${chalk.gray("cc-switch list")}          list all providers`);
    console.log(`  ${chalk.gray("cc-switch use <name>")}    switch provider`);
    console.log(`  ${chalk.gray("cc-switch status")}        show current`);
    console.log(`  ${chalk.gray("cc-switch add <name>")}    add custom provider`);
    console.log(`  ${chalk.gray("cc-switch doctor")}        check setup\n`);
  } catch {
    program.help();
  }
});

program.parse();
