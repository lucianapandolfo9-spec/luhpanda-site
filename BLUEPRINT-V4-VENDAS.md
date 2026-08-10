# Blueprint de Vendas — Site v4 (luhpanda.com.br)
**Versão 2 · reconciliada em 06/ago/2026** — parte do blueprint original da Luh (versão 1), parte decisões desta sessão, parte alinhamento com o que já estava fechado no Notion (`Aulas IA na Prática` → `Precificação e Comercial`).

> Este arquivo **substitui a filosofia de preço do `ESTRATEGIA.md`** (que dizia "só o Diagnóstico tem preço, resto é sob medida"). A partir daqui o site mostra âncora de preço em tudo — Diagnóstico, Sistema, Formação. Objetivo: qualificar por filtro, não só por conversa, porque agora tem tráfego pago vindo.
>
> **Ainda não construído.** Este é o desenho aprovado — a construção do HTML entra depois que a Luh confirmar este documento.

---

## Dois públicos, duas páginas, mesmo domínio e mesma identidade visual

| Página | Público | Produto que vende |
|---|---|---|
| `/` (home) | Dono de empresa / gestor | Diagnóstico R$500 → Sistema a partir de R$4.000 + R$500/mês → **in-company (M1 R$9.600 / M2 R$14.400)** |
| `/formacao` | Profissional que quer aprender | Módulo 1 R$1.600 → Módulo 2 R$3.600 → Aula avulsa |

**Onde mora o in-company:** é produto de *empresa*, então o gancho principal fica na **home** (é lá que o gestor está), com a página `/formacao` levando o detalhe. Não é o CTA principal de nenhuma das duas — é a oferta que aparece pra quem já demonstrou interesse.

Link entre as duas: item discreto no menu ("Formação"), nunca como CTA principal — visitante da home não pode ser distraído por um produto de R$1.600 quando o objetivo dele é R$4.000.

---

## Decisões fechadas nesta sessão (06/ago)

| Decisão | Resposta |
|---|---|
| Preço público da aula avulsa | **Por módulo**: reposição M1 = R$200/h · reposição/avulsa M2 = R$300/h (não é um valor único) |
| Aulas ficam gravadas? | **Sim, todas** — vira argumento de venda ("rever quando quiser") |
| Crédito de R$500 do Diagnóstico em projeto fechado depois | **Mantém a linha** — segundo o próprio raciocínio da Luh, vale mais que os R$500 em conversão |
| Pagamento da formação | **Mercado Pago integrado ao site** (ela já tem conta) + depois do pagamento aprovado, redirecionar pra agenda (aluno escolhe o dia) **e** deixar o WhatsApp como opção — os dois caminhos abertos, não só um |
| **Parcelamento (decidido 06/ago)** | **12x sem juros, ela absorve a taxa** — manchete de preço do site vira **"12x de R$ 133"**, não "R$1.600". Vitrine de 3: Pix R$1.440 (10% off) · 12x de R$133,33 · à vista R$1.600. Motivo: turma tem custo marginal ≈ zero, então converter mais aluno vale muito mais que a taxa. **In-company R$14.400 NUNCA no cartão** — é proposta + boleto. Racional completo em `ESTRATEGIA-VENDAS-2026.md` §3 |

---

# PARTE 1 — HOME (ajustes no que já existe)

## Ordem final das seções

1. Hero
2. Seção de dor ("Todo dia isso acontece no seu negócio")
3. **Diagnóstico Estratégico — R$500** ← promovido pra bloco próprio
4. Serviços (4 frentes, agora com âncora de preço)
5. Cases
6. **Depoimentos** ← nova seção
7. Método em 4 passos
8. Sobre a Luh
9. CTA final

## 1. Hero — manter
Título e subtítulo intactos. Único ajuste: texto pré-preenchido do botão de WhatsApp (Parte 3).

## 2. Seção de dor — manter como está.

