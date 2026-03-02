import chalk from 'chalk'
import inquirer from 'inquirer'
import { PRESETS } from '../presets.js'
import { loadProfiles, loadKeys, saveKey } from '../profiles.js'
import { readSettings, writeSettings } from '../settings.js'

export async function useCommand(provider) {
  const allProviders = { ...PRESETS, ...loadProfiles() }
  const preset = allProviders[provider]

  if (!preset) {
    console.log(chalk.red(`Unknown provider: ${provider}`))
    console.log(chalk.gray('Run: cc-switch list'))
    process.exit(1)
  }

  let key = null
  if (preset.requiresKey) {
    const keys = loadKeys()
    if (keys[provider]) {
      key = keys[provider]
    } else {
      const { key: input } = await inquirer.prompt([{
        type: 'password',
        name: 'key',
        message: `API key for ${preset.name}? (${preset.keyHint})`,
        validate: (v) => v.length > 0 || 'Key required',
      }])
      key = input
      saveKey(provider, key)
    }
  }

  const settings = readSettings()

  if (preset.env === null) {
    delete settings.env
  } else {
    const env = { ...preset.env }
    if (key && preset.keyEnv) env[preset.keyEnv] = key
    settings.env = env
  }

  writeSettings(settings)
  console.log(chalk.green(`✓ Switched to ${preset.name}`))
  console.log(chalk.gray('Restart Claude Code to apply'))
}
