# Ainda Estamos Aqui - Jogo de Decisões Autoritárias

Este é um jogo sério desenvolvido para pesquisa acadêmica sobre tomada de decisões em contextos autoritários.

## 🎯 Objetivo do Projeto

O jogo simula a experiência de um jornalista trabalhando sob um regime autoritário, coletando dados sobre como jogadores tomam decisões morais sob pressão.

## ✨ Funcionalidades

- **Jogo Interativo**: 16 rounds de decisões como jornalista
- **Coleta de Dados**: Sistema automático de envio de dados por email
- **Interface Responsiva**: Design adaptado para diferentes dispositivos
- **Análise Comportamental**: Métricas detalhadas de tempo e escolhas

## 📧 Sistema de Coleta de Dados

O jogo envia **automaticamente** os dados das sessões por email ao final de cada partida, facilitando a pesquisa acadêmica:

- **Envio Automático**: Dados são enviados automaticamente quando o jogo termina
- **Sem Interação**: Não requer ação do usuário, processo totalmente transparente
- **Formato Detalhado**: Inclui métricas de tempo, decisões e pontuações
- **Backup Seguro**: Dados não são perdidos se o jogador fechar o navegador

### Configuração do Email

1. Configure uma conta no [EmailJS](https://www.emailjs.com/)
2. Crie as variáveis de ambiente (veja `.env.example`)
3. Configure o email de destino no código
4. Veja `SIMPLE_EMAIL_TEMPLATE.md` para o template

## 🚀 Como Executar

### Passos de Instalação

```sh
# 1. Clone o repositório
git clone <URL_DO_REPOSITORIO>

# 2. Navegue para o diretório
cd ainda-estamos-aqui

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do EmailJS

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React + TypeScript + Vite
- **UI**: shadcn/ui + Tailwind CSS
- **Email**: EmailJS para envio automático de dados
- **Hooks**: React hooks customizados para lógica do jogo

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes da interface
│   ├── DemographicForm.tsx
│   ├── GameCard.tsx
│   ├── GameEnd.tsx     # Tela final com envio de dados
│   └── ScoreDisplay.tsx
├── hooks/              # Hooks customizados
│   ├── useGameLogic.ts
│   ├── useSessionData.ts
│   └── useSimpleEmailSender.ts
├── pages/              # Páginas da aplicação
├── types/              # Definições TypeScript
└── data/               # Dados das cartas do jogo
```

## 📊 Dados Coletados

O sistema coleta automaticamente:

- **Demografia**: Idade, gênero
- **Comportamento**: Tempo de decisão, escolhas feitas
- **Métricas**: Pontuações finais, consequências
- **Sessão**: Duração total, número de rounds

## 🔧 Configuração para Pesquisa

### Variáveis de Ambiente

Configure no `.env.local`:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
VITE_RECIPIENT_EMAIL=seu-email@universidade.br
VITE_FROM_NAME=Sistema Ainda Estamos Aqui
```

## 📚 Documentação Adicional

- `EMAIL_DATA_COLLECTION.md` - Configuração detalhada do sistema de email
- `SIMPLE_EMAIL_TEMPLATE.md` - Template para EmailJS
- `EMAILJS_SETUP.md` - Guia completo de configuração

## 🎮 Como Jogar

1. Acesse a aplicação
2. Preencha os dados demográficos
3. Tome decisões como jornalista em regime autoritário
4. Complete os 16 rounds
5. **Os dados são enviados automaticamente** - sem necessidade de ação adicional

## 🤝 Contribuição

Este projeto é parte de pesquisa acadêmica da UFPE. Para contribuições, entre em contato com os pesquisadores responsáveis.

## 📄 Licença

Projeto acadêmico - Universidade Federal de Pernambuco - Centro de Informática
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/205f2ab6-a0fb-4449-b2cd-409676d4f29e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
