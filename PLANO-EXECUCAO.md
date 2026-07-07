# PLANO DE EXECUÇÃO — Site Luh Panda (retomar 07/07)
*Escrito em 06/07/2026, ~22h40. Para ser executado por Claude (Sonnet 5) amanhã.*
*Leia junto com a skill `site-luhpanda` (~/.claude/skills/site-luhpanda/SKILL.md) — ela tem o contexto permanente. Este arquivo é o checklist do que falta.*

## Estado ao encerrar hoje (o que JÁ está feito — não refazer)

- **Site no ar:** https://lucianapandolfo9-spec.github.io/luhpanda-site/ (GitHub Pages reativado hoje; estava 404 porque o Pages estava desabilitado e havia commit local sem push).
- **Repo local:** `/Users/luhpanda/Downloads/Luh Panda/luhpanda-site` (remote: `lucianapandolfo9-spec/luhpanda-site`, branch `main`).
- **Alterações locais JÁ FEITAS e AINDA NÃO COMMITADAS** (`git status` mostra `M index.html`, `M ESTRATEGIA.md`, `?? assets/cases/`, `?? assets/raw/`):
  - `index.html`: Diagnóstico Estratégico mudou de R$ 297 → **R$ 500** (bloco `.diagnostico`, link do WhatsApp e `<meta name="description">`); Treinamento de IA mudou de "R$ 150/hora" → **"Projeto sob medida"**.
  - `ESTRATEGIA.md`: escada de oferta atualizada (só o Diagnóstico tem preço público).
- **Assets já capturados** em `assets/cases/`:
  - `capitalize-clean.png` (1400×900, dashboard real do CAPITALIZE Audit Intelligence, watermark do Lovable removida) — **usar este**.
  - `arroba-clean.png` (1400×900, tela de login do ARROBA CERTA, watermark removida) — é só a tela de login; ver Etapa 3 para capturar tela melhor.
  - Arquivos `*-raw.png` são material bruto — não usar no site, podem ser apagados no final.
- **Vídeo demo da Lead Performance:** `assets/raw/lead-performance-demo.mov` (84 MB, 2940×1912, 71s, QuickTime). A Luh salvou hoje. **NUNCA commitar esse .mov** (pesado demais pro Pages) — comprimir antes (Etapa 4).
- **Ícones da seção Dor:** um agente ficou gerando 4 ícones via Higgsfield para `assets/icons/` (dor-espera.png, dor-repetitivo.png, dor-numeros.png, dor-chatbot.png). **ANTES de gerar, verifique se `assets/icons/` já existe com os 4 arquivos e se o index.html já referencia `.emoji-img`** — se sim, a Etapa 2 já está parcialmente feita, só validar visualmente.

## Decisões de negócio já tomadas (não re-discutir)

1. **Único preço no site: Diagnóstico Estratégico R$ 500.** Todo o resto é "Projeto sob medida". Não colocar R$/hora em nada.
2. Os emojis das seções **Dor** e **Serviços** serão substituídos por **imagens geradas por IA** coerentes com a identidade visual (fundo escuro roxo, acentos laranja) — nada de emoji.
3. A seção **Cases** ganha **imagens/vídeos reais dos projetos**: Capitalize (auditor de folha), ARROBA CERTA, e o sistema interno da Lead Performance (hub que centraliza D4Sign, Asana, CapCut etc. num lugar só — vídeo demo já salvo).
4. Case novo a considerar na copy: o sistema da Lead Performance ainda NÃO tem card próprio na seção Cases — criar (ver Etapa 5).

## Checklist de amanhã, em ordem

### Etapa 0 — Sanidade (5 min)
```bash
cd "/Users/luhpanda/Downloads/Luh Panda/luhpanda-site"
git status && git log --oneline -3
ls assets/icons/ 2>/dev/null   # ícones já gerados?
curl -s -o /dev/null -w "%{http_code}" https://lucianapandolfo9-spec.github.io/luhpanda-site/  # deve dar 200
```
Adicionar `assets/raw/` ao `.gitignore` (criar o arquivo se não existir) ANTES de qualquer commit.

### Etapa 1 — Ícones da seção Dor (se ainda não existirem)
Gerar 4 imagens 1:1 via MCP Higgsfield (`mcp__higgsfield__generate_image`; carregar via ToolSearch com `select:mcp__higgsfield__generate_image,mcp__higgsfield__job_status`). Modelo sugerido: `nano_banana_pro` (bom pra ícone/ilustração limpa sem texto). Estilo em todos os prompts: *"flat modern tech icon illustration, dark purple background #1E1028, purple #8B4BA3 and orange #FF6B35 accents, minimalist, no text, SaaS website style"*.

| Arquivo | Conceito |
|---|---|
| `assets/icons/dor-espera.png` | celular com mensagens não respondidas + relógio, cliente indo embora |
| `assets/icons/dor-repetitivo.png` | setas em loop infinito / pessoa copiando dado entre sistemas |
| `assets/icons/dor-numeros.png` | vários painéis fragmentados e confusos, sem visão única |
| `assets/icons/dor-chatbot.png` | robô "burro" com menu numerado 1-2-3 e usuário frustrado |

Baixar cada resultado (`job_status` retorna URL → `curl -o`). Depois, no `index.html`:
- Substituir cada `<div class="emoji">X</div>` dos 4 `.dor-card` (linhas ~237-249) por `<img class="emoji-img" src="assets/icons/NOME.png" alt="...">`.
- Adicionar no `<style>`: `.emoji-img{width:56px;height:56px;margin-bottom:12px;border-radius:14px;object-fit:cover}`.
- Otimizar peso: `magick in.png -resize 224x224 out.png` (o site só mostra 56px; 4× pra retina basta).

