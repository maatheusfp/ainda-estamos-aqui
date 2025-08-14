export interface PlayerData {
  age: number;
  gender: "masculino" | "feminino" | "outro";
  political: number;
  sessionId: string;
  startTime: number;
}

export interface GameState {
  round: number;
  scores: {
    population: number;
    government: number;
    paranoia: number;
  };
  consequences: string[];
  isGameOver: boolean;
  finalOutcome?: string;
}

export interface Card {
  id: string;
  type: "assistente" | "informante" | "agente";
  title: string;
  description: string;
  choices: Choice[];
}

export interface Choice {
  id: string;
  text: string;
  effects: {
    population?: number;
    government?: number;
    paranoia?: number;
  };
  consequence?: string;
  hiddenEffects?: boolean;
}

export interface DecisionMetric {
  roundNumber: number;
  cardType: string;
  choiceId: string;
  decisionTime: number;
  populationBefore: number;
  governmentBefore: number;
  paranoiaBefore: number;
  populationAfter: number;
  governmentAfter: number;
  paranoiaAfter: number;
}

export interface GameSession {
  playerData: PlayerData;
  decisions: DecisionMetric[];
  finalScores: GameState["scores"];
  finalOutcome: string;
  totalTime: number;
}
