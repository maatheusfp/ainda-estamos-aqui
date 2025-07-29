import { Card } from '@/types/game';

export const gameCards: Card[] = [
  // Cartas Assistente (escolher 1 de 3 notícias para capa)
  {
    id: 'assist_1',
    type: 'assistente',
    title: 'Notícias do Dia',
    description: 'Seu assistente trouxe 3 notícias para você escolher qual será a manchete de capa do jornal:',
    choices: [
      {
        id: 'assist_1_corruption',
        text: '"Ministro envolvido em esquema de corrupção" - Impacto: Alto em população, negativo no governo',
        effects: { population: 12, government: -15, paranoia: 2 },
        hiddenEffects: true
      },
      {
        id: 'assist_1_economy',
        text: '"PIB cresce 2% no trimestre" - Impacto: Moderado em governo, neutro na população',
        effects: { population: -2, government: 8, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'assist_1_social',
        text: '"Programa social beneficia 50 mil famílias" - Impacto: Equilibrado',
        effects: { population: 6, government: 4, paranoia: 0 },
        hiddenEffects: true
      }
    ]
  },
  {
    id: 'assist_2',
    type: 'assistente',
    title: 'Edição Matutina',
    description: 'Seu assistente apresenta 3 opções de manchete para a edição de hoje:',
    choices: [
      {
        id: 'assist_2_protest',
        text: '"Manifestações pacíficas pedem mudanças" - Impacto: Favorável à população',
        effects: { population: 10, government: -8, paranoia: 1 },
        hiddenEffects: true
      },
      {
        id: 'assist_2_infrastructure',
        text: '"Nova ponte será inaugurada na capital" - Impacto: Neutro, boa para governo',
        effects: { population: 2, government: 6, paranoia: -1 },
        hiddenEffects: true
      },
      {
        id: 'assist_2_education',
        text: '"Universidades enfrentam cortes no orçamento" - Impacto: Crítico ao governo',
        effects: { population: 8, government: -12, paranoia: 3 },
        hiddenEffects: true
      }
    ]
  },
  
  // Cartas Informante (notícias contra governo/pró população)
  {
    id: 'inform_1',
    type: 'informante',
    title: 'Evidências de Tortura',
    description: 'Um informante trouxe evidências de tortura sistemática em prisões do governo. A notícia denunciaria graves violações de direitos humanos.',
    choices: [
      {
        id: 'inform_1_publish',
        text: 'PUBLICAR - Denunciar as torturas',
        effects: { population: 18, government: -20, paranoia: 3 },
        consequence: 'Governo marca você como inimigo'
      },
      {
        id: 'inform_1_ignore',
        text: 'IGNORAR - Não publicar a denúncia',
        effects: { population: -12, government: 5, paranoia: -2 }
      }
    ]
  },
  {
    id: 'inform_2',
    type: 'informante',
    title: 'Massacre Encoberto',
    description: 'Informante revela massacre de civis em região rural, totalmente ignorado pela mídia oficial. Esta seria uma bombástica denúncia.',
    choices: [
      {
        id: 'inform_2_publish',
        text: 'PUBLICAR - Expor o massacre',
        effects: { population: 22, government: -25, paranoia: 4 },
        consequence: 'Você será hospitalizado e perderá a próxima rodada'
      },
      {
        id: 'inform_2_ignore',
        text: 'IGNORAR - Manter silêncio sobre o massacre',
        effects: { population: -15, government: 8, paranoia: -1 }
      }
    ]
  },

  // Cartas Agente do Governo (notícias pró governo)
  {
    id: 'agent_1',
    type: 'agente',
    title: 'Toque de Recolher Aumenta Segurança',
    description: 'Agente do governo traz matéria pronta: "Toque de recolher rigoroso e vigilância nas ruas aumentam medo da população". Militares ampliam controle noturno e reforçam patrulhas.',
    choices: [
      {
        id: 'agent_1_publish',
        text: 'PUBLICAR - Apoiar as medidas de segurança',
        effects: { population: -10, government: 15, paranoia: -3 }
      },
      {
        id: 'agent_1_ignore',
        text: 'IGNORAR - Não publicar propaganda governamental',
        effects: { population: 5, government: -8, paranoia: 4 }
      }
    ]
  },
  {
    id: 'agent_2',
    type: 'agente',
    title: 'Operação Anti-Terrorismo',
    description: 'Agente oferece matéria exclusiva: "Operação do governo desarticula célula terrorista". A matéria justificaria operações militares em bairros populares.',
    choices: [
      {
        id: 'agent_2_publish',
        text: 'PUBLICAR - Apoiar operação governamental',
        effects: { population: -12, government: 18, paranoia: -4 }
      },
      {
        id: 'agent_2_ignore',
        text: 'IGNORAR - Recusar publicar propaganda',
        effects: { population: 8, government: -12, paranoia: 5 }
      }
    ]
  }
];