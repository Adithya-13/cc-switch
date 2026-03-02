import chalk from 'chalk'
import inquirer from 'inquirer'
import { saveProfile, saveKey } from '../profiles.js'

export async function addCommand(name) {
  console.log(chalk.bold(`\nAdding custom provider: ${name}\n`))

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'displayName',
      message: 'Display name:',
      default: name,
    },
    {
      type: 'input',
      name: 'baseUrl',
      message: 'Base URL (e.g. https://api.example.com):',
      validate: (v) => v.startsWith('http') || 'Must start with http',
    },
    {
      type: 'password',
      name: 'key',
      message: 'API key (leave blank if not required):',
    },
    {
      type: 'input',
      name: 'sonnetModel',
      message: 'Default sonnet model (blank to skip):',
      default: '',
    },
    {
      type: 'input',
      name: 'haikusModel',
      message: 'Default haiku model (blank to skip):',
      default: '',
    },
    {
      type: 'input',
      name: 'opusModel',
      message: 'Default opus model (blank to skip):',
      default: '',
    },
  ])

  const env = {
    ANTHROPIC_BASE_URL: answers.baseUrl,
    API_TIMEOUT_MS: '600000',
  }
  if (answers.sonnetModel) env.ANTHROPIC_DEFAULT_SONNET_MODEL = answers.sonnetModel
  if (answers.haikusModel) env.ANTHROPIC_DEFAULT_HAIKU_MODEL = answers.haikusModel
  if (answers.opusModel) env.ANTHROPIC_DEFAULT_OPUS_MODEL = answers.opusModel

  const profile = {
    name: answers.displayName,
    description: `Custom: ${answers.baseUrl}`,
    baseUrl: answers.baseUrl,
    env,
    requiresKey: !!answers.key,
    keyEnv: answers.key ? 'ANTHROPIC_AUTH_TOKEN' : undefined,
  }

  saveProfile(name, profile)
  if (answers.key) saveKey(name, answers.key)

  console.log(chalk.green(`\n✓ Added ${answers.displayName}`))
  console.log(chalk.gray(`  Switch: cc-switch use ${name}\n`))
}
