# Atlas Flow

Atlas Flow é um app web para organizar e executar a vida pessoal em áreas como hábitos, treinos, dieta, finanças, metas e progresso.

O objetivo é que o usuário entre todos os dias, veja o plano do dia, registre a execução e acompanhe sua evolução com uma interface limpa, produtiva e minimalista.

## Stack Planejada

- Backend: PHP com Laravel, atuando como API.
- Frontend: aplicação separada em React.
- Banco de dados: PostgreSQL ou MySQL.
- Conteinerização: Docker Compose para desenvolvimento local.
- Autenticação: login obrigatório.
- IA: OpenRouter free (`openrouter/free`) no MVP, com fallback por regras.

## Arquitetura

```text
Frontend (React)
    ↓
Laravel API
    ↓
Banco de dados + AssistantService
    ↓
OpenRouter free / regras / OpenAI (futuro)
```

- Monólito modular no backend, não microsserviços no MVP.
- Regras de negócio e persistência no Laravel.
- Estado de UI e consumo da API no frontend.
- O frontend nunca chama provedores de IA diretamente.

## Principais Áreas

- Dashboard diário com progresso, alertas e resumo do dia.
- Hábitos com check-ins, ícones e sequências.
- Treinos com exercícios, séries, kg, repetições e histórico dos últimos 3 treinos.
- Dieta com refeições, alimentos cadastrados manualmente, macros em gramas e calorias calculadas.
- Finanças com saldo geral, receitas, gastos, categorias e metas.
- Assistente Atlas: resumo do dia, sugestões e chat consultivo.

## MVP

O MVP deve priorizar:

1. Dashboard do dia.
2. Login e cadastro.
3. Hábitos com check diário.
4. Treinos com histórico dos últimos 3 treinos e comparativos de evolução.
5. Dieta com cadastro manual de alimentos e macros.
6. Finanças com saldo geral, entradas, saídas e categorias.
7. Histórico básico de progresso.
8. Assistente Atlas básico via OpenRouter free, com fallback por regras.

Notificações, gráficos avançados, ranking, premium, integrações, timer de descanso, banco de alimentos e OpenAI paga ficam para depois.

## IA no MVP

- Provider inicial: OpenRouter com `openrouter/free` (custo zero).
- Sem fine-tuning; usa prompts + dados resumidos pelo backend.
- Assistente consultivo: sugere, não altera dados automaticamente.
- Fallback para respostas baseadas em regras se o provider falhar.
- Providers configuráveis: `rules`, `openrouter`, `openai`, `ollama`.
- Adequado para ~4–10 usuários com uso moderado de IA.

## Documentação

- `concept.md`: conceito do produto, escopo e decisões.
- `.cursor/rules/project-vision.mdc`: regra persistente para orientar o agente durante o desenvolvimento.
- `.cursor/skills/atlas-flow-theme/SKILL.md`: paleta e tema visual.
- `.cursor/skills/frontend-design/SKILL.md`: diretrizes de design de interface.

## Próximos Passos

- Criar Docker Compose com Laravel API, banco e frontend React.
- Criar o projeto Laravel API e o projeto frontend.
- Modelar usuários, hábitos, treinos, dieta e finanças.
- Implementar `AssistantService` com providers configuráveis.
- Definir o layout base do dashboard.
- Criar o fluxo inicial de autenticação entre API e frontend.