## 3. Diagnóstico Estratégico — bloco próprio, fundo diferente das outras seções

**Título:** "Não sabe por onde começar? Começa por aqui."

**Corpo:** "Eu mapeio sua operação, encontro onde está vazando tempo e dinheiro, e te entrego um plano priorizado do que automatizar primeiro — com método próprio de 6 blocos. Você sai com clareza mesmo que não contrate mais nada depois."

**Bullets:** Diagnóstico completo da operação · Lista priorizada (o que automatizar 1º/2º/3º) · Estimativa de tempo e custo por frente · Entrega em documento, seu pra sempre

**Preço:** R$ 500 · pagamento único · CTA `Quero meu diagnóstico`

**Linha de segurança (mantida):** "Se você fechar um projeto comigo depois, os R$500 entram como crédito."

## 4. Serviços — 4 frentes com âncora de preço

Trocar todos os "Projeto sob medida" por **"A partir de R$ 4.000"** nos 4 cards (Treinamento de IA para equipes · Agentes de IA com seus dados · Plataformas e sistemas sob medida · Automação de processos e atendimento).

**Linha abaixo dos cards:** "Todo projeto inclui manutenção mensal de R$500 — o robô evolui com o negócio e você tem a quem chamar."

*(Nota: esse R$500/mês é o plano de manutenção do sistema do **cliente**. É um produto diferente do "plano de acompanhamento R$600/mês" que existe pro aluno do Módulo 2 manter o sistema dele próprio — não são o mesmo valor por serem coisas diferentes, não precisa unificar.)*

## 5. Cases — manter os 6, com um ajuste

Onde tiver autorização do cliente, trocar a etiqueta genérica pelo segmento real ("Escritório de contabilidade — Natal/RN") em vez de nome de empresa. **Continua valendo a regra de nunca nomear cliente** (só produto próprio nomeado) — segmento real não é nome de empresa, então não conflita com a regra existente do `PROJETO.md`.

## 6. Depoimentos — nova seção, entre Cases e Método

**Título:** "O que dizem quem já passou por aqui."

**Formato (ordem de preferência):** 1) print de WhatsApp com nome/foto borrados · 2) primeiro nome + inicial + segmento ("Ana C. — contabilidade") · 3) foto de turma com certificados (já existe: `assets/cases/treinamento-turma.jpg`).

**Mínimo:** 3 depoimentos — 2 de aluno, 1 de cliente de automação. **Nunca** texto 100% anônimo formatado — lê como inventado.

### Inventário do que já está na pasta `Depoimentos/`

| Arquivo | Conteúdo | Uso |
|---|---|---|
| `Captura de Tela ...10.46.21.png` ("Priscilla") | "Sim sim, muito. Os meninos fizeram muita coisa legal" — sobre as aulas | ✅ Módulo 1 / formação — **precisa borrar nome e foto antes de subir** |
| `Captura de Tela ...10.47.04.png` ("Keila") | "Tem gente organizando minhas pastas e baixando minhas NFs pra salvar mensalmente" | ✅ Automação de processos / home — **precisa borrar nome e foto** |
| `Captura de Tela ...10.45.35.png` ("Ianca") | "Isso vicia... vai me dar um dia" | ⚠️ **Contexto não confirmado** — não ficou claro se é sobre um produto da Luh (Minhas Economias? conteúdo?) ou é papo pessoal. Perguntar antes de usar. |
| `Analise Folha de Pagamento/...11.06.14.png` + `...11.06.30.png` ("Gabriela") | "As q testei deu certinho" · **"esse acesso posso passar para outras pessoas? Aqui da equipe"** · "tá te ajudando e economizando tempo?" → **"Sim!"** | ✅ **O mais forte do conjunto** — cliente do auditor de folha pedindo pra *expandir o acesso pro time*. Prova de valor que não se forja: cliente querendo espalhar internamente. Usar no case do Auditor de Folha e no lado de sistemas. **Borrar nome + foto.** |
| `VIDEO-2026-08-04-20-18-22.mp4` | Screen recording do Claude Code processando 25 PDFs (extração de RM) num projeto de planilha estrutural | Não é depoimento falado — é **prova de entrega técnica**. Entra melhor como case/demo do que como "depoimento de cliente". **Uso extra decidido em 06/ago:** vira criativo orgânico e de tráfego ("a máquina trabalhando sozinha"), ver `ESTRATEGIA-VENDAS-2026.md` §5 e §6. |

