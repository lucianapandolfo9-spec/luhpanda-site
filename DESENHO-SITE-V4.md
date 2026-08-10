# Desenho do Site v4 — luhpanda.com.br
**06/ago/2026 · documento de desenho, nada implementado ainda**

> Ordem decidida pela Luh: **site primeiro** (é a maior fonte de apresentação dela), depois a oferta pras empresas de auditoria de folha.

---

## PARTE 0 — Três coisas pra resolver antes de desenhar

### 0.1 Os "emojis" — preciso que você me aponte quais

Fui procurar no `index.html` e **o site já não tem emoji nenhum**. Rodei a busca: existe exatamente **um** caractere decorativo, o `✦` (estrelinha de quatro pontas). O resto são **11 SVGs desenhados à mão**, em linha fina, dentro dos badges circulares — foi a substituição que a gente fez em 03/ago, quando você reprovou os ícones antigos ("brega", estilo sticker).

Então uma de três coisas está acontecendo:

| Hipótese | O que fazer |
|---|---|
| **a)** É o `✦` que te incomoda | Tiro, 1 minuto |
| **b)** Os ícones de linha ainda te parecem "iconezinho" | Mudança de direção: trocar ícone por **imagem real** (ver 0.2) |
| **c)** Você está vendo os emojis do **Notion** (🧠 💰 🎓 📋) | São das páginas do Notion, não do site — posso limpar lá |

**Meu palpite é (b)** — e se for, eu concordo com você. Explico embaixo.

### 0.2 O que realmente deixa um site desses "premium" (e não é ícone)

Você disse que quer "imagens mais animadas e melhores". Duas correções técnicas, e uma boa notícia:

**Correção 1 — o Motion não busca imagem.** A conexão do Motion que você tem gera **vídeo do zero** a partir de um briefing. Não é um banco de imagens animadas.

**Correção 2 — você não precisa disso.** Site de consultoria de IA que converte não usa ilustração genérica nem stock 3D. Usa **o produto real funcionando**. E você já tem o acervo que a maioria dos concorrentes não tem:

- 4 vídeos de sistemas reais mascarados (hub interno, auditor de folha, ARROBA CERTA, Aprovi.ai)
- vídeo de apresentação com correção de cor (48s)
- vídeo da academia com o relatório por cima (37s)
- vídeo do SEBRAE sendo preenchido pela IA (83s)
- foto da turma com certificados
- 3 depoimentos de WhatsApp

**A direção de arte proposta:** menos ícone, mais tela de verdade. Onde hoje tem um badge com SVG, entra ou um **frame do sistema rodando** ou nada (respiro). Ícone sobra só onde não existe imagem possível — e mesmo aí, bem discreto, não como protagonista.

Isso resolve o incômodo de "iconezinho" sem inventar ilustração, e é o que os sites bons desse nicho fazem.

### 0.3 A decisão de stack — isso define se dá pra usar template

Você pediu ajuda pra entender a plataforma e puxar templates melhores. Fui olhar o catálogo do **21st.dev** (a plataforma de componentes que está conectada aqui). Achei coisas boas e relevantes: *Dark Gradient Pricing*, *Dynamic Animated Hero with Gradient*, *Hero Animated*, *Pricing Cards*.

**O problema:** todos instalam assim → `npx shadcn@latest add ...`. São componentes **React + Tailwind + shadcn**. Seu site é **HTML/CSS/JS puro**. Eles não encaixam do jeito que estão.

Duas saídas:

| | **A) Continuar em HTML puro** *(recomendo)* | **B) Migrar pra React/Next** |
|---|---|---|
| Template do 21st.dev | Só como **referência visual** — eu reconstruo o padrão em CSS | Instala direto |
| Tempo | Dias | Semanas (rebuild) |
| Deploy | GitHub Pages como já é | GitHub Pages com export estático (funciona, mas muda o fluxo) |
| Manutenção | Você mexe num arquivo | Precisa de Node, build, dependências |
| Risco | Baixo — o site já funciona | Alto — recomeçar o que já está bom |

**Recomendação: A.** Seu site tem 2 páginas. Sistema de componentes existe pra resolver repetição em escala — você não tem esse problema. E migrar queima justamente a semana que você quer usar pra vender pras empresas de folha.

