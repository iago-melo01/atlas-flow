---
name: atlas-flow-theme
description: Define o tema visual do Atlas Flow. Use ao criar ou revisar interfaces, telas, layouts, dashboards, componentes, cards, inputs, botões, gráficos, estados visuais ou qualquer UI do projeto.
---

# Atlas Flow Theme

Use esta skill ao criar ou revisar qualquer interface do Atlas Flow. O app deve seguir uma estética web minimalista, produtiva e escura, com sensação de painel pessoal de execução diária.

## Direção Visual

- O tema principal é dark mode.
- A base visual deve ser preto profundo, grafite e cinza frio.
- O visual deve parecer focado, silencioso e organizado, não gamer, neon ou corporativo genérico.
- Use superfícies em camadas para separar fundo, cards, inputs e elementos elevados.
- O cinza mais claro deve aparecer em inputs, dropdowns, botões secundários e superfícies elevadas, não como fundo dominante.
- A interface deve transmitir controle, rotina e evolução pessoal.

## Paleta Base

- `background`: `#050506` — fundo principal, quase preto absoluto.
- `surface`: `#0D0D10` — cards e blocos principais.
- `surface-elevated`: `#121417` — cards em destaque, modais e áreas de foco.
- `input`: `#1A1F20` — inputs, dropdowns e controles editáveis.
- `border`: `#26282B` — bordas, divisores e contornos sutis.
- `text`: `#F2F2F3` — texto principal, branco suavizado.
- `muted`: `#8A8D91` — texto secundário, labels e descrições.

## Cores de Estado

- `success`: `#36D176` — hábitos concluídos, finanças positivas e estados bons.
- `warning`: `#D6A93A` — alertas, metas, dieta e atenção moderada.
- `danger`: `#E05A67` — gastos, falhas, erros e estados negativos.
- `info`: `#6DA8FF` — progresso, dados auxiliares e informações neutras.

## Regras de Uso

- Use `background` como base da página inteira.
- Use `surface` para cards normais e agrupamentos.
- Use `surface-elevated` quando algo precisa parecer mais próximo ou mais importante.
- Use `input` para campos, seletores, dropdowns e botões secundários.
- Use `border` com baixa presença; bordas devem organizar, não chamar atenção.
- Use acentos com moderação. Um card não deve competir com outro por cor.
- Evite branco puro `#FFFFFF` em grandes áreas de texto; prefira `text`.
- Evite cinzas claros demais para fundos grandes.

## Componentes

- Cards são a unidade principal de layout.
- Inputs devem parecer rápidos de preencher e fáceis de editar.
- Botões devem ter texto direto e estado de foco visível.
- Barras de progresso devem ser discretas, com acento apenas na parte preenchida.
- Números importantes, como kg, repetições, macros, saldo e progresso, podem ter mais peso tipográfico.
- Estados vazios devem orientar a próxima ação sem frases motivacionais genéricas.

## Exemplo de Tokens

```css
:root {
  --color-background: #050506;
  --color-surface: #0D0D10;
  --color-surface-elevated: #121417;
  --color-input: #1A1F20;
  --color-border: #26282B;
  --color-text: #F2F2F3;
  --color-muted: #8A8D91;
  --color-success: #36D176;
  --color-warning: #D6A93A;
  --color-danger: #E05A67;
  --color-info: #6DA8FF;
}
```

## Aplicação no Atlas Flow

- Dashboard: fundo `background`, cards `surface`, card principal ou resumo do dia em `surface-elevated`.
- Hábitos: use `success` para concluído e `muted` para pendente.
- Treinos: use `info` ou `success` para progresso, mantendo tabelas em superfícies escuras.
- Dieta: use `warning` com moderação para carboidratos, metas e calorias.
- Finanças: use `success` para entradas e saldo positivo; use `danger` para saídas.
