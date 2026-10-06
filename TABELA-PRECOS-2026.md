# Tabela de Preços — Luh Panda
**Aprovada em 07/ago/2026.** Fonte da verdade de preço. Site, proposta, currículo e conversa seguem daqui.

> Estratégia: **abaixo do mercado na entrada, perto do mercado no complexo.** A faixa de entrada atrai; as de cima é onde está o dinheiro. Preço visível no site — a pessoa entra sabendo o que vai pagar.

---

## 1. Criação de sistemas

| Produto | Preço | Escopo | Prazo | Mercado cobraria |
|---|---|---|---|---|
| **Automação de processo** | **R$ 5.000** fixo | Um processo ponta a ponta. Até 2 ferramentas conectadas. *Ex: relatório diário no WhatsApp, organização automática de documentos, robô de atendimento com respostas fixas* | ~2 semanas | R$ 8–15k |
| **Agente de IA com seus dados** | **R$ 15.000** fixo | Lê documento, aplica regra, devolve análise. RAG, OCR, banco de dados. *Ex: auditor de folha da Capitalize* | ~4–6 semanas | R$ 30–80k |
| **Plataforma sob medida** | **a partir de R$ 25.000** | Várias telas, login, permissão por usuário, banco. Escopo fechado caso a caso. *Ex: hub interno, ARROBA CERTA, Aprovi.ai* | caso a caso | R$ 40–80k |

**Por que só a última tem "a partir de":** preço fixo funciona quando o escopo é definido. "A partir de" normalmente esconde que não está. Nas duas primeiras o escopo está fechado, então o preço se compromete.

**Por que manter a faixa de R$ 25.000 visível mesmo vendendo pouco dela:**
1. *Ancoragem* — com R$ 25.000 na tela, R$ 5.000 vira barato. Sozinho, R$ 5.000 é o teto da percepção.
2. *Filtro* — quem quer um SaaS inteiro já chega sabendo que não cabe em R$ 5.000, e a Luh para de gastar hora explicando isso.

## 2. Manutenção mensal (proporcional ao que mantém)

| Faixa do sistema | Manutenção |
|---|---|
| Automação de processo | R$ 500/mês |
| Agente de IA | R$ 1.000–1.500/mês |
| Plataforma sob medida | R$ 1.500/mês+ |

Sistema maior dá mais trabalho pra manter, consome mais API e tem mais gente usando. Cobrar igual pros dois era subsídio.

**Toda manutenção precisa de escopo escrito:** o que está incluso (monitoramento, correção de defeito, X horas de suporte) e o que é projeto novo (função nova, integração nova). Sem isso, manutenção vira desenvolvimento de graça.

## 3. Formação

### In-company (empresa compra pro time)

| Módulo | Preço | Pessoas | Por pessoa | Adicional |
|---|---|---|---|---|
| **M1 · Usar IA do jeito certo** (4 aulas · 8h) | **R$ 3.000** | até 10 | R$ 300 | a definir |
| **M2 · Construir e colocar no ar** (6 aulas · 12h) | **R$ 10.000** | até 10 | R$ 1.000 | a definir |

> **Atualizado em 05/10/2026 (pedido dela, site v5):** era M1 R$ 9.600 / M2 R$ 14.400 até 8 pessoas
> (adicional R$ 900 / R$ 1.200, teto 12). **Acima de 10 pessoas: sob consulta** (conversa no WhatsApp).

Pagamento por proposta e nota fiscal. **Nunca no cartão.**

### Particular 1:1

| Módulo | À vista | Parcelado | Pix |
|---|---|---|---|
| **M1** (4 aulas · 8h) | R$ 997 | 12x de R$ 83 | R$ 897 (10% off, arredondado) |
| **M2** (6 aulas · 12h) | R$ 2.497 | 12x de R$ 208 | R$ 2.247 (10% off, arredondado) |

Manchete de preço no site é **"12x R$ 83"**, nunca "R$ 997".

> **Atualizado em 05/10/2026 (pedido dela, site v5):** era M1 R$ 1.600 (12x R$ 133 · Pix R$ 1.440) e
> M2 R$ 3.600 (12x R$ 300 · Pix R$ 3.240). 🔴 O workflow n8n `Criar Pagamento (Formação)` `yEIEMrq9B4Mpsou6`
> ainda cobra 1600/3600: tem que mudar **antes** do merge da v5.

## 4. O que NÃO aparece no site

Produtos de pós-venda ou de conversa. Quem nunca viu a Luh não compra nenhum destes — colocar na vitrine só rouba atenção dos que vendem.

| Produto | Preço | Quando oferecer |
|---|---|---|
| Diagnóstico Estratégico | R$ 500 | Na conversa, quando o cliente quer avançar mas não está pronto pro projeto |
| Aula avulsa M1 | R$ 200/h | Pra quem já é aluno |
| Aula avulsa M2 | R$ 300/h | Pra quem já é aluno |
| Suporte técnico em sistema do aluno | R$ 350/h | Pós Módulo 2 |
| Plano de acompanhamento do aluno | a partir de R$ 600/mês | Pós Módulo 2 |

## 5. A conta que sustenta tudo isso

| | Recebe | Tempo | Por hora |
|---|---|---|---|
| Turma in-company M1 (05/10) | R$ 3.000 | 8h de aula | **R$ 375/h** |
| Sistema a R$ 5.000 | R$ 5.000 | ~60h | **R$ 83/h** |
| Sistema a R$ 15.000 | R$ 15.000 | ~100h | **R$ 150/h** |

Ensinar continua sendo o melhor negócio por hora. A tabela de sistemas existe pra que construir — que a Luh gosta de fazer — se pague, em vez de ser subsidiado pelas aulas.

## 6. Riscos registrados

- **Preço baixo atrai comprador de preço.** Ele pechincha, pede fora do escopo e some quando aparece alguém mais barato. A defesa é escopo escrito e a faixa de cima visível.
- **Custo de API escala com uso.** Sistema com RAG/OCR consome por documento processado. Antes de fechar manutenção com valor fixo, medir o custo real de um mês.
- **Subir preço com cliente antigo é mais difícil que começar certo.** Cliente novo entra na tabela nova; cliente antigo se reajusta no momento em que o escopo muda (usuário novo, volume novo, função nova).
