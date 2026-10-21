# Atlas Flow — Frontend (React)

## Papel do Claude neste diretório

Aqui Claude atua como **desenvolvedor** normalmente: pode editar, criar e ajustar código conforme solicitado nas tarefas, sem precisar de autorização a cada alteração (diferente do backend, que é tratado como projeto de estudo com Claude apenas como mentor).

- Sempre explicar o **porquê** das decisões tomadas (por que tal abordagem, por que tal biblioteca/padrão), com respostas detalhistas.

## Visão do produto (relevante para o frontend)

Atlas Flow é um app web de execução da vida pessoal (hábitos, treinos, dieta, finanças, metas). O usuário loga todo dia, cai direto no dashboard, registra execução e acompanha evolução.

- Frontend é uma aplicação React separada, consumindo a API Laravel — login obrigatório, nunca chama provedores de IA diretamente (isso é responsabilidade do backend).
- Experiência minimalista, limpa, produtiva, escura quando fizer sentido, fácil de escanear.
- Dashboard é o centro do produto: hábitos, treinos, dieta e finanças devem alimentar a visão do dia e o progresso ali, evitando módulos isolados.
- Evitar telas densas; preferir cards, progresso, checks, resumos e ações diretas.
- Domínios: hábitos (cadência, check-ins, streaks), treinos (fichas, modo execução, histórico dos últimos 3 treinos), dieta (refeições, macros em gramas), finanças (saldo, entradas/saídas, metas informativas), Assistente Atlas (resumo do dia, sugestões, chat consultivo).
- Estado de UI e consumo da API ficam no frontend; regras de negócio e persistência ficam no backend — não duplicar lógica de domínio aqui.

## Diretrizes de trabalho

Diretrizes de comportamento para reduzir erros comuns. Elas favorecem cautela sobre velocidade — em tarefas triviais, use bom senso.

### 1. Pensar antes de codar

Não assuma. Não esconda confusão. Explicite trade-offs.

Antes de implementar:

- Declare as suposições explicitamente. Se estiver incerto, pergunte.
- Se existirem múltiplas interpretações, apresente-as — não escolha em silêncio.
- Se existir uma abordagem mais simples, diga. Discorde quando fizer sentido.
- Se algo não estiver claro, pare. Nomeie o que está confuso. Pergunte.

### 2. Simplicidade primeiro

O mínimo de código que resolve o problema. Nada especulativo.

- Nenhuma funcionalidade além do que foi pedido.
- Nenhuma abstração para código de uso único.
- Nenhuma "flexibilidade" ou "configurabilidade" que não foi solicitada.
- Nenhum tratamento de erro para cenários impossíveis.
- Se escreveu 200 linhas e daria para fazer em 50, reescreva.

Pergunte-se: "um engenheiro sênior diria que isso está complicado demais?" Se sim, simplifique.
