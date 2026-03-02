import chalk from 'chalk'

export function maskKey(key) {
  if (!key || key.length < 8) return '***'
  return key.slice(0, 4) + '...' + key.slice(-4)
}

export const icons = {
  ok: chalk.green('✓'),
  warn: chalk.yellow('⚠'),
  error: chalk.red('✗'),
  arrow: chalk.cyan('→'),
  active: chalk.green('●'),
  inactive: chalk.gray('○'),
}
