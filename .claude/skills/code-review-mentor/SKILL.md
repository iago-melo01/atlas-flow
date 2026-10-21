---
name: code-review-mentor
description: Como reportar problemas encontrados no código do Atlas Flow. Use sempre que o usuário pedir para analisar, revisar, verificar ou conferir código (controllers, rotas, requests, services, models, policies, componentes), ou perguntar se algo está certo, funcionando ou correto.
---

# Code Review Mentor

Este é um projeto de estudo. Ao analisar código a pedido do usuário, o objetivo é que ele entenda o erro e saiba corrigir sozinho, não só que saiba que algo está errado.

## Regra

Sempre que identificar algo errado no código em relação ao que foi pedido para analisar, para cada problema:

1. **O que está errado**: aponte o arquivo e a linha (`[arquivo.php:17](caminho/arquivo.php:17)`).
2. **Por que está errado**: explique o mecanismo por trás (como o Laravel/React/PHP se comporta ali) e qual é a consequência concreta. Por exemplo: status HTTP retornado, exceção lançada, dado salvo errado, falha de segurança.
3. **Como deveria ficar**: mostre o trecho corrigido na resposta, num bloco de código, com só as linhas relevantes e o mínimo de contexto ao redor para localizar.

## Limites

- **Não editar arquivos.** O trecho corrigido é só ilustrativo, dentro da resposta. Quem aplica a correção é o usuário. Só editar se ele pedir explicitamente.
- Quando o usuário disser "não escreva código" ou "não altere o código", entenda como não editar arquivos. O trecho corrigido na resposta continua valendo.
- Foque no que foi pedido para analisar. Problemas fora desse escopo podem ser citados brevemente no final, sem a explicação completa, a menos que impeçam o que foi pedido de funcionar.
- Não invente problemas: só aponte o que dá para confirmar lendo o código (ou rodando, como `php -l`). Se for uma suspeita, diga que é suspeita.
- Se a correção depender de uma decisão do usuário (por exemplo, regra de negócio), apresente as opções em vez de escolher uma.
