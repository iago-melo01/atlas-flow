# Atlas Flow - Conceito do Produto

Atlas Flow é um app web para organizar e executar a vida pessoal em áreas principais: hábitos, treinos, dieta/macros, finanças pessoais, metas, progresso e acompanhamento por IA.

A ideia central é simples: o usuário entra no app todos os dias para ver o plano do dia, registrar o que fez e entender se está evoluindo.

## Direção Atual

- Plataforma inicial: web primeiro.
- Stack desejada: PHP com Laravel como API/backend, para evoluir o projeto junto com os estudos.
- Frontend: aplicação separada em React.
- Persistência: tudo salvo no backend desde o início.
- Acesso: login obrigatório.
- Estilo de produto: minimalista, limpo e produtivo.
- Primeiro acesso após login: cair direto no dashboard.
- Uso inicial: software para uso próprio, mas com estrutura suficiente para uma venda futura.
- Notificações: depois do MVP.
- Cadastro inicial: sem exigir peso, altura, renda ou rotina pronta. O usuário constrói a própria rotina.
- Sugestões iniciais: a aplicação pode sugerir hábitos básicos, como treino, leitura, água ou dieta.

## Arquitetura

- Monólito modular no backend: Laravel como API, não microsserviços no MVP.
- Frontend separado consome a API via autenticação.
- Banco de dados no backend desde o início.
- Conteinerização com Docker para desenvolvimento local.
- O app em si aguenta bem mais usuários; o limite prático do MVP está na camada gratuita de IA.

## Funcionalidades Principais

### 1. Dashboard do Dia

Tela inicial com visão geral do dia:

- Progresso do dia em porcentagem.
- Hábitos concluídos.
- Treino do dia.
- Refeições planejadas.
- Gastos e receitas recentes.
- Alertas do que falta fazer.
- Resumo do tipo: "Hoje você completou 5/8 tarefas".

Essa é a tela que conecta tudo. As outras áreas não devem parecer módulos isolados; elas precisam alimentar o dashboard.

### 2. Hábitos

Baseado na referência visual de hábitos:

- Criar hábitos personalizados.
- Marcar hábitos como concluídos.
- Usar emojis ou ícones por hábito.
- Ter sequência de dias, tipo streak.
- Permitir hábitos diários, semanais ou personalizados.
- Ter modo de edição.
- Exemplos: treinar, dieta, ler, beber água, creatina, se pesar.

A regra de streak zera sempre que o usuário falhar um dia obrigatório; não há tolerância.

### 3. Treinos

Baseado na referência visual de treino:

- Criar fichas de treino.
- Separar por grupos: peito, costas, perna, braço etc.
- Registrar exercícios com séries, carga em kg e repetições.
- Marcar exercício como concluído.
- Ter modo de execução do treino.
- Mostrar barra de progresso do treino.
- Salvar histórico dos últimos 3 treinos.
- Armazenar, em cada treino, o exercício, a carga e o número de repetições de cada série.
- Comparar evolução entre os últimos treinos.
- Futuramente incluir timer de descanso.

Exemplo: Supino reto, supino inclinado e crucifixo, cada um com séries, carga e repetições.

### 4. Dieta

Baseado na referência visual de dieta:

- Refeições por horário: café, almoço, lanche, jantar.
- Itens alimentares por refeição.
- Proteína, carboidrato e gordura sempre em gramas.
- Calorias calculadas com base nos macros informados pelo usuário.
- Total de calorias por refeição.
- Total diário de macros.
- Adicionar e remover alimentos manualmente.
- Copiar dieta de outro dia futuramente.
- Meta diária de calorias/macros futuramente.

Por enquanto, não haverá banco de alimentos pronto. O usuário cadastra manualmente os alimentos.

### 5. Finanças

Baseado na referência visual de finanças:

- Saldo geral.
- Entradas.
- Saídas.
- Saldo livre.
- Registrar gasto.
- Registrar receita.
- Categorias: alimentação, salário, transporte, lazer etc.
- Movimentações do dia.
- Metas financeiras apenas informativas (não bloqueiam saldo livre).
- Aportar ou retirar de metas futuramente.
- Gráfico de gastos por categoria futuramente.

No início, não haverá contas ou carteiras separadas. O controle será por saldo geral. Metas financeiras servem para acompanhar progresso, sem reservar ou bloquear dinheiro.

### 6. Assistente Atlas (IA)

O app terá um assistente consultivo em cada área:

- Hábitos: sugere rotina ideal.
- Treino: analisa os últimos 3 treinos e sugere evolução.
- Dieta: ajuda a montar refeições e substituições.
- Finanças: analisa gastos e sugere economia.
- Geral: responde sobre a vida do usuário com base nos dados.

Exemplo: "Atlas, o que eu preciso fazer hoje para ficar em dia?"

#### Decisões de IA no MVP

- A IA entra de verdade no MVP, mas como assistente consultivo.
- Não usa fine-tuning; prompts + dados resumidos do backend são suficientes.
- Provider inicial: OpenRouter com modelo `openrouter/free` (custo zero para uso pessoal).
- O frontend nunca chama a IA diretamente; o Laravel monta o contexto e intermediaria a chamada.
- O backend envia dados resumidos, não registros brutos.
- Fallback automático para respostas baseadas em regras se o provider falhar.
- A IA não altera dados automaticamente no MVP; apenas sugere. Ações exigem confirmação do usuário.
- Providers configuráveis via ambiente: `rules`, `openrouter`, `openai`, `ollama`.
- Ao escalar ou vender, migrar para OpenAI ou provider pago mais previsível.

#### Limites sugeridos no MVP

- Resumo do dia: até 3 por usuário/dia.
- Chat IA: até 10 mensagens por usuário/dia.
- Sugestões de treino/dieta/finanças: até 5 por usuário/dia.

#### Capacidade estimada

- 4 usuários: confortável para MVP pessoal e estudo.
- 5–10 usuários: viável com uso moderado de IA.
- Acima de 20 usuários: considerar provider pago ou modelo local.

## MVP Inicial

Para a primeira versão:

- Login e cadastro.
- Dashboard do dia.
- Hábitos com check diário.
- Treinos com exercícios, séries, kg e repetições.
- Histórico dos últimos 3 treinos.
- Comparativos de evolução de treino.
- Dieta com refeições e macros cadastrados manualmente.
- Finanças com receitas, gastos, categorias e saldo geral.
- Histórico básico de progresso.
- Assistente Atlas com resumo do dia, sugestões simples e chat consultivo via OpenRouter free, com fallback por regras.

Depois da primeira versão:

- Notificações.
- Gráficos avançados.
- Streaks avançados.
- Ranking.
- Modo premium.
- Integrações.
- Timer de descanso.
- Banco de alimentos.
- Migração para OpenAI ou provider pago.
- IA com ações confirmadas pelo usuário.

## Prioridades do MVP

1. Dashboard.
2. Armazenamento dos últimos 3 treinos.
3. Comparativos de evolução.
4. Hábitos.
5. Dieta.
6. Finanças.
7. Assistente Atlas (camada básica).

