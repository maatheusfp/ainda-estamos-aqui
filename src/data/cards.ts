import { Card } from '@/types/game';

export const gameCards: Card[] = [
  // Cartas Assistente (efeitos ocultos)
  {
    id: 'assist_1',
    type: 'assistente',
    title: 'Vazamento de Documentos',
    description: 'Seu assistente trouxe documentos confidenciais sobre corrupção no governo. Como proceder?',
    choices: [
      {
        id: 'assist_1_publish',
        text: 'Publicar imediatamente',
        effects: { population: 8, government: -12, paranoia: 3 },
        hiddenEffects: true
      },
      {
        id: 'assist_1_investigate',
        text: 'Investigar mais antes de publicar',
        effects: { population: 3, government: -5, paranoia: 1 },
        hiddenEffects: true
      },
      {
        id: 'assist_1_ignore',
        text: 'Ignorar os documentos',
        effects: { population: -5, government: 2, paranoia: -1 },
        hiddenEffects: true
      }
    ]
  },
  {
    id: 'assist_2',
    type: 'assistente',
    title: 'Protesto Estudantil',
    description: 'Estudantes organizaram um protesto. Há rumores de que a polícia planeja uma ação violenta.',
    choices: [
      {
        id: 'assist_2_cover',
        text: 'Cobrir o protesto ao vivo',
        effects: { population: 10, government: -8, paranoia: 4 },
        hiddenEffects: true
      },
      {
        id: 'assist_2_report',
        text: 'Reportar apenas os fatos básicos',
        effects: { population: 2, government: -2, paranoia: 1 },
        hiddenEffects: true
      },
      {
        id: 'assist_2_avoid',
        text: 'Evitar cobertura do evento',
        effects: { population: -8, government: 5, paranoia: -2 },
        hiddenEffects: true
      }
    ]
  },
  
  // Cartas Informante (consequências pessoais conhecidas)
  {
    id: 'inform_1',
    type: 'informante',
    title: 'Denúncia de Tortura',
    description: 'Um informante oferece evidências de tortura em prisões. Ele avisa que sua família pode ser perseguida se você publicar.',
    choices: [
      {
        id: 'inform_1_publish',
        text: 'Publicar as evidências',
        effects: { population: 15, government: -18, paranoia: 2 },
        consequence: 'Sua família está sendo vigiada e ameaçada'
      },
      {
        id: 'inform_1_anonymous',
        text: 'Publicar anonimamente',
        effects: { population: 8, government: -10, paranoia: 3 },
        consequence: 'Você está sob suspeita do governo'
      },
      {
        id: 'inform_1_refuse',
        text: 'Recusar a informação',
        effects: { population: -10, government: 3, paranoia: -1 }
      }
    ]
  },
  {
    id: 'inform_2',
    type: 'informante',
    title: 'Massacre Encoberto',
    description: 'Testemunha ocular de um massacre quer que você divulgue. Diz que se publicar, você será hospitalizado "por acidente".',
    choices: [
      {
        id: 'inform_2_publish',
        text: 'Publicar imediatamente',
        effects: { population: 20, government: -25, paranoia: 1 },
        consequence: 'Você foi hospitalizado e perderá a próxima rodada'
      },
      {
        id: 'inform_2_delay',
        text: 'Planejar publicação futura',
        effects: { population: 5, government: -8, paranoia: 4 },
        consequence: 'Você vive com medo constante'
      },
      {
        id: 'inform_2_silence',
        text: 'Manter silêncio',
        effects: { population: -15, government: 8, paranoia: -2 }
      }
    ]
  },

  // Cartas Agente do Governo (apenas pontuação)
  {
    id: 'agent_1',
    type: 'agente',
    title: 'Proposta de Colaboração',
    description: 'Um agente oferece acesso exclusivo a informações oficiais em troca de "moderação" em suas reportagens.',
    choices: [
      {
        id: 'agent_1_accept',
        text: 'Aceitar a proposta',
        effects: { population: -8, government: 15, paranoia: -3 }
      },
      {
        id: 'agent_1_pretend',
        text: 'Fingir aceitar para obter informações',
        effects: { population: 5, government: -5, paranoia: 8 }
      },
      {
        id: 'agent_1_refuse',
        text: 'Recusar categoricamente',
        effects: { population: 8, government: -12, paranoia: 2 }
      }
    ]
  },
  {
    id: 'agent_2',
    type: 'agente',
    title: 'Perdão Governamental',
    description: 'O governo oferece anistia para suas "transgressões" anteriores em troca de apoio público.',
    choices: [
      {
        id: 'agent_2_accept',
        text: 'Aceitar o perdão',
        effects: { population: -12, government: 18, paranoia: -5 },
        consequence: 'Consequências anteriores foram removidas'
      },
      {
        id: 'agent_2_conditional',
        text: 'Aceitar com ressalvas',
        effects: { population: -5, government: 8, paranoia: 2 }
      },
      {
        id: 'agent_2_refuse',
        text: 'Rejeitar o perdão',
        effects: { population: 12, government: -15, paranoia: 3 }
      }
    ]
  }
];