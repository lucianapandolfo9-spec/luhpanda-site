# Repos de referência — removidos do disco em 06/ago/2026

A pasta `Downloads/Luh Panda/Referencias-Site/` (853 MB) foi apagada pra liberar espaço.
Nenhum deles tinha alteração própria — são clones públicos. Pra trazer de volta, só clonar de novo.

```bash
mkdir -p "/Users/luhpanda/Downloads/Luh Panda/Referencias-Site"
cd "/Users/luhpanda/Downloads/Luh Panda/Referencias-Site"

# Validados pra uso no projeto do site
git clone --depth 1 https://github.com/vercel-labs/web-interface-guidelines.git
git clone --depth 1 https://github.com/motiondivision/motion.git
git clone --depth 1 https://github.com/diegorafs/Chrome-DevTools-MCP.git
git clone --depth 1 https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit.git

# Só fazem sentido se migrar pra stack de componentes (React/shadcn)
git clone --depth 1 https://github.com/21st-dev/magic-mcp.git
git clone --depth 1 https://github.com/Jpisnice/shadcn-ui-mcp-server.git

# Inspiração visual / decisão adiada
git clone --depth 1 https://github.com/elementor/elementor.git
git clone --depth 1 https://github.com/openai/codex-plugin-cc.git
```

**Não re-clonar:** `OmniRoute` (https://github.com/diegosouzapw/OmniRoute.git) — vetado pela Luh em 30/jul por rotear chamadas de IA com dado sensível por servidor terceiro.

> Dica: usar `--depth 1` como acima evita baixar o histórico inteiro. Só o repo `motion` tinha 254 MB de histórico git — com `--depth 1` cai pra uma fração disso.
