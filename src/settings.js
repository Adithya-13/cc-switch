import { readFileSync, writeFileSync, copyFileSync, existsSync, renameSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'
import { PRESETS } from './presets.js'
import { loadProfiles } from './profiles.js'

const SETTINGS_PATH = join(homedir(), '.claude', 'settings.json')

export function readSettings() {
  if (!existsSync(SETTINGS_PATH)) return {}
  return JSON.parse(readFileSync(SETTINGS_PATH, 'utf8'))
}

export function writeSettings(settings) {
  if (existsSync(SETTINGS_PATH)) {
    copyFileSync(SETTINGS_PATH, SETTINGS_PATH + '.bak')
  }
  const tmp = SETTINGS_PATH + '.tmp'
  writeFileSync(tmp, JSON.stringify(settings, null, 2) + '\n')
  renameSync(tmp, SETTINGS_PATH)
}

export function getCurrentProvider(settings) {
  const env = settings?.env
  if (!env || Object.keys(env).length === 0) return 'pro'
  const baseUrl = env.ANTHROPIC_BASE_URL
  if (!baseUrl) return 'pro'
  const allProviders = { ...PRESETS, ...loadProfiles() }
  for (const [name, preset] of Object.entries(allProviders)) {
    if (preset.baseUrl && baseUrl === preset.baseUrl) return name
  }
  return 'unknown'
}
