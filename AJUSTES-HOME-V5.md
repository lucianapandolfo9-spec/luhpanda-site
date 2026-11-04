# Ajustes Home v5 — planejamento (18/ago/2026)

Status: **NADA EXECUTADO AINDA**. Isto é o briefing organizado pra retomar quando a Luh mandar executar.
Arquivo de referência: `index.html` (versão v4 atual, linear-style, ver `PROJETO.md` e skill `site-luhpanda`).

---

## 1. Hero > barra de stats ("sistemas em produção")

**Onde:** `.moldura` logo abaixo do hero (linhas ~281-289 do `index.html` atual).

**Hoje:** 4 stats estáticos lado a lado — 144 colaboradores / ~95% dados extraídos / 6,04x ROAS / 4 sistemas no ar.

**Pedido:**
- Colocar em **movimento** — animar a entrada de cada stat (não só aparecer estático), com **hover** reagindo (o card se move/destaca ao passar o mouse).
- "Front mais móvel" — mais dinâmico, sensação de vivo, não uma caixa parada.
- **Adicionar novo stat:** `Economia de 70% do tempo da equipe`

**Em aberto pra próxima sessão:**
- Layout vai pra 5 stats — decidir grid (5 colunas finas, ou 3+2, ou carrossel horizontal com scroll/auto-play).
- Estilo do movimento: entrada em cascata ao rolar a tela (igual `.rv` já faz no resto do site) + hover com leve tilt/parallax é o caminho mais barato e consistente com o resto do site. Confirmar se é isso ou se ela quer algo mais "vivo" tipo contador numérico subindo (count-up).

---

## 2. Seção "O que acontece hoje" (dor-grade)

**Onde:** section logo abaixo do hero, 4 cards de dor (linhas ~295-308).

**Pedido:**
- Buscar ou criar uma **imagem/ícone pra cada um dos 4 cards** (hoje é só texto, sem nenhum elemento visual — rompe a regra atual do design system v4 de "zero ícone", então isso é uma decisão consciente de mudar essa seção específica).
- Ajustar 2 dos 4 textos:

| Card | Texto atual | Texto novo |
|---|---|---|
| "Você não sabe os números do próprio negócio" | Sem abrir cinco painéis diferentes e montar planilha na mão. | **E quando sabe tem que abrir cinco painéis diferentes e montar planilha na mão.** |
| "Todo mundo quer usar IA, mas sem método" | Cada um faz de um jeito, o resultado não padroniza e ninguém confia no que sai. | **Cada um faz de um jeito, o resultado não padroniza, a economia de tempo não aparece e ninguém confia no que sai.** |

Os outros 2 cards ("Sua equipe passa o dia em tarefa repetitiva" e "Cliente chama no WhatsApp e espera horas") ficam como estão.

**Em aberto:**
- Fonte das imagens: gerar via IA (estilo já documentado na skill: flat/moderno tech, fundo escuro `#1A0E24`, acentos roxo `#8B4BA3` e laranja `#FF6B35`, sem texto embutido) ou buscar imagem de banco. Recomendo gerar — mantém consistência de marca.

---

## 3. Seção "Duas frentes"

**Onde:** linhas ~312-350.

**Pedido:**
- Título (`h2`) mais **centralizado**.
- Trocar o parágrafo de rodapé da seção:

Atual: *"Faço as duas coisas — e muita empresa contrata as duas. Eu entrego o sistema rodando e deixo o time sabendo operar, sem ficar dependente de mim pra cada ajuste."*

Novo: **"Faço as duas coisas — e muita empresa contrata as duas. Eu entrego o sistema rodando do seu jeito e deixo o time sabendo operar ele e sua IA."**

---

## 4. Card "Criação de sistemas" (dentro de Duas Frentes)

**Pedido:** tirar "precisa do problema resolvido" do texto.

Atual: *"Eu mapeio, construo, coloco no ar e mantenho. Você não precisa de time técnico — precisa do problema resolvido."*