**Pendência:** confirmar contexto do print da Ianca; borrar nome+foto dos 2 prints aprovados antes de publicar (mesma regra de privacidade já aplicada nos vídeos de case).

## 7, 8, 9 — Método, Sobre, CTA final
Mantêm como está. Só ajustar textos pré-preenchidos dos botões (Parte 3).

---

# PARTE 2 — /formacao (página nova)

### Hero
**Título:** "Aprende a operar IA do jeito certo — não do jeito que todo mundo tenta."
**Subtítulo:** "A maioria usa ChatGPT como caixinha de pergunta e resposta. Em 4 aulas você vai operar a plataforma inteira: prompt, conectores, MCP, skills, repositório e projeto homologado."
**CTA:** `Quero a próxima turma`

### Bloco de dor
**Título:** "Você já usa IA. Só não usa nem 10% do que ela faz."
- Faz a mesma pergunta de três jeitos até sair algo aproveitável
- Já ouviu falar de MCP, skill e conector, mas nunca configurou nenhum
- Abre conversa nova toda vez e perde tudo que ensinou pra IA
- Vê gente entregando projeto com IA e não entende como saiu do chat pro resultado
- Sabe que dá pra cobrar por isso, mas não sabe o que exatamente vender

### Módulo 1 — IA na Prática
**Formato:** 4 aulas ao vivo · 2h cada · 8h totais · nível zero · **ficam gravadas**

**Preço (fechado em 06/ago):**

| Formato | Preço | Observação |
|---|---|---|
| **Vaga individual** (turma aberta) | **R$ 1.600/pessoa** · ou 12x de R$ 133 | É esse o preço que vai na manchete do site |
| **In-company** (turma fechada, até 8) | **R$ 9.600** | R$1.200/cabeça — 25% de desconto por volume. CTA de conversa, não de compra |
| Pessoa adicional (9ª a 12ª) | R$ 900 | Teto de 12 |

| # | Tema |
|---|---|
| 1 | Engenharia de prompt |
| 2 | Ajustar a plataforma pro seu jeito |
| 3 | Conectores e MCP |
| 4 | Skills: usar e criar as suas |
| 5 | GitHub — conta e repositório |
| 6 | Homologação de projetos no Notion |
| 7 | Cowork e Code na prática |

**Fechamento:** "Você sai operando a plataforma inteira do jeito certo — não decorando prompt."
**CTA principal:** `Garantir minha vaga — 12x de R$ 133` (paga direto no site, ver Parte 3-B)
**CTA secundário discreto:** `Quero fechar turma pro meu time` → WhatsApp (in-company R$9.600, venda por conversa)

### Módulo 2 — Sistemas com IA
**Status:** vagas abertas · próxima turma [confirmar data com a Luh]
**Formato:** **6 aulas ao vivo · 2h cada · 12h totais** *(corrigido — já estava fechado no Notion desde 26/jul, não é mais "4 a 6 a definir")* · **ficam gravadas**

**O que aprende:**
- GitHub — a ferramenta do M1 não pode morar numa pasta só
- Supabase — banco de dados que não esquece
- Login e RLS — cada cliente só vê o dado dele
- n8n — o sistema passa a agir sozinho
- Pagamento — o sistema passa a faturar
- Segurança e deploy — no ar de verdade

**Preço:**

