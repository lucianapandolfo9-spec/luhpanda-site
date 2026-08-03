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
| **Site one-page** | `index.html` neste repo → https://lucianapandolfo9-spec.github.io/luhpanda-site/ | ✅ **v3 pronto (03/ago)** — Cases reescritos (seção 6-A) e vídeo do Sobre trocado (seção 6-B), ver histórico |
| **Domínio próprio** | `luhpanda.com.br` (HostGator) | ✅ ativo, apontado pro GitHub Pages via CNAME. HTTPS pendente (certificado automático do GitHub, demorando mais que o normal — checar `gh api repos/lucianapandolfo9-spec/luhpanda-site/pages -F https_enforced=true`) |
| **Deck PDF do portfólio** | `portfolio/deck.html` → `portfolio/Luh-Panda-Portfolio.pdf` (14 slides, ~1,7MB) | ✅ v2 pronto; regenerar quando site mudar |
| **Currículo** | `Curriculo Luh Panda/LUCIANA PANDOLFO.docx` (+ `.pdf`) | ✅ atualizado em 02/ago com Aprovi.ai, ROAS 6,03x e números da auditoria de folha (Capitalize); corrigido dado da Pandoka (era Recife/575%, certo é Beach Club em Pipa-RN/60%); falta reexportar o PDF final (abrir no Word/Docs — conversão local perde a foto do cabeçalho) |
| **LinkedIn** | `linkedin.com/in/luciana-pandolfo-661308403` | ✅ headline, cargo (Lead Performance), setor, banner e capa novos já no ar; ✅ seção "Em destaque" com posts + link do site já ativa; ✅ 02/ago: removidas as 2 entradas de Lume Social Produções da Experiência (empresa nova/pequena, não valia manter como vínculo aparente); ⚠️ gargalo real de geração de leads é rede pequena (58 conexões/60 seguidores) — só 2 visualizações de perfil e 1 aparição em busca na última semana; ⏳ calendário de conteúdo (Notion) ainda não montado |
| **Fonte da verdade dos cases** | Notion "🧠 Luh Panda — Portfólio & Projetos" | ⚠️ campos "Resultado Mensurável" incompletos |

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
Ícones: SVG flat próprios, 224×224, fundo gradient escuro, roxo+laranja, acento pontilhado.
Motion: scroll reveal + stagger, blobs no hero, hover lift, gradiente animado no card do Diagnóstico — pack completo na skill `site-alto-padrao`.

## 5. Regras invioláveis

