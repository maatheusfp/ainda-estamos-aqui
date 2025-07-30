import { PlayerData, GameState, DecisionMetric } from '@/types/game';

export interface SessionData {
  playerData: PlayerData;
  gameMetrics: {
    totalRounds: number;
    finalScores: {
      population: number;
      government: number;
      paranoia: number;
    };
    decisions: DecisionMetric[];
    consequences: string[];
    gameEndReason: 'completed' | 'population_zero' | 'government_zero';
  };
  sessionInfo: {
    startTime: string;
    endTime: string;
    totalPlayTime: number; // em minutos
  };
}

export const useSessionData = () => {
  
  const exportSessionData = (
    playerData: PlayerData,
    gameState: GameState,
    decisions: DecisionMetric[],
    startTime: Date
  ): SessionData => {
    const endTime = new Date();
    const totalPlayTime = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
    
    let gameEndReason: SessionData['gameMetrics']['gameEndReason'] = 'completed';
    if (gameState.scores.population === 0) gameEndReason = 'population_zero';
    if (gameState.scores.government === 0) gameEndReason = 'government_zero';

    const sessionData: SessionData = {
      playerData,
      gameMetrics: {
        totalRounds: gameState.round,
        finalScores: gameState.scores,
        decisions,
        consequences: gameState.consequences,
        gameEndReason
      },
      sessionInfo: {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        totalPlayTime
      }
    };

    return sessionData;
  };

  const downloadSessionData = (sessionData: SessionData) => {
    const fileName = `sessao_jogo_${sessionData.playerData.age}anos_${new Date().toISOString().split('T')[0]}.json`;
    const jsonString = JSON.stringify(sessionData, null, 2);
    
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  return {
    exportSessionData,
    downloadSessionData
  };
};