| Formato | Preço | Observação |
|---|---|---|
| **Particular / 1:1** | **R$ 3.600** | Inclui 2h de suporte pós-curso |
| **Turma fechada in-company (até 8 pessoas)** | **R$ 14.400** | Preço por turma — bom encaixe pro visitante da *home* que quer treinar o time inteiro. Pessoa adicional (9ª+): R$1.200, teto 12 |
| Pacote M1+M2 | R$ 4.700 | Em vez de R$5.200 separado — trava o aluno na trilha completa |

**Pré-requisito:** ter feito o Módulo 1 ou já operar as ferramentas com autonomia.
**CTA:** `Garantir minha vaga — R$ 3.600` · CTA secundário discreto: `Quero treinar minha equipe (in-company)`

**Nota de receita recorrente (do Notion, vale citar no FAQ ou rodapé do módulo):** depois do M2 o aluno tem um sistema em produção. Suporte técnico pós-curso: R$350/h. Plano de acompanhamento mensal a partir de R$600/mês (1h de suporte + revisão de segurança trimestral).

### Aula avulsa
Pra quem já fez os módulos ou quer resolver algo específico.
**Reposição/avulsa Módulo 1: R$ 200/h · Módulo 2: R$ 300/h** · agendamento direto
**CTA:** `Agendar aula avulsa`

### Depoimentos de alunos
Mesma regra da home — aqui pesam mais (compra de curso decide por prova social).

### Quem ensina
Reaproveitar bloco "Sobre" da home + acréscimo: "Não ensino teoria. Ensino o que eu uso todo dia pra construir sistema que está no ar rodando em cliente real." Credenciais: MBA em IA (Exame/Saint Paul) · Certificação TERA · Lead Performance · criadora do ARROBA CERTA.

### FAQ
- **Preciso saber programar?** Não. Nível zero.
- **As aulas ficam gravadas?** ✅ Sim, todas — decidido nesta sessão.
- **Como funciona o pagamento?** Mercado Pago, direto no site (Parte 3-B). [parcelamento — a definir junto da integração]
- **Quantas pessoas por turma?** [definir]
- **E se eu perder uma aula?** [definir — provavelmente coberto pela gravação]

### CTA final
"A próxima turma tem [X] vagas. Me chama e eu te digo se faz sentido pro seu momento."

---

# PARTE 3 — Itens técnicos (fazer antes do tráfego)

## 3-A. Pixel da Meta — PRIORIDADE MÁXIMA
Instalar nas duas páginas antes do primeiro real em anúncio.
Eventos mínimos: `PageView` (todas as páginas) · `Lead` (clique em botão de WhatsApp) · `InitiateCheckout` (CTAs de Módulo 1/2, Diagnóstico e checkout Mercado Pago).

## 3-B. Pagamento + agendamento — Módulo 1 e Módulo 2 (arquitetura nova, decidida nesta sessão)

A Luh quer: clicar no CTA → pagar pelo Mercado Pago **direto no site** → depois de aprovado, cair numa agenda pra escolher o melhor dia **e/ou** ser direcionado ao WhatsApp — os dois caminhos abertos.

**Fluxo desenhado:**
1. Botão do site chama um endpoint que cria uma **preferência de pagamento no Mercado Pago** (Checkout Pro) já com o produto certo (Módulo 1 R$1.600 / Módulo 2 R$3.600) e abre o checkout hospedado do Mercado Pago.
2. Pagamento aprovado → Mercado Pago dispara **webhook** de confirmação.
3. Quem recebe o webhook (n8n) então:
   - manda mensagem de WhatsApp confirmando a compra (Evolution API, já em uso em outros projetos dela) com um link de agendamento; **e**
   - a página de obrigado do site mostra um bloco de **agendamento (Google Calendar "Agendamento"/appointment schedule** — ela já tem Google Calendar MCP conectado, dá pra criar essa página de horários) lado a lado com o botão "prefiro combinar no WhatsApp".

