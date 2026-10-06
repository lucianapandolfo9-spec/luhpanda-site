# PROJETO — Luh Panda (site + portfólio + marca pessoal)

> Documento mestre. Tudo que está sendo montado do projeto pessoal da Luh está indexado aqui.
> Ao retomar qualquer frente: ler este arquivo primeiro, depois a skill correspondente.

---

## 1. O que é o projeto

Presença comercial da **Luciana Pandolfo (Luh Panda)** como especialista em **Automação & IA para negócios**:
site one-page + deck de portfólio em PDF + (futuro) domínio próprio.

**Posicionamento (v2 — vigente):** *"IA trabalhando de verdade dentro do seu negócio."*
Ordem de prioridade do que ela vende:
1. **Treinamento de IA para equipes**
2. **Agentes de IA com os dados do negócio**
3. **Plataformas e sistemas sob medida** (hubs internos, SaaS)
4. **Automação de processos e atendimento** (robôs de WhatsApp entram AQUI, no fim da fila — não são mais o carro-chefe)

Essa ordem vale pra tudo: seções do site, cards de serviço, sequência de cases, slides do deck.

## 2. As peças

| Peça | Onde | Estado |
|---|---|---|
| **Site — 3 páginas** | `index.html` (central) · `sistemas.html` · `turmas.html` | 🎯 **v4 construído em 07/ago, ainda NÃO publicado** (local, sem commit/push) — ver seção 6-C. Substitui a v3 one-page. |
| **Domínio próprio** | `luhpanda.com.br` (HostGator) | ✅ ativo, apontado pro GitHub Pages via CNAME. HTTPS pendente (certificado automático do GitHub, demorando mais que o normal — checar `gh api repos/lucianapandolfo9-spec/luhpanda-site/pages -F https_enforced=true`) |
| **Deck PDF do portfólio** | `portfolio/deck.html` → `portfolio/Luh-Panda-Portfolio.pdf` (14 slides, ~1,7MB) | ✅ v2 pronto; regenerar quando site mudar |
| **Currículo** | `Curriculo Luh Panda/LUCIANA PANDOLFO.docx` (+ `.pdf`) | ✅ atualizado em 02/ago com Aprovi.ai, ROAS 6,03x e números da auditoria de folha (Capitalize); corrigido dado da Pandoka (era Recife/575%, certo é Beach Club em Pipa-RN/60%); falta reexportar o PDF final (abrir no Word/Docs — conversão local perde a foto do cabeçalho) |
| **LinkedIn** | `linkedin.com/in/luciana-pandolfo-661308403` | ✅ headline, cargo (Lead Performance), setor, banner e capa novos já no ar; ✅ seção "Em destaque" com posts + link do site já ativa; ✅ 02/ago: removidas as 2 entradas de Lume Social Produções da Experiência (empresa nova/pequena, não valia manter como vínculo aparente); ⚠️ gargalo real de geração de leads é rede pequena (58 conexões/60 seguidores) — só 2 visualizações de perfil e 1 aparição em busca na última semana; ⏳ calendário de conteúdo (Notion) ainda não montado |
| **Fonte da verdade dos cases** | Notion "🧠 Luh Panda — Portfólio & Projetos" | ⚠️ campos "Resultado Mensurável" incompletos |
| **Site v4 — pivô de vendas** | `BLUEPRINT-V4-VENDAS.md` neste repo | ✅ desenhado em 06/ago, **construído em 07/ago** (ver seção 6-C). Ler antes de mexer no site. |
| **Tabela de preços vigente** | `TABELA-PRECOS-2026.md` neste repo | ✅ aprovada em 07/ago — 3 faixas de sistemas (R$5k/15k/25k+), in-company M1/M2, particular M1/M2. Fonte da verdade de preço. |
| **Estratégia comercial (funil, preço, conteúdo, tráfego)** | `ESTRATEGIA-VENDAS-2026.md` neste repo | 🎯 **desenhada em 06/ago** — decide que o tráfego pago vai TODO pro Módulo 1 (não pra sistemas), fecha parcelamento em 12x, separa conteúdo orgânico de criativo de anúncio. Substitui a §3 (escada de oferta) do `ESTRATEGIA.md` antigo. |

## 3. Repositório

```
luhpanda-site/
├── index.html            # one-page (CSS inline no head, JS de reveal no fim)
├── consultoria.html      # legada → redirect pra index
├── produtos.html         # legada → redirect pra index
├── PROJETO.md            # ESTE arquivo (doc mestre)
├── PLANO-EXECUCAO.md     # checklist histórico das sessões de construção
├── ESTRATEGIA.md         # escada de oferta, cases publicáveis, backlog estratégico
├── portfolio/
│   ├── deck.html                     # slides 1280×720 (fonte do PDF)
│   ├── Luh-Panda-Portfolio.pdf      # deck final pra WhatsApp
│   ├── luh-foto.jpg                 # foto profissional (origem: Imagens Luh/IMG_1234.jpeg)
│   └── lead-performance-deck.png    # frame limpo do hub (recortado do vídeo)
└── assets/
    ├── hero.mp4          # vídeo vertical do Sobre
    ├── favicon.svg · og-cover.jpg
    ├── icons/            # SVGs próprios 224×224 (dor-*, serv-*) — serv-plataformas.svg é o mais novo
    ├── cases/            # mídias dos cases (mp4 <8MB + posters) — 4 vídeos novos da v3 já aqui, ver seção 6-A
    └── raw/              # material bruto — NO .gitignore, NUNCA commitar
        ├── v3-videos/    # 5 gravações brutas que a Luh mandou em 30/jul (ver seção 6-A)
        └── v3-photos/    # (vazia — foto do treinamento sumiu do Downloads, pendente reenvio)
```

**Repos de referência (fora do repo do site):** `/Users/luhpanda/Downloads/Luh Panda/Referencias-Site/` — 9 repos clonados em 30/jul pra upgrade visual. Validados pra usar: `web-interface-guidelines` (checklist Vercel), `motion` (lib de animação, funciona em JS vanilla), `Chrome-DevTools-MCP` (inspeção/debug ao vivo), `Claude-Code-Frontend-Design-Toolkit` (mapa de referência, não é código). Mantidos só pra validação final (não integrar sem discutir): `shadcn-ui-mcp-server`, `magic-mcp` (só fazem sentido migrando pra stack com componentes), `elementor` (inspiração visual, não roda no stack), `codex-plugin-cc` (Codex dentro do Claude Code — decisão adiada pra quando tiver código de verdade pra revisar; conta ChatGPT é da empresa, não pessoal, checar se cabe uso em projeto pessoal). **Descartado: `OmniRoute`** — gateway que roteia chamadas de IA por servidor terceiro; a Luh vetou por causa dos dados sensíveis que passam por aqui, não instalar.

**Deploy:** push na `main` → GitHub Pages (~1-2 min). Verificar com `curl | grep` em string nova.

## 4. Identidade visual

Tokens (em `:root` do index.html e do deck.html):
`--fundo #12081A · --card #1E1028 · --card-borda #3A2249 · --roxo #6F2E8F · --roxo-claro #8B4BA3 · --roxo-escuro #4A1B5C · --laranja #FF6B35 (acento) · --verde-zap #25D366 (só WhatsApp) · --texto #F2EAF7 · --texto-suave #C4B2D1`
Fonte: **Inter** (Google Fonts). Easing global: `cubic-bezier(0.16,1,0.3,1)`.
Ícones: **(padrão vigente desde 03/ago)** SVG inline linha-fina (stroke, não preenchido), dentro de badge circular 56px com gradiente radial roxo/laranja, cada um com micro-animação CSS contínua ligada ao significado (setas girando, ponteiro de relógio, ponto de dado viajando entre painéis, engrenagens etc.) + glow no hover do card. Referência de mercado: n8n (nó circular + partícula de dado viajando pela conexão), Linear/Attio (ícone-linha minimalista, motion sutil). Substituiu o padrão antigo (ícone flat "sticker" gerado por IA via Higgsfield, 224×224, `assets/icons/*.svg`) — achado "brega"/emoji-like pela Luh. Arquivos antigos ficam no repo sem uso; não regenerar ícone novo via Higgsfield, o padrão agora é escrever o SVG + CSS direto no `index.html` (ver bloco "Ícones-linha animados" no `<head>`).
Motion: scroll reveal + stagger, blobs no hero, hover lift, gradiente animado no card do Diagnóstico — pack completo na skill `site-alto-padrao`.