Proposta (frase fica completa sem a parte removida): **"Eu mapeio, construo, coloco no ar e mantenho. Você não precisa de time técnico."**

*(confirmar se serve assim ou se ela quer completar com outra coisa no lugar)*

---

## 5. Lista "Formação de turmas" (dentro de Duas Frentes)

**Pedido:** tirar "pro time rever" do bullet.

Atual: `Aulas ao vivo e gravadas pro time rever`
Novo: **`Aulas ao vivo e gravadas`**

*(a pergunta sobre "Agentes de IA com os dados do seu negócio" era sobre entendimento do conceito, não pede mudança de copy — resposta dada na conversa)*

---

## 6. Depoimentos (bolhas de WhatsApp)

**Onde:** linhas ~354-381, 3 cards com bolhas de chat reconstruídas.

**Pedido:** colocar em movimento também, ou trocar pra vários ícones/bolhas soltas com as mensagens boiando.

**Em aberto — decidir com a Luh:**
- Duas direções possíveis: (a) manter o card atual mas animar a entrada das bolhas em sequência (uma aparece, depois a outra, como se estivesse "digitando"); ou (b) redesenhar como elementos soltos flutuando pela seção (mais orgânico, tipo bolhas de chat espalhadas com animação de flutuação leve).
- Ela perguntou "não tem mais mensagens?" — **verificar se tem mais prints/conversas reais pra reconstruir como novos depoimentos.** Lembrar da regra: nunca print real, sempre reconstruído como bolha, nome vira segmento, e sempre confirmar autorização do cliente antes de publicar (regra 7 da skill).

---

## 7. Seção "Sobre" / "Quem constrói"

**Onde:** linhas ~385-405, ao lado do vídeo.

**Pedido:** pequena sinopse de quem ela é e com o que trabalhou. Ideia: "Luh Panda não vende tecnologia, vende problema resolvido" + trabalha com IA desde 2025, desenvolveu vários agentes pra ajudar empresas a automatizar processos e sistemas que agilizam leitura de dados + é formada em música, teatro e IA — contar a história mas manter segurança/credibilidade pro cliente que for contratar.

**Rascunho proposto** (pra revisar, não é final):

> Luh Panda não vende tecnologia, vende problema resolvido. Trabalho com IA desde 2025 — já desenvolvi diversos agentes que ajudam empresas a automatizar processos e construí sistemas que agilizam a leitura de dados que antes levava horas. Sou formada em música, teatro e Inteligência Artificial aplicada a negócios, e trago pra tecnologia a mesma obsessão por comunicação clara que aprendi nos palcos: entendo o problema, desenho a solução, construo, coloco no ar e deixo funcionando.

**Lista de credenciais — sugestão de ordem** (tecnologia primeiro, pra ancorar confiança, história pessoal depois):
1. Certificação em IA — TERA
2. MBA em Inteligência Artificial — Exame / Saint Paul
3. Formação em Música e Teatro
4. Automação e performance na Lead Performance
5. Criadora do ARROBA CERTA (SaaS próprio)

**Em aberto:**
- Confirmar se o rascunho do parágrafo soa como ela quer (tom, tamanho).
- Decidir se "Formação em Música e Teatro" entra na lista de credenciais ou fica só mencionada no texto corrido (pra não competir peso com as credenciais técnicas na hora de gerar confiança).

---

## Resumo do que falta decidir antes de executar

1. Layout dos 5 stats do hero (grid/carrossel) + estilo exato do movimento.
2. Fonte das 4 imagens da seção "O que acontece hoje" (gerar via IA vs banco de imagem).
3. Frase final do card "Criação de sistemas" (serve cortada, ou completa com outra coisa?).
4. Direção visual dos depoimentos (bolhas em sequência animada vs bolhas soltas flutuando) + se tem mais conversas reais pra virar novo depoimento.
5. Aprovação do rascunho da bio + se "Música e Teatro" entra na lista de credenciais.

Quando a Luh voltar com as respostas (ou topar os defaults sugeridos), dá pra executar tudo numa passada só.