**⚠️ Ponto técnico que trava esse fluxo hoje:** o n8n dela é **local** (`/Users/luhpanda/.n8n/`) — um webhook do Mercado Pago não consegue alcançar `localhost`. Pra automatizar de verdade precisa de uma das duas:
- n8n acessível pela internet (n8n cloud, ou expor o local com túnel fixo tipo Cloudflare Tunnel);
- ou, como MVP mais simples pra sair do papel rápido: usar um **link de pagamento fixo do Mercado Pago** (criado direto no painel dela, sem API) por produto, e a confirmação/agendamento continuam manuais (ela confere o pagamento e manda o link de agenda na mão) até a infra do webhook estar pronta.

**Recomendação:** subir com o MVP (link fixo + confirmação manual) pra não travar o lançamento, e evoluir pro fluxo automático depois — é um workflow n8n dedicado, trabalho de uma sessão à parte quando o layout estiver fechado.

## 3-C. CTAs rastreáveis
Todo botão vai pro mesmo WhatsApp (5584994127476), texto pré-preenchido diferente por origem:

| Botão | Texto pré-preenchido |
|---|---|
| Hero home | `Oi Luh! Vim do site e quero automatizar meu negócio.` |
| Diagnóstico | `Oi Luh! Quero o Diagnóstico Estratégico de R$500.` |
| Card de serviço | `Oi Luh! Vim do site, quero saber sobre [nome da frente].` |
| Case (cada um) | `Oi Luh! Vi o case do [nome do case] e quero algo parecido.` |
| Hero formação | `Oi Luh! Quero saber da próxima turma do Módulo 1.` |
| Módulo 1 (fallback se não pagar no site) | `Oi Luh! Quero garantir minha vaga no Módulo 1 (R$1.600).` |
| Módulo 2 (fallback) | `Oi Luh! Quero garantir minha vaga no Módulo 2 (R$3.600).` |
| In-company | `Oi Luh! Quero treinar minha equipe — Módulo 2 in-company.` |
| Aula avulsa | `Oi Luh! Quero agendar uma aula avulsa.` |

## 3-D. Captura de contato
Campo de e-mail na página de formação ligado à lista de espera / newsletter — contato mais barato pra quando abrir turma nova.

---

# PARTE 4 — Ordem de execução

**Bloco 1 — resolve rápido, alto impacto**
1. Trocar "Projeto sob medida" → "A partir de R$4.000" nos 4 cards
2. Promover Diagnóstico R$500 pra bloco próprio
3. Trocar textos pré-preenchidos de todos os botões

**Bloco 2 — página nova**
4. Construir `/formacao` completa (com Módulo 2 corrigido: 6 aulas/12h + opção in-company)
5. Adicionar "Formação" no menu da home

**Bloco 3 — prova e medição**
6. Confirmar contexto do print da Ianca; borrar nome+foto dos 2 prints aprovados (Priscilla, Keila); subir os 3 (ou 2) depoimentos
7. Instalar Pixel da Meta nas duas páginas
8. Campo de captura na lista de espera do Módulo 2

**Bloco 4 — pagamento (paralelo, pode entrar como MVP simples primeiro)**
9. MVP: link de pagamento fixo do Mercado Pago por produto + confirmação manual
10. v2: webhook n8n automático (preference dinâmica + WhatsApp + agenda) — precisa n8n público

**Bloco 5 — só depois de tudo acima**
11. Tráfego pago, campanhas separadas: home (empresa) × formação (profissional)

---

## Pendências que só a Luh decide

- Tamanho da turma (Módulo 1 e 2)
- Política de falta/reposição além da gravação
- Data da próxima turma do Módulo 1 (pro FAQ/CTA final)
- Parcelamento no Mercado Pago (quantas vezes, com ou sem juros)
- n8n público ou MVP com link fixo pra começar
- Contexto do depoimento da Ianca
