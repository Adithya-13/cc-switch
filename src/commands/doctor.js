import chalk from 'chalk'
import { existsSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'
import { PRESETS } from '../presets.js'
import { loadKeys, loadProfiles } from '../profiles.js'
import { readSettings, getCurrentProvider } from '../settings.js'
import { maskKey } from '../utils.js'

export function doctorCommand() {
  const settingsPath = join(homedir(), '.claude', 'settings.json')
  const keysPath = join(homedir(), '.cc-switch', 'keys.json')

  console.log(chalk.bold('\n  cc-switch doctor\n'))

  const settingsOk = existsSync(settingsPath)
  console.log(`  ${settingsOk ? chalk.green('✓') : chalk.red('✗')} ~/.claude/settings.json`)

  const settings = readSettings()
  const current = getCurrentProvider(settings)
  const all = { ...PRESETS, ...loadProfiles() }
  console.log(`  ${chalk.green('●')} Active: ${chalk.bold(all[current]?.name || current)}`)

  const keys = loadKeys()
  const keysExist = existsSync(keysPath)
  console.log(`  ${keysExist ? chalk.green('✓') : chalk.gray('○')} ~/.cc-switch/keys.json`)

  console.log(`\n  Saved keys:`)
  const needsKey = Object.entries(all).filter(([, p]) => p.requiresKey !== false)
  for (const [name, preset] of needsKey) {
    const key = keys[name]
    const status = key ? chalk.green(`saved (${maskKey(key)})`) : chalk.gray('not saved')
    const icon = key ? chalk.green('✓') : chalk.gray('○')
    console.log(`  ${icon} ${(preset.name || name).padEnd(22)} ${status}`)
  }

  console.log(`\n  ${chalk.green('✓')} Node.js ${process.version}\n`)
}