### Etapa 2 — Ícones da seção Serviços
Mesmo processo, 4 imagens, mesmo estilo:

| Arquivo | Card | Conceito |
|---|---|---|
| `assets/icons/serv-atendente.png` | Atendente de IA no WhatsApp | balão de chat com raio/IA respondendo na hora |
| `assets/icons/serv-automacao.png` | Automação de processos | engrenagens conectadas com fluxo de dados |
| `assets/icons/serv-agentes.png` | Agentes de IA com seus dados | cérebro/chip conectado a banco de dados e documentos |
| `assets/icons/serv-treinamento.png` | Treinamento de IA | pessoas + IA, capacitação de equipe |

Substituir os `<div class="emoji">` dos 4 `.servico` (linhas ~265-283) da mesma forma.

### Etapa 3 — Screenshot melhor do ARROBA CERTA (logado)
O print atual é só o login. Pra pegar o dashboard real:
1. Usar Chrome MCP (skill `claude-in-chrome`; a Luh já tem sessão logada no navegador dela) → navegar em `https://lucianapandolfo9-spec.github.io/arroba-certa/`, logar se preciso (pedir pra Luh logar — NÃO digitar senha), screenshot do dashboard com lotes/margens visíveis.
2. Alternativa: pedir pra Luh tirar o print ela mesma e salvar em `assets/cases/arroba-dashboard.png`.
Recortar/limpar com `magick` se necessário. Se nada disso rolar, usar `arroba-clean.png` (login) mesmo — é melhor que nada.

### Etapa 4 — Vídeo Lead Performance (comprimir) + vídeo/imagem Capitalize
```bash
cd "/Users/luhpanda/Downloads/Luh Panda/luhpanda-site"
# 71s, 2940x1912 → web: 1280 de largura, sem áudio, h264
ffmpeg -i assets/raw/lead-performance-demo.mov -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart assets/cases/lead-performance-demo.mp4
ls -la assets/cases/lead-performance-demo.mp4  # alvo: < 8 MB; se passar disso, subir crf pra 30-32
```
Poster (thumbnail): `ffmpeg -i assets/cases/lead-performance-demo.mp4 -ss 00:00:03 -frames:v 1 assets/cases/lead-performance-poster.jpg`
Para o Capitalize, a imagem `capitalize-clean.png` já serve. Se a Luh quiser vídeo de funcionamento, gravar com o Chrome MCP (gif_creator) navegando no app `https://capitalize-auditoria.lovable.app` — opcional, só se sobrar tempo.

### Etapa 5 — Atualizar seção Cases no index.html
1. CSS novo no `<style>`:
```css
.case-media{border-radius:12px;overflow:hidden;border:1px solid var(--card-borda);margin-bottom:4px}
.case-media img,.case-media video{width:100%;display:block}
```
2. No card **Capitalize (Analista de DP)**: inserir `<div class="case-media"><img src="assets/cases/capitalize-clean.png" alt="Dashboard do CAPITALIZE Audit Intelligence" loading="lazy"></div>` logo após o `<h3>`.
3. No card **ARROBA CERTA**: mesmo padrão com a imagem da Etapa 3.
4. **Criar card novo — Lead Performance** (após o card da agência de marketing), com vídeo:
```html
<div class="case">
  <span class="cliente">Lead Performance</span>
  <h3>Hub interno que centraliza a operação inteira da empresa</h3>
  <div class="case-media"><video src="assets/cases/lead-performance-demo.mp4" poster="assets/cases/lead-performance-poster.jpg" muted loop playsinline autoplay preload="metadata"></video></div>
  <dl>
    <dt>Problema</dt>
    <dd>Equipe espalhada em vários sistemas — D4Sign, Asana, CapCut, planilhas — sem um lugar único da operação.</dd>
    <dt>Solução</dt>
    <dd>Sistema interno que conecta todas as ferramentas num só painel: briefing por setor, campanhas, contratos e tarefas integrados.</dd>
    <dt>Resultado</dt>
    <dd>A equipe inteira opera num lugar só, com dado de todos os sistemas conversando entre si.</dd>
  </dl>
</div>
```
(Ajustar a copy com a Luh se ela estiver presente; o texto acima é o rascunho aprovável.)
5. Apagar os `*-raw.png` de `assets/cases/` antes do commit (deixar só os `-clean`, o mp4, o poster e o que a Etapa 3 gerar).

### Etapa 6 — Publicar e verificar
```bash
cd "/Users/luhpanda/Downloads/Luh Panda/luhpanda-site"
git add -A && git status   # conferir: NADA de assets/raw/ no stage
git commit -m "Ícones gerados por IA nas seções Dor/Serviços; imagens e vídeo reais nos cases; Diagnóstico a R$500"
git push origin main
# aguardar build do Pages (~1-2 min) e conferir:
curl -s -o /dev/null -w "%{http_code}\n" https://lucianapandolfo9-spec.github.io/luhpanda-site/
```
Abrir o site e validar visualmente: ícones carregando, vídeo tocando mudo em loop, preço R$ 500, nenhum "R$ 150/hora" sobrando (`grep -n "150/hora\|297" index.html` deve retornar vazio).

## Backlog (não é pra amanhã, só não perder)
- Domínio próprio (luhpanda.com.br no Registro.br) apontando pro Pages.
- Link na bio do Instagram/WhatsApp Business.
- Depoimentos de clientes (áudio de WhatsApp vale) → seção de prova social.
- Preencher "Resultado Mensurável" dos cases no Notion (1 número por case).
- Regenerar o deck PDF do portfólio com os cases novos.
