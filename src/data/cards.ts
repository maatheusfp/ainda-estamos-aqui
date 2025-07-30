import { Card } from '@/types/game';

export const gameCards: Card[] = [
  // Rodada 1 - Assistente
  {
    id: 'assistant_transport',
    type: 'assistente',
    title: 'Notícias do Dia',
    description: 'Meu assistente chegou com 3 notícias, preciso escolher uma delas para publicar ainda hoje:',
    choices: [
      {
        id: 'transport_crisis',
        text: 'Crise nos transportes afeta rotina de trabalhadores',
        effects: { population: 10, government: -10, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'mobility_plan',
        text: 'Ministério anuncia novo plano de mobilidade urbana',
        effects: { population: -5, government: 5, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'metro_delays',
        text: 'População enfrenta dificuldades com atrasos no metrô',
        effects: { population: 5, government: -5, paranoia: 0 },
        hiddenEffects: true
      }
    ]
  },

  // Rodada 2 - Informante
  {
    id: 'informant_torture',
    type: 'informante',
    title: 'Universidades são fechadas e professores investigados por "ativismo ideológico"',
    description: 'O filósofo seu José foi sequestrado pelo governo para ser torturado em virtude da sua influência nos ideais revolucionários.',
    choices: [
      {
        id: 'publish',
        text: 'PUBLICAR',
        effects: { population: 20, government: -20, paranoia: 20 },
        consequence: 'Sua família começará a ser perseguida pelo governo'
      },
      {
        id: 'ignore',
        text: 'IGNORAR',
        effects: { population: -30, government: 15, paranoia: 0 }
      }
    ]
  },

  // Rodada 3 - Agente
  {
    id: 'government_security',
    type: 'agente',
    title: 'Medidas de segurança reforçadas e toque de recolher garantem proteção e tranquilidade à população.',
    description: 'Devido aos esforços do governo, o país está mais forte e seguro que nunca',
    choices: [
      {
        id: 'publish',
        text: 'PUBLICAR',
        effects: { population: -20, government: 10, paranoia: -20 },
        consequence: 'O governo vai perdoar alguma consequência pessoal' // Renamed from 'benefit' for consistency
      },
      {
        id: 'ignore',
        text: 'IGNORAR',
        effects: { population: 15, government: -20, paranoia: 10 }
      }
    ]
  },

  // Rodada 4 - Assistente
  {
    id: 'assistant_events',
    type: 'assistente',
    title: 'Edição Matutina',
    description: 'Meu assistente chegou com 3 notícias, preciso escolher uma delas para publicar ainda hoje',
    choices: [
      {
        id: 'protest_law',
        text: 'Nova lei limita horário de protestos nas ruas',
        effects: { population: -10, government: 15, paranoia: 5 },
        hiddenEffects: true
      },
      {
        id: 'cultural_festival',
        text: 'Festival cultural celebra diversidade regional',
        effects: { population: 5, government: -5, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'archive_fire',
        text: 'Incêndio atinge arquivos históricos em instituição pública, e revela infraestrutura precária',
        effects: { population: 10, government: -10, paranoia: 5 },
        hiddenEffects: true
      }
    ]
  },

  // Rodada 5 - Informante
  {
    id: 'informant_massacre',
    type: 'informante',
    title: 'Imagens de um massacre promovido por milícias ligadas ao governo foram obtidas com exclusividade',
    description: 'Evidências exclusivas de violência extrema cometida por forças governamentais.',
    choices: [
      {
        id: 'publish',
        text: 'DIVULGAR',
        effects: { population: 25, government: -25, paranoia: 30 },
        consequence: 'Será ameaçado de sofrer um atentado a qualquer momento.'
      },
      {
        id: 'censor',
        text: 'CENSURAR',
        effects: { population: -25, government: 15, paranoia: -10 }
      }
    ]
  },

  // Rodada 6 - Assistente
  {
    id: 'assistant_events_2',
    type: 'assistente',
    title: 'Últimas Notícias',
    description: 'Meu assistente chegou com 3 notícias, preciso escolher uma delas para publicar ainda hoje',
    choices: [
      {
        id: 'military_parade',
        text: 'Desfile militar impressiona população e reforça sentimento patriótico',
        effects: { population: -10, government: 10, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'community_garden',
        text: 'Moradores revitalizam praça e criam horta comunitária',
        effects: { population: 5, government: -5, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'fuel_shortage',
        text: 'Falta de combustível gera filas e tensão nos postos',
        effects: { population: 5, government: -5, paranoia: 0 },
        hiddenEffects: true
      }
    ]
  },

  // Rodada 7 - Agente
  {
    id: 'government_surveillance',
    type: 'agente',
    title: 'Novas câmeras inteligentes são instaladas para garantir a segurança de todos',
    description: 'O governo concluiu a instalação de um sistema nacional de vigilância com reconhecimento facial, que promete identificar ameaças antes que elas ocorram. A medida é considerada essencial para preservar a ordem.',
    choices: [
      {
        id: 'publish',
        text: 'PUBLICAR',
        effects: { population: -15, government: 15, paranoia: -10 },
        consequence: 'O governo reduzirá o monitoramento constante da sua residência.'
      },
      {
        id: 'ignore',
        text: 'IGNORAR',
        effects: { population: 10, government: -10, paranoia: 5 }
      }
    ]
  },

  // Rodada 8 - Informante
  {
    id: 'informant_children_detained',
    type: 'informante',
    title: 'Crianças são detidas por desenharem cartazes contra o governo na escola',
    description: 'Segundo testemunhas, agentes invadiram uma escola pública e levaram três estudantes de 10 a 12 anos para interrogatório após desenhos considerados subversivos. Professores que tentaram intervir foram afastados.',
    choices: [
      {
        id: 'publish',
        text: 'DIVULGAR',
        effects: { population: 20, government: -20, paranoia: 15 },
        consequence: 'Seus sobrinhos serão impedidos de frequentar a escola até nova ordem.'
      },
      {
        id: 'censor',
        text: 'CENSURAR',
        effects: { population: -20, government: 10, paranoia: -10 }
      }
    ]
  },

  // Rodada 9 - Assistente
  {
    id: 'assistant_news_mix',
    type: 'assistente',
    title: 'Destaques da Semana',
    description: 'Meu assistente chegou com 3 notícias, preciso escolher uma delas para publicar ainda hoje',
    choices: [
      {
        id: 'border_reinforcement',
        text: 'Governo reforça fronteiras para impedir entrada de "elementos indesejáveis"',
        effects: { population: -10, government: 10, paranoia: 5 },
        hiddenEffects: true
      },
      {
        id: 'energy_rationing',
        text: 'Novo plano de racionamento de energia promete aliviar gastos do Estado',
        effects: { population: -5, government: 5, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'trash_strike',
        text: 'Greve de coletores de lixo causa acúmulo de resíduos na capital',
        effects: { population: 5, government: -5, paranoia: 5 },
        hiddenEffects: true
      }
    ]
  },

  // Rodada 10 - Assistente
  {
    id: 'assistant_updates',
    type: 'assistente',
    title: 'Edição Vespertina',
    description: 'Meu assistente chegou com 3 notícias, preciso escolher uma delas para publicar ainda hoje',
    choices: [
      {
        id: 'internet_instability',
        text: 'Instabilidade na internet afeta serviços e irrita usuários',
        effects: { population: 5, government: -5, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'national_sports_day',
        text: 'Dia Nacional do Esporte reúne milhares em atividades promovidas pelo governo',
        effects: { population: -5, government: 10, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'public_tv_show',
        text: 'TV estatal lança novo programa cultural, mas corta verbas de rádios comunitárias',
        effects: { population: -5, government: 5, paranoia: 0 },
        hiddenEffects: true
      }
    ]
  },

  // Rodada 11 - Informante
  {
    id: 'informant_secret_prisons',
    type: 'informante',
    title: 'Revelações sobre prisões secretas ampliam medo na população',
    description: 'Informações confidenciais indicam que o governo mantém centros de detenção clandestinos onde opositores são mantidos sem julgamento e sujeitos a torturas.',
    choices: [
      {
        id: 'publish',
        text: 'DIVULGAR',
        effects: { population: 25, government: -30, paranoia: 25 },
        consequence: 'Você será monitorado constantemente e sua família sofrerá ameaças.'
      },
      {
        id: 'censor',
        text: 'CENSURAR',
        effects: { population: -25, government: 10, paranoia: -10 }
      }
    ]
  },

  // Rodada 12 - Agente
  {
    id: 'government_media_control',
    type: 'agente',
    title: 'Nova lei fortalece a comunicação nacional e preserva os valores patrióticos',
    description: 'O governo aprovou uma lei que regula e fortalece os meios de comunicação, garantindo que as mensagens veiculadas promovam a unidade, o orgulho nacional e a segurança do país.',
    choices: [
      {
        id: 'publish',
        text: 'PUBLICAR',
        effects: { population: -20, government: 20, paranoia: -15 },
        consequence: 'Sua influência será protegida e o governo reduzirá a vigilância sobre você.'
      },
      {
        id: 'ignore',
        text: 'IGNORAR',
        effects: { population: 15, government: -15, paranoia: 10 }
      }
    ]
  },

  // Rodada 13 - Assistente
  {
    id: 'assistant_daily_news',
    type: 'assistente',
    title: 'Manchetes Urgentes',
    description: 'Meu assistente chegou com 3 notícias, preciso escolher uma delas para publicar ainda hoje',
    choices: [
      {
        id: 'public_transport_issues',
        text: 'Usuários reclamam de superlotação em ônibus durante horários de pico',
        effects: { population: 5, government: -5, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'government_civic_campaign',
        text: 'Campanha governamental incentiva população a economizar água',
        effects: { population: -5, government: 5, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'local_market_closure',
        text: 'Fechamento temporário de mercado local gera insatisfação na comunidade',
        effects: { population: 5, government: -5, paranoia: 0 },
        hiddenEffects: true
      }
    ]
  },

  // Rodada 14 - Agente
  {
    id: 'government_cybersecurity_law',
    type: 'agente',
    title: 'Nova lei de cibersegurança protege a nação contra ameaças externas',
    description: 'O governo implementou uma legislação importante para combater ataques cibernéticos, impondo monitoramento reforçado de dispositivos com acesso a internet, garantindo a integridade das infraestruturas críticas e a soberania nacional.',
    choices: [
      {
        id: 'publish',
        text: 'PUBLICAR',
        effects: { population: -20, government: 20, paranoia: -20 },
        consequence: 'A fiscalização sobre suas atividades digitais será reduzida.'
      },
      {
        id: 'ignore',
        text: 'IGNORAR',
        effects: { population: 15, government: -15, paranoia: 15 }
      }
    ]
  },

  // Rodada 15 - Assistente
  {
    id: 'assistant_daily_briefs',
    type: 'assistente',
    title: 'Notícias em Destaque',
    description: 'Meu assistente chegou com 3 notícias, preciso escolher uma delas para publicar ainda hoje',
    choices: [
      {
        id: 'school_initiative',
        text: 'Projeto escolar incentiva educação digital, mas gera preocupação com excesso de exposição',
        effects: { population: -5, government: 5, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'city_parking_restrictions',
        text: 'Novas regras de estacionamento no centro causam protestos de comerciantes',
        effects: { population: 5, government: -5, paranoia: 0 },
        hiddenEffects: true
      },
      {
        id: 'local_park_cleanup',
        text: 'Mutirão comunitário para limpeza de parque público enfrenta dificuldades com falta de recursos',
        effects: { population: 5, government: -5, paranoia: 0 },
        hiddenEffects: true
      }
    ]
  }
];
