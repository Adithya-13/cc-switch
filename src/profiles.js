import { readFileSync, writeFileSync, mkdirSync, existsSync, chmodSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'

const DIR = join(homedir(), '.cc-switch')
const KEYS_PATH = join(DIR, 'keys.json')
const PROFILES_PATH = join(DIR, 'profiles.json')
const INIT_FLAG = join(DIR, '.initialized')

function ensureDir() {
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true })
}

export function isFirstRun() {
  ensureDir()
  if (!existsSync(INIT_FLAG)) {
    writeFileSync(INIT_FLAG, '')
    return true
  }
  return false
}

export function loadKeys() {
  if (!existsSync(KEYS_PATH)) return {}
  return JSON.parse(readFileSync(KEYS_PATH, 'utf8'))
}

export function saveKey(name, key) {
  ensureDir()
  const keys = loadKeys()
  keys[name] = key
  writeFileSync(KEYS_PATH, JSON.stringify(keys, null, 2))
  chmodSync(KEYS_PATH, 0o600)
}

export function loadProfiles() {
  if (!existsSync(PROFILES_PATH)) return {}
  return JSON.parse(readFileSync(PROFILES_PATH, 'utf8'))
}

export function saveProfile(name, profile) {
  ensureDir()
  const profiles = loadProfiles()
  profiles[name] = profile
  writeFileSync(PROFILES_PATH, JSON.stringify(profiles, null, 2))
}
