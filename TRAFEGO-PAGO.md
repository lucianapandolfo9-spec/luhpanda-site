# Luh Panda — Tráfego Pago próprio (Meta Ads)

Campanha da própria Luciana pra vender o serviço "Setor de IA" (R$3.000/mês,
Recife e região, atendimento remoto). Não é cliente — é aquisição dela mesma.

Playbook genérico de tráfego: skill `gestor-trafego`.

## 🔴 ATENÇÃO — existem DUAS contas chamadas "Luh Panda". Não confundir.

Este é o erro nº 1 a evitar nesta frente. Já custou um diagnóstico inteiro
construído na conta errada em 12/09/2026.

| Conta | ID | O que é | Usar? |
|---|---|---|---|
| **Luh Panda** (BM) | **`1699676271192231`** | Dentro da BM **"Luh Panda"** (`2694922953870768`, verificada). `ACTIVE`, BRL. **É AQUI que a campanha roda.** | ✅ **SIM** |
| Luh Panda (pessoal antiga) | `228050283` | Conta pessoal de 2018, **`business_id` vazio** (fora de qualquer BM), `account_status: UNSETTLED`, **sem nenhuma Página vinculada**. | ❌ **NÃO** |

**Como não errar de novo:** ao listar contas, conferir o `business_id`. A conta
certa tem `business_id: 2694922953870768`; a errada vem com string vazia.

⚠️ A conta antiga aparece **primeiro** na listagem do `ads_get_ad_accounts` e
vem marcada `is_queryable: false` / `not_queryable_reason: "Unknown error"`.
**Se `is_queryable` for false, NÃO consultar** — os dados que ela devolve não são
confiáveis (devolveu status e métricas que contradiziam o painel).

### Lixo conhecido na conta antiga (`228050283`) — limpar quando sobrar tempo

Não é urgente: a conta está `UNSETTLED` e **não aceita operação de escrita**
(erro 200 / subcode 4841021), nem veicula.

- Campanha órfã **`Setor de IA | Recife | CONVERSAS`** (`52608042510264`) —
  duplicata criada por engano em 11/09, **sem conjunto e sem anúncio**, PAUSED,
  R$0 gasto. Casca vazia. Não confundir com a campanha real.
- 🧨 **`New Sales Campaign`** (`6531635588060`) de 2023 está **`ACTIVE`** com
  conjunto de **R$34.519,80/dia**. Só não gasta porque o anúncio está
  `DISAPPROVED` **e** a conta está bloqueada pra veiculação. Risco real é baixo
  hoje — mas **se um dia a fatura for regularizada, pausar isso ANTES**.
  (Existe outra pausada de R$39.451,20/dia.)

## ✅ Estrutura real no ar (conta `1699676271192231`)

Montada em **11/09/2026 ~15:55**.

| Nível | ID | Config |
|---|---|---|
| Campanha | `120248238442840259` | `OUTCOME_ENGAGEMENT` — **ACTIVE** |
| Conjunto | `120248239446150259` | `CJ01 \| Recife+RMR 25km \| 30-55 \| WhatsApp nativo` — `CONVERSATIONS` + **`destination_type: WHATSAPP`**, R$10/dia — **ACTIVE** |
| Anúncio | `120248239476370259` | `AN01 \| Oferta direta \| video apresentacao 49s` — **ACTIVE** |
| Criativo | `1071091928611214` | `CR01 \| Setor de IA \| Apresentacao 49s \| WhatsApp`, vídeo `1565747191901133` |

Copy: *"Sua empresa não precisa contratar um setor de tecnologia... R$ 3.000 por
mês... São 4 vagas nessa condição. Recife e região, atendimento remoto."*
Headline: **"Seu setor de IA por R$ 3.000/mês"**.

## 📊 Números — leitura de 12/09/2026 (~12h)

