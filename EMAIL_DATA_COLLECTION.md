# Configuração do Envio Automático de Dados por Email

## Visão Geral

O jogo "Ainda Estamos Aqui" agora envia automaticamente os dados das sessões por email ao invés de disponibilizar para download. Isso facilita a coleta de dados para pesquisa.

## Configuração Necessária

### 1. EmailJS Setup

1. **Criar conta no EmailJS**:
   - Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
   - Crie uma conta gratuita

2. **Configurar Serviço de Email**:
   - No painel do EmailJS, vá em "Email Services"
   - Adicione um serviço (Gmail recomendado)
   - Configure suas credenciais

3. **Criar Template para Dados da Sessão**:
   ```
   Assunto: Dados da Sessão de Jogo - {{subject}}
   
   Olá,
   
   {{message}}
   
   Dados da sessão em anexo.
   
   Atenciosamente,
   Sistema Ainda Estamos Aqui
   ```

### 2. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
```

### 3. Configurar Email do Pesquisador

No arquivo `src/components/GameEnd.tsx`, linha 18, altere o email de destino:

```typescript
recipientEmail: 'seu-email@universidade.br' // Substitua pelo email real
```

## Como Funciona

### Dados Coletados

O sistema coleta automaticamente:

1. **Dados do Participante**:
   - Idade
   - Gênero
   - ID da sessão
   - Horário de início

2. **Métricas do Jogo**:
   - Pontuações finais (População, Governo, Paranoia)
   - Total de rounds jogados
   - Motivo do fim do jogo
   - Tempo total de jogo

3. **Decisões Detalhadas**:
   - Número da rodada
   - Tipo de carta
   - ID da escolha
   - Tempo de decisão
   - Pontuações antes e depois de cada decisão

4. **Consequências**:
   - Lista de todas as consequências acumuladas

### Formato do Arquivo

Os dados são enviados como arquivo `.txt` anexado ao email, contendo:

1. **Formato Legível**: Dados formatados de forma legível para análise rápida
2. **JSON Completo**: Dados brutos em formato JSON para análise programática

### Exemplo de Arquivo Enviado

```
============================================================
DADOS DA SESSÃO - AINDA ESTAMOS AQUI
============================================================

DADOS DO PARTICIPANTE:
------------------------------
ID da Sessão: abc123-def456
Idade: 25 anos
Gênero: masculino
Tempo de Início: 10/08/2025 14:30:00

INFORMAÇÕES DA SESSÃO:
------------------------------
Início: 10/08/2025 14:30:00
Fim: 10/08/2025 14:45:00
Tempo Total: 15 minutos
Rounds Jogados: 16
Motivo do Fim: completed

PONTUAÇÕES FINAIS:
------------------------------
População: 45
Governo: 35
Paranoia: 60

[... mais dados ...]
```

## Vantagens da Nova Abordagem

1. **Coleta Automática**: Não depende do usuário lembrar de baixar
2. **Organização**: Todos os dados chegam em um local centralizado
3. **Backup**: Dados não são perdidos se o usuário fechar o navegador
4. **Análise**: Facilita o processamento posterior dos dados

## Limitações

1. **Tamanho do Arquivo**: Máximo 2MB (suficiente para dados de sessão)
2. **EmailJS Gratuito**: 200 emails por mês
3. **Dependência de Internet**: Requer conexão para envio

## Troubleshooting

### Email não está sendo enviado

1. Verifique as variáveis de ambiente no `.env.local`
2. Confirme que o template do EmailJS está configurado corretamente
3. Verifique se há erros no console do navegador

### Template de Email

Certifique-se de que seu template no EmailJS inclui estas variáveis:
- `{{to_email}}`
- `{{from_name}}`
- `{{subject}}`
- `{{message}}`
- `{{attachment_name}}`
- `{{attachment_content}}`
- `{{attachment_type}}`

### Configuração de Webhook

Para suporte completo a anexos, configure um webhook no EmailJS que processe os anexos Base64:

```javascript
// Webhook no EmailJS
if (data.attachment_content && data.attachment_name) {
  const attachment = {
    filename: data.attachment_name,
    content: data.attachment_content,
    encoding: 'base64',
    contentType: data.attachment_type || 'text/plain'
  };
  
  message.attachments = [attachment];
}
```

## Segurança e Privacidade

- Os dados são enviados apenas para o email configurado pelo pesquisador
- Nenhum dado é armazenado em servidores externos além do EmailJS
- O ID da sessão é único e não identifica pessoalmente o participante
- Apenas dados relacionados ao jogo são coletados

## Próximos Passos

1. Configure sua conta EmailJS
2. Atualize as variáveis de ambiente
3. Altere o email de destino no código
4. Teste com uma sessão de jogo
5. Monitore o recebimento dos emails
