import chalk from 'chalk'
import { PRESETS } from '../presets.js'
import { loadProfiles } from '../profiles.js'
import { readSettings, getCurrentProvider } from '../settings.js'

export function statusCommand() {
  const settings = readSettings()
  const current = getCurrentProvider(settings)
  const all = { ...PRESETS, ...loadProfiles() }
  const preset = all[current]

  console.log()
  console.log(`  Active: ${chalk.green.bold(preset?.name || current)}`)
  if (preset?.description) console.log(`  ${chalk.gray(preset.description)}`)
  if (settings.env?.ANTHROPIC_BASE_URL) {
    console.log(`  URL:    ${chalk.gray(settings.env.ANTHROPIC_BASE_URL)}`)
  }
  console.log()
}