Eu consigo reproduzir qualquer padrão visual desses templates em CSS puro — o que você perde é o `npm install`, não o resultado.

*(Se um dia você quiser um produto com login, painel e várias telas — aí sim, React. Pra site de apresentação, não.)*

---

## PARTE 1 — O que os melhores do nicho fazem

A pesquisa retornou muita lista de agência e pouco design de verdade, mas o padrão dos que se destacam (Nebula, Landio e os templates dark de geração de lead) é consistente:

| Padrão | O que é | Você já tem? |
|---|---|---|
| **Prova acima da dobra** | Logo de cliente, número ou vídeo do produto **antes** do primeiro scroll | ⬜ Hoje seu hero é só texto + CTA |
| **Produto real, não ilustração** | Screenshot/vídeo de tela em vez de arte genérica | ✅ acervo pronto, mal usado |
| **Preço visível** | Filtra lead ruim antes da conversa | ⬜ é a mudança da v4 |
| **Uma ação por tela** | Um CTA dominante por seção, nunca três | ⚠️ parcial |
| **Movimento discreto** | Reveal no scroll, gradiente lento. Nada de carrossel automático | ✅ já tem |
| **Depoimento com cara de real** | Print de conversa > texto formatado | ⬜ chega agora |
| **Dark + 1 acento só** | Fundo escuro, uma cor de destaque | ✅ roxo/laranja já definidos |

O que te falta não é técnica de design. É **prova aparecendo cedo** e **preço na mesa**.

---

## PARTE 2 — HOME, seção por seção

```
┌─────────────────────────────────────────────┐
│ NAV   Luh Panda    Serviços Cases Formação  │  ← "Formação" entra aqui, discreto
├─────────────────────────────────────────────┤
│                                             │
│  HERO                                       │
│  IA trabalhando de verdade                  │
│  dentro do seu negócio                      │
│  [subtítulo atual, manter]                  │
│                                             │
│  [Quero automatizar meu negócio]            │  ← CTA único
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │  VÍDEO/FRAME DE SISTEMA REAL RODANDO  │  │  ← NOVO: prova acima da dobra
│  └───────────────────────────────────────┘  │
│  strip de tecnologias                       │
├─────────────────────────────────────────────┤
│  DOR — "Todo dia isso acontece"             │
│  4 cards · ícone de linha discreto          │  ← aqui ícone pode ficar
├─────────────────────────────────────────────┤
│  ★ DIAGNÓSTICO R$ 500        [fundo         │  ← promovido, bloco próprio
│    Não sabe por onde começar?  destacado]   │
│    · mapeamento completo                    │
│    · lista priorizada                       │
│    · estimativa de tempo e custo            │
│    · documento seu pra sempre               │
│    R$ 500 · pagamento único                 │
│    [Quero meu diagnóstico]                  │
│    ↳ vira crédito se fechar projeto depois  │
├─────────────────────────────────────────────┤
│  SERVIÇOS — 4 frentes                       │
│  cada card: "A partir de R$ 4.000"          │  ← âncora nova
│  ↳ todo projeto inclui manutenção R$500/mês │
├─────────────────────────────────────────────┤
│  CASES — 4 largos + 3 compactos             │  ← manter v3, já está bom
├─────────────────────────────────────────────┤
│  DEPOIMENTOS ← NOVO                          │
│  3 prints de WhatsApp (nome/foto borrados)  │
├─────────────────────────────────────────────┤
│  TREINE SEU TIME ← NOVO (in-company)         │  ← gancho na home, não na /formacao
│  [ver Parte 4 — bloco de preço]             │
├─────────────────────────────────────────────┤
│  MÉTODO · SOBRE · CTA FINAL                 │  ← manter
└─────────────────────────────────────────────┘
```

**As 4 mudanças reais da home:**
1. Vídeo/frame de sistema real no hero (prova antes do scroll)
2. Diagnóstico vira bloco próprio com fundo destacado
3. Âncora "A partir de R$ 4.000" nos 4 cards
4. Duas seções novas: Depoimentos e In-company

---

## PARTE 3 — /formacao, seção por seção