## 5. Regras invioláveis

1. ~~Único preço público: Diagnóstico Estratégico R$500, resto "Projeto sob medida", nunca valor/hora~~ — **SUPERADA em 06/ago pelo pivô de vendas** (`BLUEPRINT-V4-VENDAS.md`): agora o site mostra âncora de preço em tudo — Diagnóstico R$500, Sistema "a partir de R$4.000" + manutenção R$500/mês, e na `/formacao` preço fechado por módulo (M1 R$1.600, M2 R$3.600/R$14.400 in-company, aula avulsa R$200–300/h). Motivo: tráfego pago precisa filtrar por preço, não só por conversa.
2. **Todo CTA → WhatsApp** (`wa.me/5584994127476`), **exceto** os CTAs de Módulo 1/2 na `/formacao`, que pagam direto via Mercado Pago (ver blueprint, Parte 3-B) com fallback pro WhatsApp. Sem formulário na home; a `/formacao` pode ter captura de e-mail pra lista de espera do Módulo 2 (exceção aprovada no blueprint).
3. Copy pra dono de negócio; resultado primeiro, tecnologia como prova.
4. **Cases: NUNCA nome de empresa cliente (mudou em 30/jul)** — etiqueta cada case pela frente de serviço (Treinamento de equipes / Agente de IA / Plataforma sob medida / Automação de processos), nunca pelo nome do cliente. Só **produto próprio** pode ser nomeado (ARROBA CERTA, Aprovi.ai).
5. **Zero emoji** como ícone (site e deck) — SVG próprio, linha-fina, animado (não flat "sticker"; padrão vigente desde 03/ago, ver seção 4).
6. **Hover só em elemento clicável de verdade** (link/botão/CTA). Card informativo sem destino fica estático — nada de elevação/borda acesa sugerindo clique que não existe (regra adicionada 03/ago).
7. Privacidade em vídeo de case: preferir mascarar só o dado específico (nome de arquivo, nome de empresa, logo) e não a tela inteira — mas se o dado sensível estiver espalhado/rolando pela tela (não dá pra garantir cobertura 100%), não usar o vídeo até ter uma regravação limpa. Nunca subir vídeo com nome/CPF/salário de terceiro visível.

## 6. Ordem vigente dos cases (site e deck) — v2, ainda no ar

1. Capitalize — Treinamento corporativo de IA (sem mídia)
2. Capitalize — Analista de DP com IA (vídeo, nomeado "Capitalize Contabilidade")
3. Lead Performance — Hub interno (vídeo, nomeado; no deck usa frame limpo `lead-performance-deck.png`)
4. ARROBA CERTA — SaaS próprio (vídeo)
5. Agência de marketing — Relatório diário Meta Ads (print, **ROAS 6,03x**)
6. Escritório de advocacia — Atendente de IA (vídeo)
7. Empresa de contabilidade — Robô de atendimento (vídeo)

## 6-A. Site v3 — blueprint aprovado em 30/jul, ✅ implementado em 03/ago

**Objetivo:** deixar o site "cara de mega profissional". Sacada: cada case passa a ser etiquetado pela frente de serviço, não pelo nome do cliente — some o nome e ainda reforça o posicionamento.

**Nível 1 — Sistemas construídos** (seções largas, alternadas esquerda/direita, vídeo grande ~60%, scroll-linked motion com a lib `motion`, espaço reservado pra número grande de resultado — **ainda sem dado**, a Luh não tem número pronto):

| # | Case | Etiqueta | Vídeo pronto | Nome de cliente? |
|---|---|---|---|---|
| 1 | Hub interno (BI + financeiro + CRM num só lugar) | Plataforma sob medida | `assets/cases/hub-interno-demo.mp4` ✅ | NÃO (era Lead Performance — logo mascarada) |
| 2 | Auditor de folha com IA | Agente de IA | `assets/cases/auditor-folha-demo.mp4` ✅ | NÃO (era Capitalize — nome mascarado) |
| 3 | ARROBA CERTA | Produto próprio | `assets/cases/arroba-demo-v3.mp4` ✅ | SIM, produto próprio |
| 4 | **Aprovi.ai** (novo — era "Posta Aí", renomeado por colisão de nome, ver seção 9) | Produto próprio | `assets/cases/aprovi-demo.mp4` ✅ | SIM, produto próprio (mostra "Lymphatic by Gigi" dentro — autorizado) |

**Nível 2 — Outras entregas** (grid compacto, como já é hoje):

| # | Case | Etiqueta | Mídia |
|---|---|---|---|
| 5 | Treinamento corporativo de IA | Treinamento de equipes | ⚠️ foto da turma com certificados — **sumiu do Downloads, pedir a Luh reenviar** (rostos aprovados por eles, pode mostrar) |
| 6 | Relatório diário Meta Ads no WhatsApp | Automação de processos | já existe: `assets/cases/metaads-report.png`, ROAS 6,03x |
| 7 | Atendimento de IA (copy **genérica, sem segmento** — "posso montar pra qualquer um") | Agente de IA | já existe: `assets/cases/adv-robo.mp4` |

**Removido do site:** o case "Robô de atendimento" de contabilidade (Toninho) — a Luh pediu pra tirar (`assets/cases/toninho-robo.mp4` fica no repo mas sai do HTML).

**✅ Implementado em 03/ago:** HTML/CSS escrito no `index.html` — 4 cases largos alternados esquerda/direita (`.cases-largo` / `.case-largo`) + 3 cases compactos em grid (reaproveitando `.cases-grid` já existente). Etiqueta de frente de serviço renomeada de `.cliente` pra `.etiqueta` (classe + CSS). Motion: reaproveitado o sistema `reveal`/`stagger` (`IntersectionObserver`, respeita `prefers-reduced-motion`) já existente no site — decidido não importar a lib `motion` só pra essa seção, pra não quebrar consistência com o resto da página. Número grande de resultado por case **não implementado** (segue sem dado, ver pendência na seção 7). Verificado via screenshot headless antes do deploy.

Copy de referência já validada em conversa (pode reaproveitar quase pronta):
- **Hub interno:** Problema — equipe espalhada em vários sistemas (D4Sign, Asana, CapCut, planilhas) sem um lugar único. Solução — painel único: briefing por setor, campanhas, contratos e tarefas integrados. Resultado — operação inteira num lugar só.
- **Auditor de folha:** Problema — folha de pagamento ia pro cliente com risco de erro humano. Solução — agente de IA audita antes do envio (valores, verbas, inconsistências). Resultado — camada extra de revisão automática.
- **ARROBA CERTA:** Problema — pequeno/médio pecuarista não sabe custo da arroba nem margem real. Solução — app completo (lotes, custo por @, margem, simulações), construído e publicado do zero. Resultado — produto no ar, auth + banco + cálculos validados.
- **Aprovi.ai:** Problema — aprovação de conteúdo vivia no WhatsApp (print perdido, "manda de novo"). Solução — portal com link único, sem login: cliente vê, ajusta legenda, aprova ou pede alteração. Resultado — rodando em produção com cliente real, histórico de cada aprovação registrado.
- **Atendimento de IA (genérico):** Problema — cliente perguntava toda semana a mesma coisa, equipe parava tudo pra responder. Solução — atendente de IA no WhatsApp conectado ao sistema, responde com dado real, agenda e escala pra humano quando precisa. Resultado — atendimento imediato 24h, equipe liberada do repetitivo.

## 6-B. Vídeo de apresentação (Sobre + criativo de tráfego pago) — 31/jul

Gravado pela Luh em 5 pedaços (`Downloads/Criativos/Videos para editar/Site/IMG_145*.MOV`, 4K vertical). Montado com a fala **contínua** e os sistemas entrando **por cima** da voz (a v1 tinha 2,5s de silêncio nos cortes de tela — leitura de amador, refeito).

**Estrutura aprovada (48,8s):** rosto abre → auditor de folha em "construo e coloco pra funcionar" → rosto → hub interno em "automatizo operação de agência" → rosto → **os 4 sistemas empilhados** em "tenho sistemas meus... no ar" → rosto → ARROBA CERTA + Aprovi.ai em "coloco ela pra construir pra mim" → rosto fecha no CTA.

