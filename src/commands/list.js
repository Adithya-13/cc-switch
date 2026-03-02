import chalk from 'chalk'
import { PRESETS } from '../presets.js'
import { loadProfiles, loadKeys } from '../profiles.js'
import { readSettings, getCurrentProvider } from '../settings.js'
import { maskKey } from '../utils.js'

export function listCommand() {
  const settings = readSettings()
  const current = getCurrentProvider(settings)
  const customProfiles = loadProfiles()
  const keys = loadKeys()
  const all = { ...PRESETS, ...customProfiles }

  console.log()
  for (const [name, preset] of Object.entries(all)) {
    const isActive = name === current
    const hasKey = preset.requiresKey === false || !!keys[name]
    const marker = isActive ? chalk.green('●') : chalk.gray('○')
    const label = isActive ? chalk.green.bold(preset.name) : chalk.white(preset.name)
    const alias = chalk.gray(`[${name}]`)
    const keyStatus = preset.requiresKey === false
      ? chalk.gray('OAuth')
      : hasKey ? chalk.green(`key ${maskKey(keys[name])}`) : chalk.yellow('no key')

    console.log(`  ${marker} ${label.padEnd(isActive ? 28 : 20)} ${alias.padEnd(10)} ${keyStatus}`)
    if (preset.description) {
      console.log(`    ${chalk.gray(preset.description)}`)
    }
  }
  console.log()
}