```
┌─────────────────────────────────────────────┐
│  HERO                                       │
│  Aprende a operar IA do jeito certo —       │
│  não do jeito que todo mundo tenta          │
│  [Quero a próxima turma]                    │
├─────────────────────────────────────────────┤
│  DOR — "Você já usa IA.                     │
│  Só não usa nem 10% do que ela faz."        │
│  5 bullets de reconhecimento                │
├─────────────────────────────────────────────┤
│  ★ MÓDULO 1 — IA na Prática                 │
│    4 aulas ao vivo · 2h cada · 8h           │
│    nível zero · fica gravado                │
│    [7 temas em lista]                       │
│                                             │
│    ┌─── 12x de R$ 133 ───┐  ← MANCHETE      │
│    │  ou R$ 1.440 no Pix │                  │
│    │  (à vista R$ 1.600) │                  │
│    └─────────────────────┘                  │
│    [Garantir minha vaga]                    │
│    ↳ Quero fechar turma pro meu time        │  ← link discreto pro in-company
├─────────────────────────────────────────────┤
│  MÓDULO 2 — Sistemas com IA                 │
│  6 aulas · 2h cada · 12h · fica gravado     │
│  12x de R$ 300  (Pix R$ 3.240)              │
│  pré-requisito: M1 ou autonomia             │
├─────────────────────────────────────────────┤
│  IN-COMPANY — bloco de preço (Parte 4)      │
├─────────────────────────────────────────────┤
│  AULA AVULSA                                │
│  Reposição M1: R$ 200/h                     │
│  Avulsa M2: R$ 300/h                        │
├─────────────────────────────────────────────┤
│  DEPOIMENTOS DE ALUNO  ·  QUEM ENSINA       │
│  FAQ  ·  CAPTURA DE E-MAIL  ·  CTA FINAL    │
└─────────────────────────────────────────────┘
```

---

## PARTE 4 — O bloco de in-company (pedido específico da Luh)

> *"tem q deixar explicado q 9600 eh a partir de tantas pessoas e quanto fica pra cada um"*

O erro que quase todo site comete é jogar "R$9.600" na tela sem contexto — o gestor lê como caro. Mostrando a conta, ele lê como **barato por cabeça**. Proposta de bloco:

```
┌──────────────────────────────────────────────────────┐
│  TREINE SEU TIME INTEIRO                             │
│                                                      │
│  Treinar uma pessoa não muda a empresa.              │
│  Muda a pessoa.                                      │
│                                                      │
│  Turma fechada, só o seu time na sala, com os        │
│  problemas reais de vocês em cima da mesa.           │
│                                                      │
│  ┌────────────────────┬────────────────────┐         │
│  │  MÓDULO 1          │  MÓDULO 2          │         │
│  │  Usar IA do        │  Construir sistema │         │
│  │  jeito certo       │  e colocar no ar   │         │
│  │                    │                    │         │
│  │  4 aulas · 8h      │  6 aulas · 12h     │         │
│  │                    │                    │         │
│  │  R$ 9.600          │  R$ 14.400         │         │
│  │  até 8 pessoas     │  até 8 pessoas     │         │
│  │                    │                    │         │
│  │  ➜ R$ 1.200        │  ➜ R$ 1.800        │         │
│  │    por pessoa      │    por pessoa      │         │
│  │                    │                    │         │
│  │  9ª pessoa em      │  9ª pessoa em      │         │
│  │  diante: R$ 900    │  diante: R$ 1.200  │         │
│  │  (teto: 12)        │  (teto: 12)        │         │
│  └────────────────────┴────────────────────┘         │
│                                                      │
│  Comparação honesta: 8 vagas individuais do          │
│  Módulo 1 sairiam por R$ 12.800.                     │
│  Fechando a turma: R$ 9.600.                         │
│                                                      │
│  As aulas ficam gravadas pro time rever.             │
│                                                      │
│  [Quero treinar minha equipe]  → WhatsApp            │
│                                                      │
│  Pagamento por proposta e nota fiscal —              │
│  não é compra de cartão.                             │
└──────────────────────────────────────────────────────┘
```

**Por que essa estrutura:**
- O **preço por pessoa em destaque** (R$1.200) é o número que o gestor compara mentalmente com curso de mercado — e ganha fácil
- A **comparação explícita** (R$12.800 → R$9.600) mostra a economia sem você precisar dizer "desconto"
- O **teto de 12** protege a qualidade da aula e cria escassez real, não inventada
- **CTA de conversa, não de compra** — R$9.600 no cartão queimaria ~R$1.600 em taxa e passa recado errado

