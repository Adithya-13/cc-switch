import chalk from 'chalk'
import { PRESETS } from '../presets.js'
import { loadProfiles, loadKeys } from '../profiles.js'
import { readSettings, getCurrentProvider } from '../settings.js'

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
    const keyStatus = preset.requiresKey === false
      ? chalk.gray('OAuth')
      : hasKey ? chalk.green('key ✓') : chalk.yellow('no key')

    console.log(`  ${marker} ${label.padEnd(isActive ? 33 : 25)} ${keyStatus}`)
    if (preset.description) {
      console.log(`    ${chalk.gray(preset.description)}`)
    }
  }
  console.log()
}