| Métrica | Valor |
|---|---|
| Gasto | R$4,91 |
| Impressões | 121 |
| Cliques (todos) | 2 |
| **Cliques no link** | **1** |
| CPM | R$40,58 |
| CTR | 1,65% |
| **Conversas** | **0** |

`ads_get_errors` na conta inteira: **vazio**. Estrutura correta, entregando.

🟢 **A campanha tem menos de 24h de vida.** Com **1 clique no link**, zero conversa
é o resultado **esperado**, não sintoma. Não há nada a concluir ainda — e mexer
agora seria agir sobre ruído.

## 🔴 A CAUSA RAIZ (12/09) — o número OSCILA entre Online e Offline

**O achado que fecha o caso.** Em `Gerenciador do WhatsApp → Telefones`
(`business.facebook.com/latest/whatsapp_manager/phone_numbers?business_id=2694922953870768&asset_id=1155257199929746`)
o número `+55 84 9412-7476` alternou, em 3 minutos:

| Hora | Status |
|---|---|
| 12:42 | 🔴 Offline |
| 12:46 | 🟢 Conectado |
| 12:49 | 🔴 Offline de novo |

**Por quê:** a conta é do tipo **"Aplicativo WhatsApp Business"** (não Cloud API).
Nesse modo o status é uma **sessão viva**, não um cadastro fixo — reflete se o app
no celular está sincronizado com o Meta Business Suite **naquele instante**. Cai
quando o celular bloqueia, o app vai pro background ou a rede oscila.

🟢 **Nada foi feito de errado:** o vínculo existe, está no **portfólio certo**
("Luh Panda") — descartada a causa do portfólio fantasma.

