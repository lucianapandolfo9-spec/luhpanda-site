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
| **Site one-page** | `index.html` neste repo → https://lucianapandolfo9-spec.github.io/luhpanda-site/ | ✅ v2 no ar (reposicionado + motion) |
| **Deck PDF do portfólio** | `portfolio/deck.html` → `portfolio/Luh-Panda-Portfolio.pdf` (14 slides, ~1,7MB) | ✅ v2 pronto; regenerar quando site mudar |
| **Domínio próprio** | www.luhpanda.com.br (Registro.br) | ⏳ não registrado; deck já exibe o domínio como texto |
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
    ├── cases/            # mídias dos cases (mp4 <8MB + posters)
    └── raw/              # material bruto — NO .gitignore, NUNCA commitar
```

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
4. Cases: "Escritório de advocacia" e "Empresa de contabilidade" ficam anônimos; **Capitalize e Lead Performance podem ser nomeados**; ARROBA CERTA é produto próprio.
5. **Zero emoji** como ícone (site e deck) — só SVG próprio.
6. Privacidade: vídeos de case com dado real de cliente levam blur (já aplicado em ADV, Toninho e Capitalize).

## 6. Ordem vigente dos cases (site e deck)

1. Capitalize — Treinamento corporativo de IA (sem mídia; candidato a ganhar foto da equipe)
2. Capitalize — Analista de DP com IA (vídeo)
3. Lead Performance — Hub interno (vídeo; no deck usa frame limpo `lead-performance-deck.png`)
4. ARROBA CERTA — SaaS próprio (vídeo)
5. Agência de marketing — Relatório diário Meta Ads (print, **ROAS 6,03x**)
6. Escritório de advocacia — Atendente de IA (vídeo)
7. Empresa de contabilidade — Robô de atendimento (vídeo)

## 7. Pendências e backlog

**Bloqueado esperando a Luh:**
- [ ] Foto da equipe/treinamento pro case "Treinamento corporativo" (site + deck)
- [ ] Registrar **luhpanda.com.br** no Registro.br → aí: configurar DNS + custom domain no Pages, atualizar og:url/URLs, regenerar PDF final
- [ ] Preencher "Resultado Mensurável" de cada case no Notion (1 número por case)

**Backlog (sem pressa):**
- [ ] Depoimentos de clientes (áudio de WhatsApp vale) → seção de prova social
- [ ] Link do site na bio do Instagram/WhatsApp Business
- [ ] Screenshot do dashboard logado do ARROBA CERTA (melhor que o atual)

## 8. Skills do projeto

| Skill | Pra quê |
|---|---|
| `site-luhpanda` | Fatos DESTE site: URLs, regras de negócio, pipeline de assets, deploy |
| `site-alto-padrao` | Playbook genérico de site premium + motion + deck PDF (reutilizável pra clientes) |
| `ui-ux-pro-max` | Design system, estilos, guidelines UX (usada pela site-alto-padrao) |

## 9. Histórico resumido

- **06/jul** — Recuperação do projeto, plano de execução em 6 etapas, primeiros assets.
- **07/jul (manhã)** — Ícones SVG nas seções Dor/Serviços, vídeos comprimidos, cases com mídia real, preço R$ 500, deploy v1.
- **07/jul (tarde)** — Blur de privacidade, redirects nas páginas legadas, favicon, og:image, ROAS 6,03x.
- **07/jul (noite)** — **Deck PDF v1→v2** (foco IA/treinamento/plataformas, foto profissional, domínio no contato). **Site v2**: reposicionamento completo espelhando o deck + upgrade visual com motion (Inter, blobs, reveal, hover lift, ícone novo de Plataformas). Skills `site-alto-padrao` e este PROJETO.md criados.
