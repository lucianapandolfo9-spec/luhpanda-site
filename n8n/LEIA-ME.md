# Skill Assistente de Obra · pagamento, entrega, acesso e medição

Workflow: `skill-obra.workflow.json` (importar no n8n, nasce **inativo**).
Nome no n8n: `Luh Panda · Skill Obra (pagamento, entrega e acesso)`.
Sem segredo neste arquivo: só IDs de credencial já existentes (Sheets, Gmail). O token do
Mercado Pago e o token da Conversions API ficam **só** nas credenciais do n8n.

## Por que é um workflow novo e não um módulo dentro dos de Formação

O plano era pôr o módulo `skill` dentro de `yEIEMrq9B4Mpsou6` (criar pagamento) e
`ufOUlQRF0OrGorNA` (confirmação). Nesta sessão não deu pra ler esses dois workflows (MCP do
n8n indisponível pro subagente, chave da API pública revogada, leitura por SSH bloqueada), e
editar às cegas um fluxo que já cobra de verdade é o risco que o protocolo proíbe.
O resultado é equivalente e mais seguro: a preferência da skill é criada aqui, com a
`notification_url` apontando pra este mesmo workflow. Os workflows de Formação **não mudam**.
Se depois ela quiser tudo num lugar só, uma sessão com o MCP do n8n copia os ramos pra lá.

## Os 3 webhooks

| Webhook | Método | Quem chama | O que faz |
|---|---|---|---|
| `/webhook/skill-criar-pagamento` | POST `{produto:"skill", fbp, fbc, pagina}` | botão da `skill-obra.html` | preço do **Config** (nunca do site), gera token de acesso, cria a preferência no MP, devolve `{checkout_url}` |
| `/webhook/skill-mp-notificacao` | POST | Mercado Pago | busca o pagamento **na API do MP**; se `approved` + `external_reference=skill` + `metadata.produto=skill`: confere duplicata (memória do workflow + planilha), registra na planilha, e-mail ao comprador com o link do kit, aviso pra Luciana, Purchase via CAPI |
| `/webhook/skill-acesso?payment_id=&t=` | GET | `acesso.html` | consulta o pagamento no MP e só devolve `kit_url` se estiver aprovado **e** o token `t` bater com o `metadata.token_acesso` gravado na criação. `payment_id` sozinho não abre nada |

## Antes de publicar (o que só ela faz)

1. Nó **Config**: `KIT_URL` (link da pasta do kit, só leitura) e `PIXEL_ID`. `PRECO` fica 97.
   Sem `KIT_URL` o workflow **não manda e-mail ao comprador**: avisa a Luciana pra entregar na mão,
   e a `acesso.html` mostra "falha ao conferir" em vez de link quebrado.
2. Credencial **Mercado Pago Luh Panda** nos 3 nós do MP (Criar preferência, Buscar pagamento,
   Consultar pagamento). A API do n8n não liga credencial genérica: é 1 clique por nó na tela.
3. Credencial nova **Meta CAPI Luh Panda**, tipo *Query Auth*: Name `access_token`, Value = o token.
   Ligar no nó **CAPI Purchase**. Sem `PIXEL_ID` o nó nem roda.
4. Nos 2 nós de Sheets, conferir a **aba** (deixei a primeira, `gid=0`) e se os cabeçalhos batem:
   Data, Hora, Módulo, Nome, E-mail, Telefone, Valor, Forma, ID Pagamento Mercado Pago, Status.
5. Publicar só com o OK dela. Depois de publicar, `activeVersionId` tem que ser igual a `versionId`.

## Meta: o que criar no Gerenciador de Eventos

1. business.facebook.com → **Gerenciador de Eventos** → **Conectar fontes de dados** → **Web** →
   nome `Luh Panda site` → **Criar**. Fica na BM **dela** (o site é dela).
2. O número que aparece é o **ID do conjunto de dados (pixel)**. Vai em dois lugares:
   `assets/js/site.js` (`PIXEL_ID`) e nó Config do n8n (`PIXEL_ID`). Não é segredo.
