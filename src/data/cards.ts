import { Card } from '@/types/game';

export const gameCards: Card[] = [
  // Rodada 1 - Assistente
  {
    id: 'assist_1',
    type: 'assistente',
    title: 'Notícias do Dia',
    description: 'Seu assistente trouxe 3 notícias para você escolher qual será a manchete de capa do jornal:',
    choices: [
      {
        id: 'assist_1_corruption',
        text: '"Ministro envolvido em esquema de corrupção"',
        effects: { population: 12, government: -15, paranoia: 2 },
        hiddenEffects: true
      },
      {
        id: 'assist_1_economy',
        text: '"PIB cresce 2% no trimestre"',
        effects: { population: -2, government: 8, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'assist_1_social',
        text: '"Programa social beneficia 50 mil famílias"',
        effects: { population: 6, government: 4, paranoia: 0 },
        hiddenEffects: true
      }
    ]
  },
  
  // Rodada 2 - Informante
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

  // Rodada 3 - Agente
  {
    id: 'agent_1',
    type: 'agente',
    title: 'Toque de Recolher Aumenta Segurança',
    description: 'Agente do governo traz matéria pronta: "Toque de recolher rigoroso e vigilância nas ruas aumentam segurança da população". Militares ampliam controle noturno e reforçam patrulhas.',
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

  // Rodada 4 - Assistente
  {
    id: 'assist_2',
    type: 'assistente',
    title: 'Edição Matutina',
    description: 'Seu assistente apresenta 3 opções de manchete para a edição de hoje:',
    choices: [
      {
        id: 'assist_2_protest',
        text: '"Manifestações pacíficas pedem mudanças"',
        effects: { population: 10, government: -8, paranoia: 1 },
        hiddenEffects: true
      },
      {
        id: 'assist_2_infrastructure',
        text: '"Nova ponte será inaugurada na capital"',
        effects: { population: 2, government: 6, paranoia: -1 },
        hiddenEffects: true
      },
      {
        id: 'assist_2_education',
        text: '"Universidades enfrentam cortes no orçamento"',
        effects: { population: 8, government: -12, paranoia: 3 },
        hiddenEffects: true
      }
    ]
  },

  // Rodada 5 - Assistente
  {
    id: 'assist_3',
    type: 'assistente',
    title: 'Últimas Notícias',
    description: 'Seu assistente preparou 3 manchetes importantes:',
    choices: [
      {
        id: 'assist_3_scandal',
        text: '"Escândalo no ministério da saúde exposto"',
        effects: { population: 15, government: -18, paranoia: 2 },
        hiddenEffects: true
      },
      {
        id: 'assist_3_sports',
        text: '"Seleção nacional vence copa internacional"',
        effects: { population: 8, government: 12, paranoia: -2 },
        hiddenEffects: true
      },
      {
        id: 'assist_3_weather',
        text: '"Chuvas intensas afetam região metropolitana"',
        effects: { population: 0, government: -3, paranoia: 0 },
        hiddenEffects: true
      }
    ]
  },

  // Rodada 6 - Informante
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

  // Rodada 7 - Agente
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
  },

  // Rodada 8 - Assistente
  {
    id: 'assist_4',
    type: 'assistente',
    title: 'Destaques da Semana',
    description: 'Três opções de manchete para destacar hoje:',
    choices: [
      {
        id: 'assist_4_crime',
        text: '"Taxa de criminalidade cai 15% na capital"',
        effects: { population: 5, government: 10, paranoia: -1 },
        hiddenEffects: true
      },
      {
        id: 'assist_4_strike',
        text: '"Greve dos professores entra no segundo mês"',
        effects: { population: 12, government: -10, paranoia: 1 },
        hiddenEffects: true
      },
      {
        id: 'assist_4_tech',
        text: '"Empresa nacional lança tecnologia inovadora"',
        effects: { population: 3, government: 7, paranoia: 0 },
        hiddenEffects: true
      }
    ]
  },

  // Rodada 9 - Assistente
  {
    id: 'assist_5',
    type: 'assistente',
    title: 'Edição Vespertina',
    description: 'Seu assistente selecionou estas 3 notícias relevantes:',
    choices: [
      {
        id: 'assist_5_health',
        text: '"Sistema de saúde em colapso por falta de recursos"',
        effects: { population: 18, government: -20, paranoia: 3 },
        hiddenEffects: true
      },
      {
        id: 'assist_5_tourism',
        text: '"Turismo nacional cresce 25% este ano"',
        effects: { population: 4, government: 8, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'assist_5_culture',
        text: '"Festival cultural reúne milhares na praça central"',
        effects: { population: 6, government: 2, paranoia: -1 },
        hiddenEffects: true
      }
    ]
  },

  // Rodada 10 - Informante
  {
    id: 'inform_3',
    type: 'informante',
    title: 'Desaparecimentos Forçados',
    description: 'Informante traz lista de pessoas desaparecidas pelo regime. Publicar isso colocaria luz sobre crimes contra humanidade.',
    choices: [
      {
        id: 'inform_3_publish',
        text: 'PUBLICAR - Expor os desaparecimentos',
        effects: { population: 20, government: -22, paranoia: 3 },
        consequence: 'Sua família será ameaçada'
      },
      {
        id: 'inform_3_ignore',
        text: 'IGNORAR - Proteger sua família',
        effects: { population: -10, government: 6, paranoia: -1 }
      }
    ]
  },

  // Rodada 11 - Agente
  {
    id: 'agent_3',
    type: 'agente',
    title: 'Sucesso Econômico',
    description: 'Agente do governo entrega matéria: "Políticas econômicas do governo geram crescimento histórico". Dados questionáveis, mas favoráveis ao regime.',
    choices: [
      {
        id: 'agent_3_publish',
        text: 'PUBLICAR - Apoiar políticas econômicas',
        effects: { population: -8, government: 20, paranoia: -2 }
      },
      {
        id: 'agent_3_ignore',
        text: 'IGNORAR - Questionar veracidade dos dados',
        effects: { population: 6, government: -10, paranoia: 3 }
      }
    ]
  },

  // Rodada 12 - Assistente
  {
    id: 'assist_6',
    type: 'assistente',
    title: 'Manchetes Urgentes',
    description: 'Escolha qual dessas 3 notícias será a manchete principal:',
    choices: [
      {
        id: 'assist_6_pollution',
        text: '"Níveis de poluição atingem índices críticos"',
        effects: { population: 14, government: -12, paranoia: 2 },
        hiddenEffects: true
      },
      {
        id: 'assist_6_investment',
        text: '"Investimento estrangeiro bate recorde histórico"',
        effects: { population: -1, government: 15, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'assist_6_housing',
        text: '"Programa habitacional entrega 5 mil casas populares"',
        effects: { population: 10, government: 8, paranoia: 0 },
        hiddenEffects: true
      }
    ]
  },

  // Rodada 13 - Assistente
  {
    id: 'assist_7',
    type: 'assistente',
    title: 'Notícias em Destaque',
    description: 'Seu assistente preparou estas manchetes para análise:',
    choices: [
      {
        id: 'assist_7_unemployment',
        text: '"Desemprego atinge maior patamar em 5 anos"',
        effects: { population: 16, government: -22, paranoia: 4 },
        hiddenEffects: true
      },
      {
        id: 'assist_7_agriculture',
        text: '"Safra recorde impulsiona economia rural"',
        effects: { population: 2, government: 12, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'assist_7_transport',
        text: '"Nova linha de metrô é inaugurada"',
        effects: { population: 7, government: 6, paranoia: -1 },
        hiddenEffects: true
      }
    ]
  },

  // Rodada 14 - Informante
  {
    id: 'inform_4',
    type: 'informante',
    title: 'Corrupção na Cúpula',
    description: 'Documentos revelam esquema bilionário de desvio de verbas públicas pelos principais líderes do governo.',
    choices: [
      {
        id: 'inform_4_publish',
        text: 'PUBLICAR - Expor a corrupção',
        effects: { population: 25, government: -30, paranoia: 5 },
        consequence: 'Você será preso na próxima rodada'
      },
      {
        id: 'inform_4_ignore',
        text: 'IGNORAR - Evitar confronto direto',
        effects: { population: -18, government: 10, paranoia: -2 }
      }
    ]
  },

  // Rodada 15 - Agente
  {
    id: 'agent_4',
    type: 'agente',
    title: 'Ordem e Progresso',
    description: 'Agente propõe matéria: "Governo restaura ordem nacional e elimina elementos subversivos". Propaganda direta sobre as "conquistas" do regime autoritário.',
    choices: [
      {
        id: 'agent_4_publish',
        text: 'PUBLICAR - Promover a propaganda oficial',
        effects: { population: -15, government: 25, paranoia: -5 }
      },
      {
        id: 'agent_4_ignore',
        text: 'IGNORAR - Manter independência jornalística',
        effects: { population: 10, government: -15, paranoia: 6 }
      }
    ]
  },

  // Rodada 16 - Assistente
  {
    id: 'assist_8',
    type: 'assistente',
    title: 'Últimas do Dia',
    description: 'Três opções finais de manchete para hoje:',
    choices: [
      {
        id: 'assist_8_violence',
        text: '"Violência urbana cresce 30% no último semestre"',
        effects: { population: 20, government: -25, paranoia: 5 },
        hiddenEffects: true
      },
      {
        id: 'assist_8_energy',
        text: '"Novo projeto energético promete autonomia nacional"',
        effects: { population: 1, government: 18, paranoia: -1 },
        hiddenEffects: true
      },
      {
        id: 'assist_8_elderly',
        text: '"Programa para terceira idade é ampliado"',
        effects: { population: 8, government: 5, paranoia: 0 },
        hiddenEffects: true
      }
    ]
  }
];