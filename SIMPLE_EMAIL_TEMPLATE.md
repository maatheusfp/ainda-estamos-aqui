# Template Simples para EmailJS

Use este template no EmailJS para receber os dados das sessões:

## Configuração do Template

### Assunto:
```
Dados da Sessão - ID: {{session_id}}
```

### Corpo do Email:
```
Nova sessão de jogo concluída:

RESUMO:
- Participante: {{participant_age}} anos
- ID da Sessão: {{session_id}}
- Tempo Total: {{total_time}} minutos
- Pontuação Final:
  - População: {{final_population}}
  - Governo: {{final_government}}
  - Paranoia: {{final_paranoia}}

DADOS COMPLETOS:
{{message}}

---
Sistema Ainda Estamos Aqui
Universidade Federal de Pernambuco
```

## Variáveis Utilizadas

O template usa estas variáveis que são enviadas automaticamente:

- `{{to_email}}` - Email de destino
- `{{from_name}}` - Nome do remetente
- `{{subject}}` - Assunto
- `{{message}}` - Dados completos formatados
- `{{participant_age}}` - Idade do participante
- `{{session_id}}` - ID da sessão
- `{{total_time}}` - Tempo total em minutos
- `{{final_population}}` - Pontuação final da população
- `{{final_government}}` - Pontuação final do governo
- `{{final_paranoia}}` - Pontuação final de paranoia

## Vantagens desta Abordagem

1. **Simplicidade**: Não requer configuração de webhook
2. **Compatibilidade**: Funciona com plano gratuito do EmailJS
3. **Legibilidade**: Dados ficam diretamente no corpo do email
4. **Backup**: Emails podem ser facilmente arquivados e pesquisados

## Como Configurar

1. No painel do EmailJS, crie um novo template
2. Copie o template acima
3. Salve e teste
4. Use o ID do template na variável `VITE_EMAILJS_TEMPLATE_ID`

## Exemplo de Email Recebido

```
Assunto: Dados da Sessão - ID: abc123-def456

Nova sessão de jogo concluída:

RESUMO:
- Participante: 25 anos
- ID da Sessão: abc123-def456
- Tempo Total: 15 minutos
- Pontuação Final:
  - População: 45
  - Governo: 35
  - Paranoia: 60

DADOS COMPLETOS:
============================================================
DADOS DA SESSÃO - AINDA ESTAMOS AQUI
============================================================

DADOS DO PARTICIPANTE:
------------------------------
ID da Sessão: abc123-def456
Idade: 25 anos
Gênero: masculino
Tempo de Início: 10/08/2025 14:30:00

[... resto dos dados ...]

---
Sistema Ainda Estamos Aqui
Universidade Federal de Pernambuco
```
