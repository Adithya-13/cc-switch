// Built-in provider presets
// env: null means "no env block" (use Claude OAuth)

export const PRESETS = {
  pro: {
    name: "Claude Pro/Max",
    description: "Claude subscription (Pro, Max, Team)",
    env: null, // removes env block, falls back to OAuth
    requiresKey: false,
  },
  zai: {
    name: "z.ai (GLM)",
    description: "Z.AI GLM-4.7 / GLM-5 — 3x value vs Pro",
    baseUrl: "https://api.z.ai/api/anthropic",
    env: {
      ANTHROPIC_BASE_URL: "https://api.z.ai/api/anthropic",
      API_TIMEOUT_MS: "3000000",
      ANTHROPIC_DEFAULT_HAIKU_MODEL: "glm-4.5-air",
      ANTHROPIC_DEFAULT_SONNET_MODEL: "glm-4.7",
      ANTHROPIC_DEFAULT_OPUS_MODEL: "glm-4.7",
    },
    requiresKey: true,
    keyEnv: "ANTHROPIC_AUTH_TOKEN",
    keyHint: "Get key at: z.ai/manage-apikey/apikey-list",
  },
  kimi: {
    name: "Kimi K2 (Moonshot)",
    description: "Kimi K2.5 — vision support, fast inference",
    baseUrl: "https://api.moonshot.ai/anthropic",
    env: {
      ANTHROPIC_BASE_URL: "https://api.moonshot.ai/anthropic",
      API_TIMEOUT_MS: "600000",
      ANTHROPIC_DEFAULT_SONNET_MODEL: "kimi-k2.5",
      ANTHROPIC_DEFAULT_HAIKU_MODEL: "kimi-k2",
      ANTHROPIC_DEFAULT_OPUS_MODEL: "kimi-k2.5",
    },
    requiresKey: true,
    keyEnv: "ANTHROPIC_AUTH_TOKEN",
    keyHint: "Get key at: platform.moonshot.ai",
  },
  openrouter: {
    name: "OpenRouter",
    description: "320+ models via one API",
    baseUrl: "https://openrouter.ai/api",
    env: {
      ANTHROPIC_BASE_URL: "https://openrouter.ai/api",
      ANTHROPIC_API_KEY: "",
      API_TIMEOUT_MS: "600000",
    },
    requiresKey: true,
    keyEnv: "ANTHROPIC_AUTH_TOKEN",
    keyHint: "Get key at: openrouter.ai/keys",
  },
  deepseek: {
    name: "DeepSeek",
    description: "DeepSeek V3 — cheapest reasoning model",
    baseUrl: "https://api.deepseek.com",
    env: {
      ANTHROPIC_BASE_URL: "https://api.deepseek.com",
      API_TIMEOUT_MS: "600000",
      ANTHROPIC_DEFAULT_SONNET_MODEL: "deepseek-chat",
      ANTHROPIC_DEFAULT_HAIKU_MODEL: "deepseek-chat",
      ANTHROPIC_DEFAULT_OPUS_MODEL: "deepseek-reasoner",
    },
    requiresKey: true,
    keyEnv: "ANTHROPIC_AUTH_TOKEN",
    keyHint: "Get key at: platform.deepseek.com",
  },
  qwen: {
    name: "Qwen (Alibaba)",
    description: "Qwen3.5 — strong coding, 256K context",
    baseUrl: "https://dashscope-intl.aliyuncs.com/apps/anthropic",
    env: {
      ANTHROPIC_BASE_URL: "https://dashscope-intl.aliyuncs.com/apps/anthropic",
      API_TIMEOUT_MS: "600000",
      ANTHROPIC_DEFAULT_SONNET_MODEL: "qwen3.5-plus",
      ANTHROPIC_DEFAULT_HAIKU_MODEL: "qwen3.5-coder",
      ANTHROPIC_DEFAULT_OPUS_MODEL: "qwen3.5-plus",
    },
    requiresKey: true,
    keyEnv: "ANTHROPIC_AUTH_TOKEN",
    keyHint: "Get key at: dashscope.aliyuncs.com",
  },
  ollama: {
    name: "Ollama (Local)",
    description: "Local models — private, free, offline",
    baseUrl: "http://localhost:11434/api",
    env: {
      ANTHROPIC_BASE_URL: "http://localhost:11434/api",
      API_TIMEOUT_MS: "600000",
      ANTHROPIC_DEFAULT_SONNET_MODEL: "qwen2.5-coder:latest",
      ANTHROPIC_DEFAULT_HAIKU_MODEL: "qwen2.5-coder:latest",
      ANTHROPIC_DEFAULT_OPUS_MODEL: "qwen2.5-coder:latest",
    },
    requiresKey: false,
    keyHint: "Install Ollama at: ollama.ai",
  },
};

export const PRESET_NAMES = Object.keys(PRESETS);