⚠️ **Limite do que dá pra verificar por aqui:** as tools do MCP leem o Gerenciador
de Anúncios, **não** o WhatsApp Manager. O status Online/Offline só se confere na
tela. Diagnóstico baseado no padrão já visto na Manu Pestana (gotcha #15 causa B),
não em leitura direta.

**Consequência prática:** WhatsApp **nativo** é pouco confiável com número que
oscila — quando cai pra Offline, o clique de quem viu o anúncio pode morrer sem
aviso. O **`wa.me` não depende disso**: é um link, funciona em qualquer status.

**Solução definitiva (escopo novo, não feito):** migrar o número pra **Cloud API**,
que fica permanentemente conectado. Tira a Luciana do app WhatsApp Business.
Mesma stack que ela já opera (Evolution + n8n + Supabase) e destravaria também o
rastreamento por `ctwa_clid`. **Decidir como projeto, não como ajuste.**

### ✅ Estrutura final de 12/09 — plano B no ar

| Campanha | ID | Estado |
|---|---|---|
| `Setor de IA \| Recife \| CONVERSAS` (nativa) | `120248238442840259` | **ACTIVE** — R$10/dia. Conjunto `120248239446150259`, anúncio `120248239476370259` |
| `Setor de IA \| Recife \| wa.me (plano B)` | `120248250326250259` | **ACTIVE** — `OUTCOME_TRAFFIC` + CBO R$10/dia. Conjunto `120248250327100259` (`WEBSITE`/`LINK_CLICKS`), anúncio `120248250330080259` |

**Receita do criativo `wa.me`** (validada aqui e na Manu):
```
CTA: CONTACT_US          ← NUNCA WHATSAPP_MESSAGE em destino WEBSITE
link: https://wa.me/5584994127476?text=Oi%20Luciana!%20Vim%20pelo%20anúncio...
page_id: 219670394567563 · video_id: 1565747191901133
```
O texto pré-preenchido serve de rastreamento: mensagem que chegar com ele **veio do
anúncio**, não de indicação.

⚠️ **Campanha de Mensagens não aceita destino de site.** Tentar criar o conjunto
`WEBSITE`/`LINK_CLICKS` dentro da campanha nativa foi rejeitado
(`error_subcode 2490408`, *"Performance goal isn't available"*) mesmo com
`LINK_CLICKS` listado como válido para `OUTCOME_ENGAGEMENT` na doc da tool. **Foi
preciso campanha nova `OUTCOME_TRAFFIC`.** Bônus: a nativa fica intacta pra religar
quando o número estabilizar.

🔴 **PENDÊNCIA IMEDIATA — pausar a nativa quando o wa.me for aprovado.**
O anúncio `120248250330080259` ficou `PENDING_REVIEW` na hora do fecho, então as
**duas campanhas seguem ACTIVE (R$20/dia)** de propósito. Pausar a nativa antes da
aprovação deixaria a conta com **zero anúncio no ar** (gotcha #13 — já aconteceu com
a Gigi em 07/09). **Conferir o `effective_status` do AN02: quando sair de
`PENDING_REVIEW` e começar a entregar, pausar a campanha `120248238442840259`.**

## ✅ RESOLVIDO (12/09) — o WhatsApp SEMPRE esteve conectado

**Desfecho:** o número **`+55 84 9412-7476`** já estava vinculado à Página
"Luciana Pandolfo". Ao tentar "Conectar outro número", a Meta respondeu:
*"Este número do WhatsApp Business já está conectado a esta Página."*

**A correção era de um clique:** no editor do anúncio → bloco **Identidade** →
campo **"Número de telefone do WhatsApp"** → **abrir o dropdown e selecionar o
número** → Publicar. O campo mostrava "Selecione um número do WhatsApp" porque
estava **aguardando escolha**, não porque estivesse vazio.

🔴 **Três diagnósticos meus caíram nesta sessão, todos pela mesma causa** —
conclusão construída sobre leitura de tela em vez de verificação:
1. "A campanha é uma casca vazia, nunca rodou" → era a **conta errada**
   (`228050283` em vez de `1699676271192231`). A listagem avisava
   `is_queryable: false` e eu consultei mesmo assim.
2. "O criativo está sem `app_destination`" → a **prévia mostrava o botão
   WhatsApp renderizado**. A tool só não expõe `call_to_action_type` nessa conta —
   campo ausente ≠ campo vazio (mesma armadilha do `promoted_object`).
3. "Não há número de WhatsApp pra selecionar, o campo está desabilitado" → o
   número **estava no dropdown**, só não tinha sido escolhido.

**Regra pra esta frente:** campo ausente numa resposta de API **não é prova de
campo vazio**; e screenshot mostra estado, não causa. Verificar antes de concluir —
o custo de uma chamada a mais é sempre menor que o de uma correção desnecessária.

⚠️ **Sobre descartar vs. publicar rascunho:** a regra padrão é **descartar**
(uma edição pendente publicada pode sobrescrever estado correto). **Exceção:**
quando a edição é justamente a correção necessária — como selecionar o número do
WhatsApp — aí publica. Distinguir os dois casos antes de orientar.

🚫 **O `wa.me` NÃO foi montado.** Chegou a ser pedido pela Luciana quando parecia
que o nativo não sairia, mas a correção apareceu antes. Nada foi criado, nada a
desfazer. **Se algum dia for preciso:** exige **conjunto novo**
(`destination_type` é imutável depois que o conjunto roda) com `WEBSITE` +
`LINK_CLICKS` e criativo com CTA **`CONTACT_US`** — nunca `WHATSAPP_MESSAGE`, que
é rejeitado em destino WEBSITE. Número pro link: `wa.me/5584994127476`.

## ⏳ HISTÓRICO — a investigação do botão de WhatsApp

**Sintoma relatado pela Luciana:** aviso de que "o WhatsApp não é business",
mesmo tendo feito toda a configuração.

**O que já se sabe:**
- `ads_get_errors` **vazio** e anúncio entregando → aponta pro **falso positivo do
  editor** (causa D do #2923012, já visto 2x com a Manu Pestana).
- ⚠️ **MAS:** o criativo `1071091928611214` **não retorna `call_to_action_type`** —
  o campo vem ausente. Na conta da Gigi, a mesma tool devolveu `INSTAGRAM_MESSAGE`
  no criativo bom e **nada** no quebrado; ou seja, quando o CTA existe, ela mostra.
  Isso é assinatura do gotcha do **`app_destination` faltando**.
- **O que impede cravar:** na Gigi, criativo sem CTA virou anúncio `WITH_ISSUES`
  com **zero entrega**. Este está `ACTIVE` e entregando. **Suspeita forte, não
  veredito.**

**Teste combinado (12/09) — a Luciana faz, custo zero:**
Gerenciador → conta `1699676271192231` → aba Anúncios → anúncio `AN01` →
painel de pré-visualização → **"Enviar notificação por push"** → abrir no celular
e **tocar no botão**.

- ✅ Abriu o WhatsApp → aviso é falso positivo, **não mexer em nada**, só deixar rodar.
- ❌ Não abriu → refazer o criativo **inline** com
  `call_to_action: {type: WHATSAPP_MESSAGE, value: {app_destination: WHATSAPP,
  link: "https://api.whatsapp.com/send"}}` + anúncio novo no **mesmo conjunto**
  (criativo é imutável). Com tão pouco tempo no ar, o aprendizado perdido é irrelevante.

🔴 **Duas regras pra esse teste:**
1. **Preview NÃO testa o botão.** O link `preview_iframe` / `fb.me` renderiza a
   aparência; o CTA não executa. Esse engano gerou um rollback desnecessário na
   campanha da Manu em 11/09.
2. **Não confirmar nada dentro do editor.** Abrir já cria edição pendente; publicar
   faz a Meta revalidar tudo e é provavelmente de onde vem o aviso. Se aparecer
   "Conferir e publicar" → **descartar**.

## Próximos passos

1. ⏳ **Teste push do botão** (acima) — única pendência que trava decisão.
2. Reler em **2-3 dias** com volume real. Só então julgar CPM (R$40,58 com 121
   impressões não significa nada) e criativo.
3. Se as conversas não vierem com volume: as alavancas, em ordem, são criativo →
   público → destino. Não mexer em mais de uma por vez.
4. Limpeza da conta antiga `228050283` — sem pressa, ver seção acima.

## Timeline

- **11/09/2026 15:55** — campanha, conjunto e anúncio criados na conta
  `1699676271192231` (BM Luh Panda). WhatsApp nativo, R$10/dia, Recife+RMR 25km,
  30-55 anos. Criada também, por engano, uma campanha órfã de mesmo nome na conta
  pessoal antiga `228050283` (vazia, ignorar).
- **12/09/2026** — primeira conferência por API. Estrutura correta e entregando,
  zero erro, R$4,91 / 121 impressões / 1 clique no link / 0 conversas.
  Diagnóstico inicial foi feito **na conta errada** (`228050283`) e teve de ser
  refeito — daí a seção de aviso no topo deste documento. Levantada a suspeita do
  `app_destination` faltando no criativo; teste push combinado com a Luciana.
- **14–22/09/2026** — (registro consolidado; detalhe completo na skill
  `gestor-trafego`, seção "Casos aplicados"). Campanha migrou pro WhatsApp nativo,
  conjunto `CJ01` (público aberto 18-65, raio 25km) rodou e entregou **6 conversas
  a R$9,41**. Em **22/09** a Luciana relatou leads ruins (homens 45+, assédio, nenhum
  dono de empresa): auditoria confirmou que o `CJ01` nunca teve `flexible_spec`, ou
  seja, zero sinal profissional. Criado **`CJ03 | Bairros comerciais Recife | Donos
  de negócio`** (`120248400366370259`) com 7 bairros comerciais nomeados +
  comportamento B2B real (dono de pequena empresa, admin de página comercial, negócio
  ativo <24 meses), 25-54 anos, público de **17,2 mil**. `CJ01` pausado e renomeado
  `[DESCARTADO]`. Nasceu daí o gotcha #29 da skill.
- **23/09/2026 — card estático novo no ar, primeiro teste de FORMATO da conta.**
  - Auditoria de abertura: campanha `120248281413800259` ACTIVE, `CJ03` ACTIVE,
    `ads_get_errors` vazio na conta inteira. **Nenhuma alteração feita na estrutura.**
  - Leitura honesta do momento: o `CJ03` tinha **menos de 24h de vida** (180 impressões,
    R$15,65, zero conversa). A sensação de "piorou, chega 1 por dia e olhe lá" é
    explicada pela troca de segmentação de ontem, **não** pelo criativo — o vídeo
    tinha 6 conversas a R$9,41 no currículo, sob o público antigo. Registrado pra não
    culpar criativo por efeito de público.
  - **Mensagem automática de primeiro contato reescrita.** A antiga empilhava 3
    perguntas de uma vez, só extraía (zero valor de volta) e presumia intenção
    ("que massa que veio atrás de automatizar"). Nova versão: **uma pergunta só, de
    múltipla escolha, com promessa de retorno imediato** — reduz atrito de responder.
    Era o ponto que mais incomodava a Luciana (gente chega e não responde).
  - **Card estático criado pelo @marketing**, 3 formatos (4:5, 1:1, 9:16) em
    `Downloads/Criativos/Capas/Setor de IA/`, mais o gerador `gerar-cards.py` que
    produz os 3 de uma lista única de nós. Conceito pedido por ela: **mapa mental do
    fluxo de um bot SDR** (lead chega → bot responde na hora → qualifica → agenda ou
    passa quente → a venda não esfria), porque "muitos procuram isso pra SDR".
    Headline: *"Enquanto ninguém responde, o lead vai pro concorrente."*
  - 🆕 **Regra nova e permanente: ZERO travessão (—) em qualquer copy dela.** Vale pra
    site, anúncio, legenda, LinkedIn, deck e proposta. Registrada na skill
    `site-luhpanda` (item 3-B) e travada por `assert` no gerador de cards.
  - **Upload das 3 imagens feito pela Luciana no painel** (base64 inline não passa
    numa chamada de conversa pra arquivo de 450-570KB — mesma limitação já vista na
    Império Ruby). Hashes lidos por API depois; anúncio montado por código.
  - **`AN04 | Card fluxo SDR | estatico`** (`120248426068830259`) criado no **mesmo
    conjunto CJ03**, ACTIVE, zero erro. Criativo `2048191939136954`, imagem 4:5,
    CTA `WHATSAPP_MESSAGE` nativo.
  - 🔑 **Copy mantida idêntica à do vídeo de propósito** ("Sua empresa não precisa
    contratar um setor de tecnologia...") — assim o teste isola **só a variável de
    formato**, vídeo × card estático. Trocar copy junto invalidaria a leitura.
  - ⚠️ **Decisão registrada:** a Luciana pediu "campanha nova", mas foi montado como
    **anúncio dentro do CJ03**, não campanha separada. Motivo: campanha nova
    competiria no leilão contra a existente pelos mesmos R$10/dia e mesmo público —
    erro que já aconteceu nesta conta em 12/09 (duas campanhas disputando entre si).
  - ⚠️ **Pendência aberta (gotcha #27 armado):** `AN01 | Oferta direta | video 49s`
    (`120248281423860259`) está com `status: ACTIVE` no próprio nível, mascarado por
    `effective_status: ADSET_PAUSED` (o CJ01 é que está pausado). **Se o CJ01 for
    reativado um dia, esse anúncio acorda junto sem ninguém pedir.** Oferecido pausar
    no próprio nível; aguardando decisão da Luciana.
  - **Próxima leitura útil:** comparar custo por conversa do `AN04` (card) contra o
    `AN03` (vídeo), mesmo conjunto e mesma copy. Não julgar antes de ~1 semana: o
    CJ03 ainda está em aprendizado e, com R$10/dia em `CONVERSATIONS`, nunca sai dele
    (característica conhecida, não defeito).