---

## PARTE 5 — Organização de arquivos (a "separação de tudo")

### 5.1 A verdade sobre o seu disco

Você pediu pra parar de salvar skills no PC porque o computador está lotando. **Medi, e as skills não são o problema:**

| O quê | Tamanho |
|---|---|
| **Todas as skills juntas** | **8,5 MB** |
| Downloads/Luh Panda | **9,6 GB** |
| Downloads/Criativos | **2,9 GB** |
| Livre no disco | 7,7 GB |

As skills são **0,07%** do que está no Downloads. Movê-las pro Drive não libera nada — e tem um detalhe técnico: **o Claude Code só carrega skill de `~/.claude/skills/`**. Skill no Drive não roda. Ela precisa estar local pra funcionar.

### 5.2 Onde o espaço está de verdade

| Pasta | Tamanho | O que fazer |
|---|---|---|
| `Luh Panda/Clientes` | 5,6 GB | Contém **cache de build** regenerável: `Lead Performance/plataforma-onboarding/.next/dev/cache/` tem 436 MB só nos 2 maiores arquivos. **Lixo puro, apaga sem dó** |
| `Luh Panda/Gravacoes` | 2,4 GB | Vídeos musicais da Josy (4 arquivos de ~240 MB). **Candidatos a Drive** |
| `Criativos/Minhas Economias` | 1,7 GB | Um único `IMG_1388.MOV` de **840 MB** + outro de 273 MB. **Comprimir ou mandar pro Drive** |
| `Luh Panda/Referencias-Site` | 853 MB | Repos clonados, incluindo 254 MB de histórico git do `motion`. **Re-clonáveis, pode apagar** |
| `luhpanda-site/assets/raw` | 164 MB+ | Material bruto, já está no .gitignore. **Drive** |

**Ganho rápido e seguro (~1,5 GB): apagar o cache `.next` e os repos de referência.** Nenhum dos dois é conteúdo — os dois se regeneram.

### 5.3 O que vai pro Drive

Regra: **arquivo grande e "morto" vai pro Drive; arquivo de trabalho fica local.**

```
Drive/Luh Panda/
├── Gravacoes/          ← vídeos musicais (Josy, etc)
├── Brutos/             ← .MOV originais de 4K
└── Arquivo Clientes/   ← entregas encerradas

Local (fica):
├── ~/.claude/skills/   ← 8,5 MB, PRECISA ser local pra rodar
├── luhpanda-site/      ← repo ativo
└── Criativos/          ← só o que está em produção agora
```

### 5.4 Homologação no Notion

Você pediu pra homologar o projeto no Notion. A estrutura já existe e está sendo mantida:

- **`Site & Portfólio Pessoal — luhpanda.com.br`** (banco `Projetos`) — arquivo-mestre da frente de marca
- **`Calendário de Conteúdo — LinkedIn`** — 28 posts, com os pilares Ensino e Oferta adicionados hoje
- **`Aulas IA na Prática`** + `Precificação e Comercial` — preços atualizados hoje

O que falta homologar lá: **o pivô de vendas da v4** (o que foi decidido nesta sessão). Faço quando você aprovar este desenho.

---

## PARTE 6 — O que eu preciso de você pra executar

**Bloqueia o desenho visual:**
- [ ] Qual "emoji" te incomoda — o `✦`, os ícones de linha, ou os do Notion? (Parte 0.1)
- [ ] Confirma stack: HTML puro (recomendado) ou migrar pra React? (Parte 0.3)

**Bloqueia a `/formacao`:**
- [ ] Data da próxima turma do Módulo 1
- [ ] Número de vagas
- [ ] Simulador de parcelamento do Mercado Pago (quanto você recebe em 12x)

**Bloqueia os depoimentos:**
- [ ] Autorização dos 3 clientes pra publicar print, mesmo borrado
- [ ] Contexto do print da Ianca

**Não bloqueia nada, mas é dinheiro parado:**
- [ ] Trocar recebimento do Mercado Pago pra 30 dias (~2 pontos de volta em toda venda)