| Arquivo | Onde | O quê |
|---|---|---|
| `apresentacao-luh-MASTER.mp4` | `Downloads/Criativos/Videos para editar/Site/` | master 720×1280, sem música/legenda — **fonte pra qualquer reedição futura** |
| `PARA VENDER.mp4` | `.../Site/PARA VENDER/` | versão final da Luh: música + legenda corrigida (sem quebra de palavra, dourado sobre fundo escuro), 1080×1920, **sem correção de cor** |
| `PARA VENDER - COR AJUSTADA.mp4` | `.../Site/PARA VENDER/` | ✅ **VERSÃO APROVADA (31/jul)** — mesma acima + correção de cor (só nos trechos do rosto; telas de sistema intocadas): brancos de 198→245, saturação 11→~20, esverdeado de parede neutralizado. 48,9s, ~60MB |
| `hero-v5-final.mp4` | `assets/` deste repo | versão web comprimida (576×1024) da aprovada — **é essa que vai entrar no `index.html`** |

**Decisões técnicas registradas:**
- Trecho "e é isso que eu vou te ensinar" (fim do IMG_1466) **cortado de propósito** — soa pra aluno de curso, não pro dono de negócio que o site quer atrair.
- O `aprovi-demo.mp4` mostra o **link secreto de aprovação da cliente** (URL com token, dá acesso ao painel sem senha). No vídeo de apresentação foi coberto com barra da cor do fundo. **O arquivo original em `assets/cases/aprovi-demo.mp4` continua com o link exposto — mascarar antes de usar no case do site (Cases v3, seção 6-A).**
- Hub interno tem um "Carregando..." por volta de 9s do clipe — usar as janelas 4–8,8s ou 10–13s.
- Correção de cor aplicada só nos 5 trechos de rosto (`enable` com timestamps exatos das fronteiras, confirmadas por `signalstats`) — os cortes de tela dos sistemas não foram tocados.

**Uso duplo aprovado:** este vídeo vale tanto pro Sobre do site quanto como **criativo principal do primeiro anúncio de tráfego pago** (ver seção 7).

**✅ Feito em 03/ago:** trocado no `index.html` (seção Sobre, `assets/hero.mp4` → `assets/hero-v5-final.mp4`); `hero-v4-preview.mp4` (rascunho intermediário) removido do disco.

## 6-C. Site v4 — construído em 07/ago (3 páginas, NÃO publicado ainda)

**Contexto:** pivô de vendas completo (`BLUEPRINT-V4-VENDAS.md` + `ESTRATEGIA-VENDAS-2026.md` + `TABELA-PRECOS-2026.md`, todos de 06–07/ago). Direção visual nova aprovada pela Luh via maquete em Artifact (inspirada no linear.app: tipografia grande, sem badge de ícone, aurora de fundo em vez de motion miniatura, cartão com fio de gradiente no topo).

**Arquitetura:** 3 páginas HTML/CSS/JS puro (mesma stack de sempre — decidido explicitamente NÃO migrar pra React/Tailwind agora, ver decisão abaixo):
- `index.html` — central: Hero, Dor, **Duas Frentes** (sistemas × turmas, peso igual — decisão da Luh: ama as duas), Depoimentos, Sobre (vídeo + credenciais, herdado da v3), CTA final.
- `sistemas.html` — Hero, **3 faixas de preço** (Automação R$5k / Agente de IA R$15k / Plataforma a partir de R$25k, cada uma com manutenção proporcional), Método em 4 passos, os 4 cases largos com vídeo real (hub interno, auditor de folha, ARROBA CERTA, Aprovi.ai) + 2 cases compactos (relatório Meta Ads, atendente IA), fecho.
- `turmas.html` — Hero, Dor específica de time, foto da turma como prova, **in-company** (M1 R$9.600/R$1.200 por pessoa · M2 R$14.400/R$1.800 por pessoa, ambos com comparação honesta vs. individual), **particular 1:1** (M1 12x R$133 · M2 12x R$300), Depoimentos, FAQ, fecho.

**Decisões de escopo tomadas nesta sessão (todas já propagadas no HTML):**
- **Diagnóstico Estratégico R$500 saiu do site** — vira ferramenta de conversa, não produto de vitrine (a Luh: "a primeira conversa não se paga nada"). CTAs viraram "primeira conversa sem custo".
- **Aula avulsa saiu da `/turmas`** — produto de pós-venda (só pra quem já é aluno), não pertence à vitrine.
- **Headline das Duas Frentes:** "Eu construo o sistema e ensino seu time a trabalhar com IA do jeito certo" (não é "ou" — a Luh faz e vende as duas).
- **Preço de sistema saiu de R$4.000 fixo pra 3 faixas** (R$5k / R$15k / R$25k+) — ver `TABELA-PRECOS-2026.md` pro racional completo (a Luh cobrava R$83–150/hora construindo contra R$1.200/hora dando aula; as faixas existem pra sistema se pagar sem depender de vender abaixo do valor real).
- **In-company do Módulo 1 ganhou preço de turma** (R$9.600, antes só existia preço individual R$1.600 — o mesmo erro que gerou a subprecificação da turma da Capitalize).

**Decisão técnica registrada — NÃO migrar pra React/Tailwind:** a Luh pediu referência (linear.app) achando que precisava do framework pra ter aquele visual. Esclarecido: a diferença visual é CSS/tipografia, não stack — site de 3 páginas sem tela repetida não tem o problema que React resolve. Reproduzido o padrão visual em CSS puro. Migração fica como possível v5, sem pressa, não antes do prazo de vendas.

**Agenda / Google Calendar:** a Luh pediu que o agendamento "não choque com nada" — conta dela tem **8 calendários** (Luh Panda, Gestão PDK, Pandoka, Alma Pipa, Preserve Pipa, Calígula, Lume Social, Feriados), confirmado via `list_calendars`. Solução correta é o **Agendamento nativo do Google Calendar** embutido por iframe (site estático não pode chamar a API do Google direto sem expor credencial). **Ainda não criado** — é ação manual da Luh no painel do Calendar, marcando os 8 calendários em "verificar conflitos". Conta pessoal permite só 1 página de agendamento (suficiente, já que aula avulsa saiu do site). Enquanto isso não existe, os CTAs de particular (`Garantir minha vaga`) vão pro WhatsApp — MVP honesto, sem fingir automação que não existe.

**Verificação antes de considerar pronto:**
- Balanço de tags (section/div/article/ul) conferido nas 3 páginas — ok.
- Todos os 15 assets referenciados (vídeos, posters, imagens) existem no repo — conferido caminho por caminho.
- Screenshot headless 1440px das 3 páginas — hero, preços, cases com vídeo real e planos in-company revisados visualmente, batem com a maquete aprovada.
- Teste mobile: primeira rodada em `--window-size=390` deu falso positivo de texto cortado — era a **armadilha dos 500px mínimos do headless** (Chrome clampa a viewport interna pra 500px mesmo pedindo menos), não bug do site. Confirmado via script injetado (`scrollWidth === innerWidth` em 500px, sem overflow real) — ver skill `site-alto-padrao` pra essa armadilha específica.

**NÃO feito ainda (bloqueia publicar):**
- [ ] Autorização dos 3 clientes pra publicar os depoimentos (mesmo reescritos como conversa de WhatsApp anônima por segmento, sem nome/foto) — pendência repetida desde a sessão de 06/ago, ainda sem resposta
- [ ] Confirmar taxa real de parcelamento 12x no painel do Mercado Pago (hoje é estimativa)
- [ ] Criar a página de Agendamento no Google Calendar (marcar os 8 calendários)
- [x] ~~`consultoria.html`/`produtos.html` redirecionando pro `#servicos` antigo~~ — ✅ corrigido em 07/ago: agora vão pra `sistemas.html#precos`, e o `canonical` das duas aponta pro domínio próprio (`luhpanda.com.br`) em vez do GitHub Pages
- [ ] **Commit e push não foram feitos** — arquivos existem só localmente. Pedir autorização explícita da Luh antes de publicar (o site vai ao ar em ~1-2min depois do push, via GitHub Pages)

## 6-D. Pagamento automático (Módulo 1/2 particular) — construído em 10/ago

**Contexto:** a Luh confirmou que o n8n dela não é local — roda em servidor próprio, público, em `mcp.luhpanda.com.br`, e já processa Mercado Pago de verdade pro ARROBA CERTA (2 workflows ativos: `Criar assinatura` e `Confirmação Mercado Pago`, usando `checkout/preferences`/`preapproval` + Postgres). Copiado o mesmo padrão pra Formação, simplificado (pagamento único, não assinatura).