1. **Único preço público: Diagnóstico Estratégico R$ 500** (pagamento único). Resto é "Projeto sob medida". Nunca valor/hora.
2. **Todo CTA → WhatsApp** (`wa.me/5584994127476`). Sem formulário, sem captura de e-mail.
3. Copy pra dono de negócio; resultado primeiro, tecnologia como prova.
4. **Cases: NUNCA nome de empresa cliente (mudou em 30/jul)** — etiqueta cada case pela frente de serviço (Treinamento de equipes / Agente de IA / Plataforma sob medida / Automação de processos), nunca pelo nome do cliente. Só **produto próprio** pode ser nomeado (ARROBA CERTA, Aprovi.ai).
5. **Zero emoji** como ícone (site e deck) — só SVG próprio.
6. Privacidade em vídeo de case: preferir mascarar só o dado específico (nome de arquivo, nome de empresa, logo) e não a tela inteira — mas se o dado sensível estiver espalhado/rolando pela tela (não dá pra garantir cobertura 100%), não usar o vídeo até ter uma regravação limpa. Nunca subir vídeo com nome/CPF/salário de terceiro visível.

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
- **03/ago (parte 2)** — **Site v3 no ar.** Retomada a frente do site (parada em 30/jul com blueprint aprovado mas HTML não escrito). Trocado o vídeo do Sobre pro `hero-v5-final.mp4` (fala contínua + cor corrigida, aprovado em 31/jul); removido o rascunho intermediário `hero-v4-preview.mp4`. Escrita a seção de Cases v3 completa no `index.html`: 4 cases largos alternados esquerda/direita etiquetados por frente de serviço (Hub interno/Plataforma sob medida, Auditor de folha/Agente de IA, ARROBA CERTA e Aprovi.ai/Produto próprio), com os vídeos já mascarados da sessão de 30/jul; + 3 cases compactos no grid existente (Treinamento, Relatório Meta Ads, Atendente de IA genérico). Case do Toninho removido do HTML (arquivo continua no repo). Motion reaproveitou o sistema `reveal`/`stagger` já existente (IntersectionObserver, respeita `prefers-reduced-motion`) em vez de importar a lib `motion`, pra manter consistência com o resto do site. Verificado com screenshot headless (1400×7500) antes do deploy — layout, vídeos e posters ok. **Pendente:** número de resultado por case largo (sem dado ainda, ver seção 7).
- **03/ago** — **2º lote de conexões LinkedIn**: mais 9 convites enviados (rotina diária confirmada funcionando) — Thuany Ferreira, Tiago Moura, Selma Foguel, Adriano José, Gabriel Passos, Marina Do Passo Soares Quintas, Newton Neto, Raphael Bezerra, Gabrielle Barros (marketing/growth/mídia paga, Recife e região). Total acumulado: 18 convites em 2 dias. Candidatura da Sherlocker enviada com sucesso em 02/ago à noite.
- **02/ago (parte 4)** — **Candidatura Sherlocker.** Vaga achada em busca de vagas (PJ, 100% remoto, Claude Code é o fluxo de trabalho central deles, processo seletivo pede "link do que você construiu" em vez de anos de experiência — encaixe raro e forte com o perfil da Luh). Rascunho de candidatura criado no Gmail dela pra `contato@sherlocker.com.br`, com prova de trabalho: ARROBA CERTA (link certo e vigente: `https://lucianapandolfo9-spec.github.io/arroba-certa/` — **ainda sem domínio próprio, pendente comprar e configurar**, ver nota abaixo), Aprovi.ai, analista de folha da Capitalize (Python+RAG+Supabase), site (`https://www.luhpanda.com.br`) e LinkedIn. Decisão de produto: o ARROBA CERTA exige aprovação manual da Luh pra liberar conta nova (feature de segurança de propósito, não bug) — mantido assim de propósito pra vaga, porque vira gatilho de contato direto (Sherlocker tem que chamar no WhatsApp pra pedir liberação) e reforça a narrativa de builder que pensa em controle de acesso — bom encaixe pra empresa de investigação/segurança. **Nota sobre acesso a sistemas em candidaturas futuras:** Aprovi.ai (tem dado real da cliente Gigi rodando dentro) e o analista de folha da Capitalize (dado real de funcionário de cliente) NÃO podem ser abertos pra terceiros nesse tipo de teste — só ARROBA CERTA é seguro por ter só dado fictício.
- **02/ago (parte 3)** — **Rotinas automáticas criadas** (claude.ai/code/routines): `trig_01H5sbSeGWJseptPw68n5A3n` roda todo dia 9h (Recife) e só produz um texto-lembrete no painel de rotinas pra Luh vir chamar o Claude Code e mandar os convites do dia junto (agente em nuvem não acessa Chrome/LinkedIn — human-in-the-loop de propósito, pra não arriscar banimento de conta como já rolou com PhantomBuster). `trig_01Kujx8wEZLbe6czqeFH2uQC` roda todo dia 8h, busca vagas de IA/Python/RAG/Claude Code (remoto ou Recife) via WebSearch e cria um **rascunho** (não envia) no Gmail dela com a lista — usa o conector Gmail já vinculado à conta claude.ai dela (`452c896c-9dd0-4b70-8ae5-6bac2efb40c2`).
- **02/ago (parte 2)** — **Correção de perfil técnico + crescimento de rede.** A Luh corrigiu um erro de leitura: ela não é "não-programadora" — codifica em **Python**, monta arquiteturas **RAG** conectadas a Supabase em praticamente tudo que constrói (ex: o auditor de folha da Capitalize é Python+RAG+Supabase, não low-code), e também constrói sites em HTML/CSS publicados via GitHub. Currículo corrigido de novo: Perfil Profissional e bullet da Capitalize reescritos pra citar Python/RAG explicitamente; adicionados Python, RAG (Retrieval-Augmented Generation), HTML/CSS e Git/GitHub em Competências Técnicas. **Incidente e correção:** o arquivo editado (`LUCIANA PANDOLFO.docx`) tinha sido parar na Lixeira do Mac — provável confusão entre ele e o arquivo de backup ao abrir no Word (o PDF que a Luh exportou saiu do backup antigo, sem nenhuma das atualizações). Restaurado da Lixeira, PDF antigo renomeado e preservado como "PDF antigo (pre 02-ago)". **Isso muda o quadro de vagas**: as posições de "AI Engineer" (Python/LLM/RAG) que antes pareciam esticão técnico — CI&T, Compass UOL, Natura, Exadel, banco BV, Velozient — na verdade são boas candidaturas agora que o perfil real dela é conhecido. **Rede do LinkedIn**: autorização geral da Luh pra mandar convites ("pode fazer tudo"). Enviados 9 convites de conexão pra perfis de marketing/branding/growth em Recife com boa sobreposição de conexões em comum (Arthur L., Rafael Araujo, Fellipe Maia, marcelo viana, José Balbino, Larissa Lira, Renata Tuccimei, Jecika Barros, Aline Carneiro) — parado em 9 pra não estourar o limite diário seguro (~10-15/dia) e evitar flag de spam do LinkedIn. **Site exposto**: adicionado `luhpanda.com.br` em Dados de Contato do LinkedIn (categoria Portfólio) — antes só estava em Destaques, agora aparece também no card que abre no topo do perfil.
- **02/ago** — **Auditoria de LinkedIn + atualização de currículo.** Diagnóstico do LinkedIn: conteúdo e headline já estavam bons, mas a rede é pequena demais (58 conexões/60 seguidores) pra gerar alcance orgânico — é a causa raiz de "ninguém procurando ainda", não falta de post. Achado crítico: Experiência mostrava a Lume Social Produções como emprego atual em duas entradas duplicadas — removidas a pedido da Luh (empresa nova/pequena, ainda sendo pensada, não vale manter como vínculo aparente no perfil). **Currículo (.docx) atualizado** com dados puxados do banco Notion "Projetos": Aprovi.ai (produto próprio em produção), ROAS 6,03x do robô de relatório de tráfego pago, e os números da auditoria automática de folha da Capitalize (144 e 138 colaboradores, ~95% extração via OCR). Corrigido dado incorreto da Pandoka (currículo tinha "Recife, +575%"; correto é Beach Club em Pipa/RN, +60% de faturamento, vendas dobradas no 2º mês — mesmo dado do Sobre do LinkedIn). PDF final ainda precisa ser reexportado pela Luh (Word/Docs).
- **31/jul** — **Foto do treinamento resolvida**: a Luh reorganizou `Turma IA na Pratica.HEIC` pra `Aulas /Turmas/`, convertida e aprovada em `assets/cases/treinamento-turma.jpg`. **Vídeo de apresentação (Sobre + tráfego pago) roteirizado, gravado pela Luh em 5 takes e montado** (ver seção 6-B completa): 1ª versão tinha 2,5s de silêncio nos cortes de tela (reprovada, "corte amador"); refeita com fala contínua e sistemas entrando por cima da voz — aprovada. Achado de segurança durante a montagem: `aprovi-demo.mp4` expõe o link secreto de aprovação da cliente Gigi (acesso sem senha) — mascarado no vídeo final; **o arquivo original do case ainda expõe o link, pendente mascarar antes de usar nos Cases v3**. A Luh editou a versão dela com música e legenda (2 rounds — 1º tinha "AUTOMATIZAR" quebrado em duas linhas, corrigido no 2º) em `PARA VENDER.mp4`; nós então corrigimos a cor (estava com brancos travados em 198 e saturação baixa, dando aspecto lavado) gerando `PARA VENDER - COR AJUSTADA.mp4`, **aprovada e é a versão final**. Comprimida pro site em `assets/hero-v5-final.mp4` (5,6MB) — falta só trocar no `index.html` e dar push (fica pra segunda). **Decisão de negócio:** ordem da marca agora é site v3 → criativos → **tráfego pago**, com subida de campanha prevista pra semana de 03/ago usando esse vídeo como criativo principal (checklist completo na seção 7).

---
**RETOMAR SEGUNDA-FEIRA POR AQUI:**
1. Trocar `assets/hero.mp4` por `assets/hero-v5-final.mp4` no `index.html` (seção Sobre) → commit → push → conferir no ar.
2. Escrever o HTML/CSS da seção de Cases v3 (copy e assets prontos, seção 6-A) — inclui mascarar o link secreto em `assets/cases/aprovi-demo.mp4` antes de usar.
3. Depois disso, entrar na frente de tráfego pago (checklist na seção 7: BM/conta de anúncios via skill `gestor-trafego`, destino do CTA, público/orçamento, pixel/medição antes de subir campanha).
---