3. No pixel → **Configurações** → **Conversions API** → **Gerar token de acesso**.
   Esse token **é segredo**: vai só na credencial `Meta CAPI Luh Panda` do n8n. Nunca no site, no
   vault, no Git ou no chat.
4. **Configurações** → **Domínios / Verificação de domínio** → adicionar `luhpanda.com.br` (meta-tag
   ou TXT no DNS da HostGator).
5. Opcional pro teste: aba **Eventos de teste** → copiar o código `TEST...` → colar em
   `CAPI_TEST_CODE` no Config durante o teste, e **apagar depois**.

Eventos que saem:

| Evento | De onde | Quando |
|---|---|---|
| PageView | navegador | toda página |
| ViewContent | navegador | páginas de oferta (bot, skill com valor 97, formação, automação) |
| InitiateCheckout | navegador | clique em comprar a skill (a formação particular agora é pedido no WhatsApp, sem checkout) |
| Lead e Contact | navegador | todo clique que abre o WhatsApp (com valor quando é pedido da formação particular) |
| Purchase (com valor) | **servidor (CAPI)** | pagamento aprovado da skill, `event_id = mp_<id do pagamento>` |

O Purchase sai **só** pelo servidor, então não há duplicação com o navegador. E-mail, telefone,
nome e ID do pagador vão com SHA-256; `fbp`/`fbc`/IP/navegador vêm da hora do clique em comprar,
guardados no `metadata` da preferência.

## Teste ponta a ponta com R$ 1 (antes do lançamento)

Preparação
- [ ] Workflow importado, credenciais ligadas, `KIT_URL` preenchido
- [ ] `PRECO: 1` no Config · `CAPI_TEST_CODE` preenchido (se quiser ver no painel de teste)
- [ ] Branch publicada no site (ou página servida de outro domínio liberado no CORS)
- [ ] Workflow publicado (só com o OK dela)

Compra
- [ ] Abrir `skill-obra.html` no celular, com o pixel ligado: no Gerenciador de Eventos aparecem
      PageView e ViewContent
- [ ] Botão de compra começa **travado** até marcar a caixa dos pré-requisitos
- [ ] Clicar: InitiateCheckout aparece, abre o checkout do MP com **R$ 1,00**
- [ ] Pagar com Pix de uma conta que **não** é a do vendedor (o MP recusa pagar a si mesmo)

Depois do pagamento
- [ ] Volta pra `obrigado.html?produto=skill...` e redireciona pra `acesso.html`
- [ ] `acesso.html` mostra "Seu kit está liberado" e o botão abre a pasta certa do Drive
- [ ] Trocar 1 caractere do `t` na URL: tem que dar "Não encontrei um pagamento aprovado"
- [ ] Chega o e-mail do kit no e-mail do comprador (conferir spam também)
- [ ] Chega o aviso de venda no e-mail da Luciana
- [ ] **Reler a planilha:** a linha caiu na aba certa, na primeira linha livre, `Módulo = skill`
- [ ] No n8n, a execução mostra só **uma** passagem por "Registrar venda", mesmo com o MP
      notificando mais de uma vez
- [ ] Purchase com valor 1,00 aparece no Gerenciador de Eventos (aba Eventos de teste, se usou
      o código), com qualidade de correspondência
- [ ] Estornar o R$ 1 no painel do MP

Fechar o teste
- [ ] `PRECO: 97` de volta no Config · `CAPI_TEST_CODE` vazio · publicar de novo
- [ ] Abrir o checkout uma vez e conferir **R$ 97,00** (sem pagar)

## Testes de lógica feitos nesta sessão

Os 6 Code nodes rodaram fora do n8n contra 35 casos (preço do servidor, produto inválido,
sanitização de fbp/página, os 2 formatos de notificação do MP, duplicata, pendente, pagamento de
Formação ignorado, kit não configurado, token errado, 404 do MP, SHA-256 conferido contra o
`crypto` do Node, inclusive com acento). **Não** foi feito no n8n: `validate_workflow`,
`test_workflow` e execução real. É o primeiro passo da próxima sessão com o MCP do n8n.