**Decisões da Luh:**
- In-company (M1 R$9.600 / M2 R$14.400) continua **fora do pagamento automático** — só conversa/proposta, como já estava.
- Pagamento automático só pra **particular** (M1 R$1.600 / M2 R$3.600).
- Credencial do Mercado Pago **separada** da do ARROBA CERTA (a Luh vai lançar o ARROBA CERTA pra venda em breve e não quer misturar o dinheiro nem arriscar nada lá).
- Aviso de venda por **e-mail** (não WhatsApp) — o nó de WhatsApp Cloud API que já existe no n8n dela está no número de TESTE da Meta, não no BR de produção.
- Registro de vendas em **Google Sheets** (não Postgres) — de novo, pra não tocar no schema do ARROBA CERTA.

**O que foi criado:**
- **Planilha:** [`Luh Panda — Vendas Formação`](https://docs.google.com/spreadsheets/d/10QXU8Wek-H2sl3wJuk8Vjtppoboe4h-RbdaLO7RtKu8/edit) (Drive da Luh) — colunas: Data, Hora, Módulo, Nome, E-mail, Telefone, Valor, Forma, ID Pagamento Mercado Pago, Status.
- **Workflow 1 — `Luh Panda — Criar Pagamento (Formação)`** (`yEIEMrq9B4Mpsou6`): webhook `POST /webhook/formacao-criar-pagamento` recebe `{modulo: "m1"|"m2"}` do site, decide o preço **no servidor** (nunca confia no valor vindo do navegador), cria a preferência no Mercado Pago (pagamento único), devolve `{checkout_url}`.
- **Workflow 2 — `Luh Panda — Confirmação Pagamento (Formação)`** (`ufOUlQRF0OrGorNA`): webhook `POST /webhook/formacao-mp-notificacao` que o Mercado Pago chama sozinho. Busca o pagamento real na API deles (não confia no payload da notificação), e se aprovado: registra linha na planilha + manda e-mail pra Luh com os detalhes.
- **Site:** botões "Garantir minha vaga" (`turmas.html`, M1 e M2 particular) chamam o webhook via `fetch`, com timeout de 8s — **se falhar por qualquer motivo, cai automaticamente no WhatsApp de sempre**, nunca trava uma venda. Criada `obrigado.html`: página pós-checkout com 3 estados (aprovado / pendente / falhou) lida pela querystring que o Mercado Pago devolve no redirect.

**Trava técnica descoberta:** a ferramenta de automação (`update_workflow` → `setNodeCredential`) recusa ligar credencial em nó de autenticação genérica (`genericCredentialType`/`httpBearerAuth`) — erro "does not accept credential". É preciso abrir o nó no n8n e escolher a credencial manualmente no dropdown, 1 clique por nó. Registrar isso caso apareça de novo em workflow futuro com o mesmo padrão de autenticação.

**Status em 10/ago (fim da sessão):**
- [x] Credencial `Mercado Pago Luh Panda` (Bearer Auth) ligada em **"Criar preferência Mercado Pago"** (Workflow 1) — testado com curl real, devolveu `checkout_url` válido
- [x] Mesma credencial ligada em **"Buscar detalhes do pagamento"** (Workflow 2) — confirmado via execução real: erro 404 "Payment not found" pra um ID inventado (não 401) prova que a credencial está correta
- [x] Credencial `Gmail account` (gmailOAuth2) criada e ligada em **"Avisar Luh por e-mail"** — corrigido também um bug de criação (faltavam os parâmetros `resource`/`operation` no nó)
- [x] Credencial `Google Sheets account` (googleSheetsOAuth2Api) criada e ligada em **"Registrar venda na planilha"** — ⚠️ achado: a primeira tentativa criou o tipo errado (`Google Sheets Trigger`, que é um credential type diferente e não serve pro nó de escrita); resolvido criando a credencial correta e reaproveitando o mesmo Client ID/Secret do Google Cloud
- [x] Workflow 2 publicado (`publish_workflow`) — os dois workflows estão ativos
- [ ] **Falta só o teste ponta a ponta com pagamento real** — webhook 1 e a parte do Mercado Pago do webhook 2 já foram validados com chamadas reais; Sheets + Gmail só disparam com pagamento **aprovado** de verdade (não dá pra simular com segurança). Combinado: pedir pra alguém de confiança pagar R$1 no Módulo 1 particular e conferir se a linha cai na planilha e o e-mail chega
- [ ] Confirmar taxa real de parcelamento 12x no painel do Mercado Pago (item já pendente na seção 6-C)

**Achado técnico pra próxima sessão:** `update_workflow` → `setNodeCredential` funciona bem pra credencial de tipo nomeado (Gmail, Google Sheets — `credentialKey` = o nome do campo tipado, ex. `gmailOAuth2`), mas **rejeita** ligação em nó de autenticação genérica (`genericCredentialType`/`httpBearerAuth`, usado pelo Mercado Pago) com erro "does not accept credential" — nesses casos só dá pra ligar manualmente na UI do n8n (a Luh faz, eu confirmo depois via `get_execution`).

## 6-E. Domínios extras — redirect pra luhpanda.com.br (10/ago)

**Contexto:** a Luh queria `luhpanda.com` funcionando também. Investigação: `luhpanda.com` **não está registrado** por ninguém (confirmado via whois direto no Verisign) — precisa comprar antes de configurar qualquer coisa. Enquanto isso, descobrimos que ela já tem **`luhpanda.store`** e **`luhpanda.online`** registrados (HostGator) e sem uso — sem DNS, sem hospedagem, "soltos".

**Decisão:** em vez de comprar o `.com`, redirecionar os dois domínios que ela já tem pro `luhpanda.com.br` (site oficial). Sem custo adicional.

**Como foi feito:** GitHub Pages só aceita 1 domínio customizado por repositório, então não dá pra "hospedar nos dois ao mesmo tempo" — a solução foi criar **2 repositórios novos, só de redirecionamento**:
- [`luhpanda-store-redirect`](https://github.com/lucianapandolfo9-spec/luhpanda-store-redirect) — `index.html` com meta-refresh + `window.location.replace` pra `https://luhpanda.com.br`, `CNAME` = `luhpanda.store`
- [`luhpanda-online-redirect`](https://github.com/lucianapandolfo9-spec/luhpanda-online-redirect) — mesma coisa, `CNAME` = `luhpanda.online`

Os dois já estão publicados e com GitHub Pages ativado (`gh api .../pages`). **Falta só a Luh apontar o DNS** na Zona de DNS do HostGator (painel "Configurar Domínio" → "Sem hospedagem, apenas Zona de DNS") — os mesmos 4 A records + CNAME `www` que já usamos no `.com.br`:

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   lucianapandolfo9-spec.github.io
```

**Pendente (baixa prioridade — decisão da Luh em 10/ago: foco no `.com.br` publicado, resto fica pra depois):**
- [ ] Luh adicionar os registros DNS acima nos dois domínios
- [ ] Depois que propagar, ativar HTTPS enforcement nos 2 repos novos (`gh api -X PUT .../pages -F "https_enforced=true"`, mesmo comando usado no `.com.br` — só funciona depois do certificado emitir)
- [ ] Decidir se registra o `luhpanda.com` de verdade no futuro (hoje está livre pra qualquer um registrar)

## 6-F. Site v4 publicado em produção — 10/ago ✅

`luhpanda.com.br` está no ar com o site completo: `index.html` (central), `sistemas.html`, `turmas.html`, `obrigado.html`, pagamento automático nos módulos particulares. Verificado ao vivo (não só local): 6 páginas + 8 assets pesados (vídeos/imagens dos cases) respondendo 200, CORS do webhook de pagamento confirmado funcionando pro domínio real (preflight OPTIONS + POST com `access-control-allow-origin: https://luhpanda.com.br`), visual conferido por screenshot no domínio público batendo com o aprovado. **Aprovação da Luh: "ele tá incrivelmente lindo... amei muito."**

Único ponto que só ela pode fechar: teste com pagamento real de R$1 (planilha + e-mail — ver seção 6-D) e autorização final dos depoimentos já publicados.

## 7. Pendências e backlog

**Bloqueado esperando a Luh:**
- [x] ~~Reenviar a foto do treinamento~~ — ✅ resolvido em 31/jul: a Luh reorganizou pra `Downloads/Luh Panda/Aulas /Turmas/Turma IA na Pratica.HEIC`; convertida e salva em `assets/cases/treinamento-turma.jpg` (1400px, 288KB). Conteúdo conferido: TV mostra slide da própria aula, laptops e nomes nos certificados ilegíveis no tamanho web.
- [ ] Subir manualmente a nova arte de capa do LinkedIn (`~/Downloads/linkedin-banner-ia.png`) — upload automático via Chrome MCP não funcionou nesta sessão
- [ ] Preencher "Resultado Mensurável" de cada case no Notion (1 número por case) — os 4 cases largos da v3 têm espaço reservado pro número mas nenhum dado ainda
- [ ] Decidir sobre `codex-plugin-cc` (usar Codex/ChatGPT da empresa pra revisar o site) — só faz sentido quando o HTML da v3 estiver pronto pra revisão

**Próxima sessão (retomar por aqui):**
- [ ] Preencher "Resultado Mensurável" de cada case largo (seção 6-A) e adicionar o número grande reservado no layout quando o dado existir.
- [ ] Revisitar o resto do site (Hero, Serviços) com o mesmo padrão "mega profissional" se a Luh quiser continuar o upgrade — Cases e Sobre já estão na v3.

**➡️ Etapa seguinte da marca (decidida em 31/jul): TRÁFEGO PAGO**
Ordem acordada: **site v3 no ar → criativos prontos → começar tráfego pago.** A Luh pretende subir campanha na semana de 03/ago usando o vídeo de apresentação como criativo principal.
- [ ] Fechar o criativo de vídeo (legenda + música + cor — ver seção 6-B)
- [ ] Definir objetivo de campanha e destino: hoje todo CTA do site vai pro WhatsApp (`wa.me/5584994127476`) — decidir se o anúncio manda direto pro WhatsApp (Click-to-WhatsApp) ou pro site
- [ ] Estrutura de BM/conta de anúncios — usar a skill `gestor-trafego` (ela já cobre estrutura de Business Manager, modelo de acesso e os erros que dão banimento)
- [ ] Definir público, orçamento e oferta do anúncio (o Diagnóstico R$ 500 é a única oferta com preço público — provável porta de entrada)
- [ ] Instrumentar medição antes de subir: sem pixel/evento no site não dá pra otimizar campanha nem saber o custo por conversa

**Em andamento (de sessões anteriores, ainda não resolvido):**
- [ ] Certificado HTTPS do domínio `luhpanda.com.br` (automático, aguardando GitHub)
- [ ] Montar calendário de conteúdo do LinkedIn numa tabela no Notion (Metricool não serve — LinkedIn lá é só plano pago)
- [ ] Reexportar o PDF do currículo a partir do `.docx` atualizado

**Backlog (sem pressa):**
- [ ] Depoimentos de clientes (áudio de WhatsApp vale) → seção de prova social
- [ ] Link do site na bio do Instagram/WhatsApp Business
- [ ] Screenshot do dashboard logado do ARROBA CERTA (melhor que o atual)

## 8. Skills do projeto

| Skill | Pra quê |
|---|---|
| `site-luhpanda` | Fatos da marca pessoal completa: site, domínio, currículo, LinkedIn (perfil + conteúdo), regras de negócio, pipeline de assets, deploy |
| `site-alto-padrao` | Playbook genérico de site premium + motion + deck PDF (reutilizável pra clientes) |
| `ui-ux-pro-max` | Design system, estilos, guidelines UX (usada pela site-alto-padrao) |

## 9. Aprovi.ai — por que esse nome

Produto de aprovação de conteúdo (antes chamado "Posta Aí"), nascido no projeto da Gigi (ver skill `lymphatic-by-gigi`, repo local `posta-ai`). Em 30/jul descobrimos que "Posta Aí" colide com o nome do próprio repo além de soar genérico, e a primeira tentativa de troca, **"Aprova.ai", já existe como concorrente direto** (mesmo nicho: aprovação de posts pra agências, aprova.ai). Pesquisamos e validamos (busca + whois em vários candidatos — Libera/Combina/Confere/Valida/Segue.ai todos ocupados; Rubrica.ai colide com nicho de "rubricas de avaliação com IA") até fechar em **Aprovi.ai**: domínio `.ai` livre, único conflito achado foi "Aprovi Software" (ERP mexicano, Tijuana — segmento e país diferentes, risco aceito). `aprovi.com` está ocupado por outra empresa (fora do alcance). **Pendência da Luh:** checar o INPI antes de investir na marca de verdade — esse produto vai ser validado pela Lume.

O nome do produto no `posta-ai` repo local (`/Users/luhpanda/Downloads/Luh Panda/posta-ai`) ainda não foi trocado — só o case do site vai chamar Aprovi.ai por enquanto. Trocar no repo do produto é tarefa separada, não estava no escopo de hoje.

## 10. Histórico resumido

- **06/jul** — Recuperação do projeto, plano de execução em 6 etapas, primeiros assets.
- **07/jul (manhã)** — Ícones SVG nas seções Dor/Serviços, vídeos comprimidos, cases com mídia real, preço R$ 500, deploy v1.
- **07/jul (tarde)** — Blur de privacidade, redirects nas páginas legadas, favicon, og:image, ROAS 6,03x.
- **07/jul (noite)** — **Deck PDF v1→v2** (foco IA/treinamento/plataformas, foto profissional, domínio no contato). **Site v2**: reposicionamento completo espelhando o deck + upgrade visual com motion (Inter, blobs, reveal, hover lift, ícone novo de Plataformas). Skills `site-alto-padrao` e este PROJETO.md criados.
- **08/jul** — **Domínio `luhpanda.com.br` no ar**: CNAME + custom domain no GitHub Pages, DNS da HostGator limpo (removidas 3 landing pages antigas do Netlify) e reconfigurado. **Currículo atualizado** com o projeto do site e o ARROBA CERTA. **LinkedIn**: headline, cargo atual (Lead Performance, encerrando o vínculo desatualizado com a Lume Social), setor e arte de capa nova — LinkedIn passa a ser o canal oficial de vendas + conteúdo da marca. Skill `site-luhpanda` expandida pra cobrir marca pessoal completa (não só o site).
- **30/jul** — **Kickoff do site v3** ("cara de mega profissional"). Clonados e avaliados 9 repos de referência em `Referencias-Site/` (validados: web-interface-guidelines, motion, Chrome-DevTools-MCP; descartado OmniRoute por risco de dado sensível passando por terceiro). **Decisão de negócio:** cases do site deixam de nomear empresa cliente, passam a nomear a frente de serviço — só produto próprio continua nomeado. Produto "Posta Aí" renomeado pra **Aprovi.ai** (pesquisa de colisão de nome + domínio, ver seção 9). Recebidos e processados 5 vídeos brutos de sistemas reais (Lead Performance/BI, Capitalize/folha ×2, ARROBA CERTA, Posta Aí) — 2 vídeos da Capitalize tinham nome/CPF/salário de funcionário real espalhado pela tela e uma janela do Finder vazando a lista inteira de clientes da Luh; um deles (auditoria de folha) foi recortado e mascarado com sucesso (calibração pixel a pixel, verificado frame a frame) virando `auditor-folha-demo.mp4`; o outro (`capitalize-plataforma-anonimizar.mov`) ficou de fora por não ter nenhuma janela limpa no vídeo inteiro — aguarda regravação com dado fake. Cortados e finalizados os outros 3: `hub-interno-demo.mp4` (logo Lead Performance mascarada), `arroba-demo-v3.mp4`, `aprovi-demo.mp4`. Blueprint completo da nova seção de Cases aprovado pela Luh (ver seção 6-A) — **HTML ainda não escrito**, é o primeiro passo da próxima sessão. Case do robô de atendimento de contabilidade (Toninho) removido do escopo do site a pedido da Luh.
- **03/ago (parte 4)** — **Hover de "botão" removido dos cards estáticos.** Feedback da Luh: cards de Dor, Serviços, Cases e Método (e tags de tecnologia) tinham hover de elevação+borda acesa que parecia clicável mas não levava a lugar nenhum. Removido o hover desses elementos, mantido só onde clicar de fato navega (WhatsApp, nav, footer). Testado ao vivo (mouse sobre card, confirmado 100% estático) antes do deploy. Aprovação da Luh: "ta incrível, melhorou muito, matou a pau". Princípio 6 adicionado às regras invioláveis (seção 5) e à skill genérica `site-alto-padrao` — vale pra qualquer site futuro, não só esse.
- **03/ago (parte 3)** — **Ícones redesenhados (feedback da Luh: "brega", "quero ícones que se movimentem").** Pesquisadas referências reais no nicho (n8n — nó circular + partícula de dado viajando pela conexão; Linear/Attio — ícone-linha minimalista com motion sutil). Substituídos os 8 ícones flat "sticker" (`assets/icons/*.svg`, gerados por IA, classe `.emoji-img`) por SVG inline linha-fina em badge circular, cada um com micro-animação CSS contínua específica (setas girando = trabalho repetitivo, barras pulsando = painéis fragmentados, sparkle piscando = IA sem método, ponteiro de relógio girando = espera; check desenhando = treinamento, anéis de sinal pulsando = agente de IA, ponto viajando entre painéis = plataforma sob medida, engrenagens girando = automação) + glow no hover. Testado ao vivo via servidor local + Chrome (headless não mostra CSS animation) em desktop e mobile (390×844) antes do deploy. `prefers-reduced-motion` respeitado (pausa todas as animações). Regra de identidade visual (seção 4) e a skill `site-luhpanda` atualizadas com o novo padrão.
- **03/ago (parte 2)** — **Site v3 no ar.** Retomada a frente do site (parada em 30/jul com blueprint aprovado mas HTML não escrito). Trocado o vídeo do Sobre pro `hero-v5-final.mp4` (fala contínua + cor corrigida, aprovado em 31/jul); removido o rascunho intermediário `hero-v4-preview.mp4`. Escrita a seção de Cases v3 completa no `index.html`: 4 cases largos alternados esquerda/direita etiquetados por frente de serviço (Hub interno/Plataforma sob medida, Auditor de folha/Agente de IA, ARROBA CERTA e Aprovi.ai/Produto próprio), com os vídeos já mascarados da sessão de 30/jul; + 3 cases compactos no grid existente (Treinamento, Relatório Meta Ads, Atendente de IA genérico). Case do Toninho removido do HTML (arquivo continua no repo). Motion reaproveitou o sistema `reveal`/`stagger` já existente (IntersectionObserver, respeita `prefers-reduced-motion`) em vez de importar a lib `motion`, pra manter consistência com o resto do site. Verificado com screenshot headless (1400×7500) antes do deploy — layout, vídeos e posters ok. **Pendente:** número de resultado por case largo (sem dado ainda, ver seção 7).
- **03/ago** — **2º lote de conexões LinkedIn**: mais 9 convites enviados (rotina diária confirmada funcionando) — Thuany Ferreira, Tiago Moura, Selma Foguel, Adriano José, Gabriel Passos, Marina Do Passo Soares Quintas, Newton Neto, Raphael Bezerra, Gabrielle Barros (marketing/growth/mídia paga, Recife e região). Total acumulado: 18 convites em 2 dias. Candidatura da Sherlocker enviada com sucesso em 02/ago à noite.
- **02/ago (parte 4)** — **Candidatura Sherlocker.** Vaga achada em busca de vagas (PJ, 100% remoto, Claude Code é o fluxo de trabalho central deles, processo seletivo pede "link do que você construiu" em vez de anos de experiência — encaixe raro e forte com o perfil da Luh). Rascunho de candidatura criado no Gmail dela pra `contato@sherlocker.com.br`, com prova de trabalho: ARROBA CERTA (link certo e vigente: `https://lucianapandolfo9-spec.github.io/arroba-certa/` — **ainda sem domínio próprio, pendente comprar e configurar**, ver nota abaixo), Aprovi.ai, analista de folha da Capitalize (Python+RAG+Supabase), site (`https://www.luhpanda.com.br`) e LinkedIn. Decisão de produto: o ARROBA CERTA exige aprovação manual da Luh pra liberar conta nova (feature de segurança de propósito, não bug) — mantido assim de propósito pra vaga, porque vira gatilho de contato direto (Sherlocker tem que chamar no WhatsApp pra pedir liberação) e reforça a narrativa de builder que pensa em controle de acesso — bom encaixe pra empresa de investigação/segurança. **Nota sobre acesso a sistemas em candidaturas futuras:** Aprovi.ai (tem dado real da cliente Gigi rodando dentro) e o analista de folha da Capitalize (dado real de funcionário de cliente) NÃO podem ser abertos pra terceiros nesse tipo de teste — só ARROBA CERTA é seguro por ter só dado fictício.
- **02/ago (parte 3)** — **Rotinas automáticas criadas** (claude.ai/code/routines): `trig_01H5sbSeGWJseptPw68n5A3n` roda todo dia 9h (Recife) e só produz um texto-lembrete no painel de rotinas pra Luh vir chamar o Claude Code e mandar os convites do dia junto (agente em nuvem não acessa Chrome/LinkedIn — human-in-the-loop de propósito, pra não arriscar banimento de conta como já rolou com PhantomBuster). `trig_01Kujx8wEZLbe6czqeFH2uQC` roda todo dia 8h, busca vagas de IA/Python/RAG/Claude Code (remoto ou Recife) via WebSearch e cria um **rascunho** (não envia) no Gmail dela com a lista — usa o conector Gmail já vinculado à conta claude.ai dela (`452c896c-9dd0-4b70-8ae5-6bac2efb40c2`).
- **02/ago (parte 2)** — **Correção de perfil técnico + crescimento de rede.** A Luh corrigiu um erro de leitura: ela não é "não-programadora" — codifica em **Python**, monta arquiteturas **RAG** conectadas a Supabase em praticamente tudo que constrói (ex: o auditor de folha da Capitalize é Python+RAG+Supabase, não low-code), e também constrói sites em HTML/CSS publicados via GitHub. Currículo corrigido de novo: Perfil Profissional e bullet da Capitalize reescritos pra citar Python/RAG explicitamente; adicionados Python, RAG (Retrieval-Augmented Generation), HTML/CSS e Git/GitHub em Competências Técnicas. **Incidente e correção:** o arquivo editado (`LUCIANA PANDOLFO.docx`) tinha sido parar na Lixeira do Mac — provável confusão entre ele e o arquivo de backup ao abrir no Word (o PDF que a Luh exportou saiu do backup antigo, sem nenhuma das atualizações). Restaurado da Lixeira, PDF antigo renomeado e preservado como "PDF antigo (pre 02-ago)". **Isso muda o quadro de vagas**: as posições de "AI Engineer" (Python/LLM/RAG) que antes pareciam esticão técnico — CI&T, Compass UOL, Natura, Exadel, banco BV, Velozient — na verdade são boas candidaturas agora que o perfil real dela é conhecido. **Rede do LinkedIn**: autorização geral da Luh pra mandar convites ("pode fazer tudo"). Enviados 9 convites de conexão pra perfis de marketing/branding/growth em Recife com boa sobreposição de conexões em comum (Arthur L., Rafael Araujo, Fellipe Maia, marcelo viana, José Balbino, Larissa Lira, Renata Tuccimei, Jecika Barros, Aline Carneiro) — parado em 9 pra não estourar o limite diário seguro (~10-15/dia) e evitar flag de spam do LinkedIn. **Site exposto**: adicionado `luhpanda.com.br` em Dados de Contato do LinkedIn (categoria Portfólio) — antes só estava em Destaques, agora aparece também no card que abre no topo do perfil.
- **02/ago** — **Auditoria de LinkedIn + atualização de currículo.** Diagnóstico do LinkedIn: conteúdo e headline já estavam bons, mas a rede é pequena demais (58 conexões/60 seguidores) pra gerar alcance orgânico — é a causa raiz de "ninguém procurando ainda", não falta de post. Achado crítico: Experiência mostrava a Lume Social Produções como emprego atual em duas entradas duplicadas — removidas a pedido da Luh (empresa nova/pequena, ainda sendo pensada, não vale manter como vínculo aparente no perfil). **Currículo (.docx) atualizado** com dados puxados do banco Notion "Projetos": Aprovi.ai (produto próprio em produção), ROAS 6,03x do robô de relatório de tráfego pago, e os números da auditoria automática de folha da Capitalize (144 e 138 colaboradores, ~95% extração via OCR). Corrigido dado incorreto da Pandoka (currículo tinha "Recife, +575%"; correto é Beach Club em Pipa/RN, +60% de faturamento, vendas dobradas no 2º mês — mesmo dado do Sobre do LinkedIn). PDF final ainda precisa ser reexportado pela Luh (Word/Docs).
- **31/jul** — **Foto do treinamento resolvida**: a Luh reorganizou `Turma IA na Pratica.HEIC` pra `Aulas /Turmas/`, convertida e aprovada em `assets/cases/treinamento-turma.jpg`. **Vídeo de apresentação (Sobre + tráfego pago) roteirizado, gravado pela Luh em 5 takes e montado** (ver seção 6-B completa): 1ª versão tinha 2,5s de silêncio nos cortes de tela (reprovada, "corte amador"); refeita com fala contínua e sistemas entrando por cima da voz — aprovada. Achado de segurança durante a montagem: `aprovi-demo.mp4` expõe o link secreto de aprovação da cliente Gigi (acesso sem senha) — mascarado no vídeo final; **o arquivo original do case ainda expõe o link, pendente mascarar antes de usar nos Cases v3**. A Luh editou a versão dela com música e legenda (2 rounds — 1º tinha "AUTOMATIZAR" quebrado em duas linhas, corrigido no 2º) em `PARA VENDER.mp4`; nós então corrigimos a cor (estava com brancos travados em 198 e saturação baixa, dando aspecto lavado) gerando `PARA VENDER - COR AJUSTADA.mp4`, **aprovada e é a versão final**. Comprimida pro site em `assets/hero-v5-final.mp4` (5,6MB) — falta só trocar no `index.html` e dar push (fica pra segunda). **Decisão de negócio:** ordem da marca agora é site v3 → criativos → **tráfego pago**, com subida de campanha prevista pra semana de 03/ago usando esse vídeo como criativo principal (checklist completo na seção 7).

- **06/ago** — **Pivô de vendas desenhado (site v4).** A Luh trouxe um blueprint novo: mudar a home pra mostrar âncora de preço real ("a partir de R$4.000" + manutenção R$500/mês nos 4 cards de serviço) em vez de "Projeto sob medida", e criar a página `/formacao` (Módulo 1 R$1.600, Módulo 2 R$3.600/R$14.400 in-company, aula avulsa) — motivo: vai rodar tráfego pago pra vender produtos e aulas, precisa de filtro de preço. Reconciliado com o Notion "Aulas IA na Prática" (Módulo 2 já estava fechado em 6 aulas/12h desde 26/jul, não "4 a 6 a definir" como o rascunho da Luh dizia). Decisões tomadas: aula avulsa com preço por módulo (R$200/h M1, R$300/h M2), aulas ficam todas gravadas, crédito do Diagnóstico mantido, pagamento via Mercado Pago integrado ao site com redirecionamento pra agenda + WhatsApp como fallback (infra do webhook automático travada porque o n8n dela é local — desenhado um MVP com link de pagamento fixo pra sair do papel primeiro). Blueprint completo salvo em `BLUEPRINT-V4-VENDAS.md`. Depoimentos: recebidos 3 prints de WhatsApp (pasta `Depoimentos/`) — 2 aprovados por conteúdo (Priscilla/aulas, Keila/automação de NFs), precisam ser borrados (nome+foto) antes de publicar; 1 (Ianca) com contexto não confirmado; 1 vídeo recebido é prova de entrega técnica (Claude Code processando PDFs), não depoimento falado. **HTML ainda não escrito — é o próximo passo.**

- **06/ago (parte 2)** — **Estratégia comercial completa desenhada** (`ESTRATEGIA-VENDAS-2026.md`). Chamado da sessão: a Luh vai investir em tráfego pago e precisa de leads. Diagnóstico: o gargalo não é produto nem prova, é **distribuição** — site sem pixel/captura, LinkedIn com rede pequena demais (58 conexões) pra gerar lead em 60 dias, Instagram com audiência de viagem (dado dela: pitch de IA fica preso na base), e nenhuma lista de e-mail. **Decisão central: o tráfego pago vai TODO pro Módulo 1, não pros sistemas** — turma de 10 = R$16.000 por 8h de aula (≈R$2.000/h) contra R$50–100/h num sistema de R$4.000, e aluno adicional custa zero. Sistemas continuam vendendo por site/inbound/indicação/Diagnóstico, sem verba de anúncio. **Parcelamento fechado em 12x sem juros absorvidos por ela** (manchete de preço vira "12x de R$133", não "R$1.600") com vitrine de 3 opções calibrada pra ela ficar quase indiferente: Pix R$1.440 (10% off) / 12x de R$133 / à vista R$1.600 — in-company R$14.400 fica fora do cartão (proposta + boleto). Conteúdo separado em 3 trilhas: Instagram mantém viagem como motor de alcance + IA só em formato de espetáculo visual ("a máquina trabalhando sozinha", reaproveitando a gravação dos 25 PDFs), LinkedIn como obra de 90 dias, e a lista de e-mail como o ativo que falta. Apontado o **dinheiro de custo zero na mesa**: clientes atuais (Capitalize, a cliente do auditor de folha que acabou de pedir pra expandir acesso pro time, Lead Performance) são candidatos a in-company R$14.400 — uma venda dessas vale ~9 alunos conquistados a peso de anúncio. **Depoimento novo recebido:** print da Gabriela sobre o auditor de folha, o mais forte do conjunto (cliente pedindo pra espalhar o acesso internamente) — precisa borrar nome/foto como os outros.

---
**RETOMAR POR AQUI:**
1. Ler `ESTRATEGIA-VENDAS-2026.md` (o porquê e a ordem) e `BLUEPRINT-V4-VENDAS.md` (o que vai no site).
2. **Semana 1 — custo zero primeiro:** puxar conversa de in-company com os clientes atuais (§7 da estratégia); borrar nome+foto dos 3 depoimentos aprovados (Priscilla, Keila, Gabriela); confirmar contexto do print da Ianca.
3. **Semana 1 — home:** trocar "Projeto sob medida" → "A partir de R$4.000" nos 4 cards, promover Diagnóstico R$500 pra bloco próprio, trocar textos pré-preenchidos dos botões.
4. **Semana 2 — `/formacao`:** construir completa, com "12x de R$133" como manchete de preço (Módulo 2 = 6 aulas/12h + opção in-company R$14.400 com CTA de conversa, não de compra) + link de pagamento Mercado Pago (MVP: link fixo) + captura de e-mail.
5. **Semana 3 — medição:** Pixel da Meta + eventos (PageView/Lead/InitiateCheckout/Purchase) nas duas páginas, testados de verdade.
6. **Semana 4 — tráfego:** uma campanha só (Módulo 1 → `/formacao`), 3 criativos, R$30–50/dia, sem mexer por 7 dias.
---

## 6-G. Site v5 + venda da Skill Assistente de Obra (05/10/2026, branch `site-v5-skill-obra`, NÃO publicado)

Plano fechado no 2º /grill-me (vault: `Luh Panda/Produtos/Skill Assistente de Obra.md`).

- **Home curta:** quem ela é + 4 portas (Bot de atendimento a partir de R$ 1.500 · Skill de obra R$ 97 ·
  Formação · Automação sob medida com o Hub Luh Panda de vitrine). CTA principal único:
  **"Diagnóstico grátis de 20 min no WhatsApp"**, mensagem pronta em `assets/js/site.js` (`MSG_DIAGNOSTICO`).
- **Páginas:** `bot.html` · `skill-obra.html` (LP de venda) · `turmas.html` (formação, simplificada,
  checkout dos particulares inalterado) · `automacao.html`. `sistemas.html`, `consultoria.html` e
  `produtos.html` viraram redirect pra `automacao.html`.
- **Saiu do site:** a tabela pública R$ 5k/15k/25k. O "setor de IA R$ 3.000" nunca foi publicado
  (`setor-de-ia.html` segue fora do Git). Automação entra pelo diagnóstico.
- **CSS/JS compartilhados:** `assets/css/v5.css` (tokens v4) e `assets/js/site.js` (pixel, CTA, compra, reveal).
  As páginas novas não têm mais CSS inline.
- **Venda da skill:** pré-requisitos (Claude pago, foto salva pelo link do Drive) **antes** do botão de
  compra, que fica travado até marcar a caixa. Demonstração rotulada "dados de exemplo", sem nada de cliente.
- **Pagamento e entrega:** workflow novo `n8n/skill-obra.workflow.json` (3 webhooks: criar pagamento,
  notificação do MP, acesso). Formação não foi tocada. Detalhe, credenciais e checklist do teste de R$ 1:
  `n8n/LEIA-ME.md`.
- **`acesso.html`:** só mostra o link do kit se o n8n confirmar no Mercado Pago que o pagamento está
  aprovado **e** o token `t` (gerado na criação, guardado no `metadata`) bater. O link nunca está no HTML.
- **`obrigado.html`:** reconhece `produto=skill` e manda pra `acesso.html`; Formação segue igual.
- **Pixel + CAPI:** `PIXEL_ID` vazio = pixel desligado. PageView, ViewContent, InitiateCheckout e Lead no
  navegador; Purchase com valor só pelo servidor (CAPI). Token da CAPI só na credencial do n8n.
- **Falta (dela):** pixel + token CAPI, `KIT_URL`, credenciais no n8n, OK pra importar/publicar o
  workflow, teste de R$ 1, OK pra merge na `main`.

### 6-G.1 Rodada de 05/10 (noite): preço, acesso e protótipo de motion

- **Preço in-company novo (pedido dela):** Módulo 1 **R$ 3.000** e Módulo 2 **R$ 10.000**, turma de
  **até 10 pessoas** (era R$ 9.600 / R$ 14.400 até 8). Particular **não mudou** (M1 R$ 1.600 = 12x R$ 133
  ou R$ 1.440 no Pix · M2 R$ 3.600 = 12x R$ 300 ou R$ 3.240 no Pix). Atualizado em `turmas.html`
  (cartões + FAQ "Quanto custa?"), na porta 03 da home e em `TABELA-PRECOS-2026.md`. Preço por pessoa
  acima de 10 ainda não decidido. Checkout do particular e workflow de Formação intocados.
- **`acesso.html`, estado "negado":** texto suavizado ("Ainda não consegui confirmar seu pagamento…
  esta página confere sozinha") e agora ele **reconfere de verdade** (mesma chamada ao servidor, a cada
  20 s, sem piscar a tela; teto de 12 tentativas somando com o "pendente"). Link incompleto ou que não
  bate com o pagamento (`link_invalido`) mostra outro texto e não promete reconferir. Regra de
  liberação (n8n + token `t`) não mudou.
- **Motion, PROTÓTIPO em 2 lugares** (`assets/css/motion.css` + `assets/js/motion.js`, só carregados
  em `skill-obra.html` e `automacao.html`):
  - Sem GSAP: Web Animations API nativa + IntersectionObserver, ~0 KB de terceiro. Só `transform` e
    `opacity`; nenhum listener de scroll. CLS medido 0 nos 4 cenários.
  - Conteúdo final está no HTML. O `<head>` liga `html.mo` só sem `prefers-reduced-motion`; se o
    `motion.js` não carregar em 4 s, a página volta ao estado final sozinha.
  - **skill-obra:** "O que faz" monta os 4 passos em sequência (linha desenha, texto sobe). Demonstração:
    foto chega → Claude "pensa" e digita a leitura → cursor clica em "sim" → linha voa do chat e
    encaixa na planilha (espera a planilha estar 85% visível, descontando a barra fixa do celular) →
    total da obra conta de R$ 312,45 a R$ 799,35 → pasta do Drive aparece e o cursor clica. Botão
    "Ver de novo".
  - **automacao:** maquete do Hub virou abas acessíveis (Visão geral · Financeiro · Comercial ·
    Contratos · Agenda), todas com dados de exemplo no HTML. Tour com cursor, números contando,
    gráfico desenhando; no desktop o mouse num módulo assume (volta 3,5 s depois de sair); clique,
    toque e setas do teclado também. No celular o menu vira faixa horizontal.
  - Vídeos de prévia: `~/Downloads/Luh Panda/Prints site v5 (05-10)/motion/`.
- **Bug corrigido de carona:** `skill-obra.html` abria com 745 px de largura no celular (a coluna da
  demonstração não encolhia abaixo da tabela). `.demo > *{min-width:0}` em `v5.css`.

### 6-G.2 Rodada de 05/10 (madrugada): motion aprovado, bot animado e preço da particular

- **Decisões dela sobre o protótipo:** sequência com cursor só nas demos de produto (skill, Hub, bot).
  Resto do site: entrada suave ao rolar, **só opacidade, sem slide** (`.rv` em `v5.css`; grades de
  cartões aparecem um a um). Os passos da skill também perderam o slide. Skill roda 1 vez + "Ver de
  novo" (ritmo de ~16 s mantido); Hub em loop enquanto está na tela; bot igual à skill.
- **Celular:** onde a tela é de toque (`hover: none` e `pointer: coarse`), a seta vira **toque de
  dedo**: círculo que aparece no ponto, afunda e pulsa duas ondas. Desktop segue com a seta.
- **`bot.html`, demo nova** ("Veja funcionando", dados de exemplo): cliente chama 22:01, bot responde
  na hora, 2 perguntas de qualificação, oferece 09:00 e 10:30, o toque escolhe 10:30, o compromisso
  voa pra mini-agenda e fecha com o selo **"Lead atendido às 22h04"**. Agenda fica fixa ao lado no
  desktop. O HTML já tem a conversa inteira (SEO e reduced-motion).
- **Failsafe ampliado:** o `.rv` só esconde com `html.rvj`, que o `<head>` liga sem reduced-motion e
  desliga sozinho em 4 s se o `site.js` não carregar (antes, sem JS a página ficava invisível).
- **CLS:** animações 0 em todas as páginas. Sobra ~0,006 no desktop de `bot` e `turmas` vindo da
  troca da fonte Inter no hero (já existia; o `bot` tinha 0,032 e caiu pra 0,006 com quebra fixa no
  título). Zerar de vez pede `display=optional` ou Inter servida do próprio site: decisão dela.
- **Preço da particular (pedido dela):** M1 **R$ 997** (12x R$ 83 · **R$ 897 no Pix**) e M2
  **R$ 2.497** (12x R$ 208 · **R$ 2.247 no Pix**). Pix arredondado pro real inteiro, no padrão que o
  site já usava (sem centavos). Turma de empresa **acima de 10 pessoas: sob consulta**, com botão pro
  WhatsApp em `turmas.html`, no FAQ e na porta 03 da home. `data-valor` dos botões: 997 / 2497.
- 🔴 **ANTES DO MERGE:** o valor cobrado de verdade mora no workflow n8n `Criar Pagamento (Formação)`
  `yEIEMrq9B4Mpsou6`, ainda fixo em **1600/3600**. Precisa virar 997/2497 (e, se o Pix for cobrado
  com desconto no servidor, 897/2247 exatos). Não foi mexido nesta rodada: a sessão principal faz isso
  com o OK dela. Se mergear antes, o site anuncia R$ 997 e o checkout cobra R$ 1.600.
- Vídeos: `bot-celular` · `bot-desktop` · `home-celular` · `home-desktop` · `skill-obra-celular`
  (toque de dedo) em `~/Downloads/Luh Panda/Prints site v5 (05-10)/motion/`. Celular gravado em
  390×844 (resolução de tela, não retina).

### 6-G.3 Acabamento pós-publicação (06/10, branch `site-v5-acabamento`)

v5 no ar desde 06/10 (merge do PR #1, commit 7a8818d). Esta rodada só fecha pendência, sem decisão nova:
- **Um h1 por página:** em `acesso.html` e `obrigado.html` cada estado tem `.titulo-estado`; o do estado
  ativo vira h1 e os outros ficam h2 (troca feita no `mostrar()`). Visual igual.
- **"Pular para o conteúdo"** (`.pular`, aparece no foco) em todas as páginas públicas, apontando pra
  `<main id="conteudo">`.
- **Contraste:** `--fraco` foi de `#8B7A98` para `#9382A0` (+8 em cada canal, mesmo tom). A única falha
  medida no render era o texto mono dentro da bolha `.msg--eu` (#2B1A38): 4,08:1, agora 4,54:1. No fundo
  da página foi de 4,96 para 5,52; na superfície, de 4,71 para 5,25. Token trocado também em termos e
  privacidade.
- **canonical + og** em termos, privacidade, acesso e obrigado (as duas últimas seguem noindex).
- **Termos:** garantia de 7 dias da Formação agora diz "compra feita pela internet ou combinada comigo".
- **Privacidade:** pixel descrito como valendo pro site todo quando o `PIXEL_ID` for preenchido.
- **Sobre:** transcrição do vídeo em `<details>` abaixo dele (Whisper conferido com a legenda gravada).
- Prints: `~/Downloads/Luh Panda/Prints site v5 (06-10)/acabamento/`.
