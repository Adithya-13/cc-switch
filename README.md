# cc-switch

> Switch Claude Code between providers instantly. No manual config editing.

```bash
cc-switch use zai        # → z.ai (GLM-4.7)
cc-switch use pro        # → Claude Pro/Max
cc-switch use kimi       # → Kimi K2
cc-switch use openrouter # → OpenRouter (320+ models)
```

## Install

```bash
npm install -g @adithya-13/cc-switch
```

Or via curl:

```bash
curl -fsSL https://raw.githubusercontent.com/adithya-13/cc-switch/main/install.sh | bash
```

## Why

Claude Code's usage limits hit mid-session. Switching providers manually means editing `~/.claude/settings.json`, managing API keys, and restarting. `cc-switch` makes it one command.

## Supported Providers

| Provider | Command | Models |
|---|---|---|
| Claude Pro/Max | `cc-switch use pro` | Claude Sonnet/Opus (OAuth) |
| z.ai | `cc-switch use zai` | GLM-4.7, GLM-5 |
| Kimi (Moonshot) | `cc-switch use kimi` | Kimi K2.5 |
| OpenRouter | `cc-switch use openrouter` | 320+ models |
| DeepSeek | `cc-switch use deepseek` | DeepSeek V3, R1 |
| Qwen (Alibaba) | `cc-switch use qwen` | Qwen3.5 |
| Ollama (local) | `cc-switch use ollama` | Any local model |
| Custom | `cc-switch add myprofile` | Anything |

## Commands

```bash
cc-switch use <provider>   # switch to provider
cc-switch list             # list all providers + key status
cc-switch status           # show current active provider
cc-switch add <name>       # add a custom provider
cc-switch doctor           # check setup and saved keys
```

## Rate Limit Detection (cclaude)

Instead of `claude`, use `cclaude` — it wraps Claude Code and notifies you when a rate limit is hit, with quick-switch suggestions:

```bash
cclaude   # same as claude, but with rate limit detection
```

When a limit is hit:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⚠  Claude usage limit reached

  Available fallbacks:

  → z.ai (GLM)             cc-switch use zai
  → Kimi K2                cc-switch use kimi

  Quick switch: cc-switch use zai
  Then restart: cclaude
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Key Storage

API keys are saved in `~/.cc-switch/keys.json` (chmod 600). Never hardcoded or exposed.

## Add Custom Provider

```bash
cc-switch add myprovider
# interactive wizard → asks for base URL, API key, model names
```

## License

MIT
