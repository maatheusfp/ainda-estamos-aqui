import { useState } from 'react';
import { PlayerData, Choice } from '@/types/game';
import { DemographicForm } from '@/components/DemographicForm';
import { GameCard } from '@/components/GameCard';
import { ScoreDisplay } from '@/components/ScoreDisplay';
import { GameEnd } from '@/components/GameEnd';
import { useGameLogic } from '@/hooks/useGameLogic';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  
  const {
    gameState,
    decisions,
    makeDecision,
    getCurrentCard,
    shouldSkipCurrentRound,
    resetGame
  } = useGameLogic(playerData);

  const handleDemographicSubmit = (data: PlayerData) => {
    setPlayerData(data);
    setGameStarted(true);
  };

  const handleChoice = (choice: Choice, decisionTime: number) => {
    makeDecision(choice, decisionTime);
  };

  const handleRestart = () => {
    setPlayerData(null);
    setGameStarted(false);
    resetGame();
  };

  // Tela inicial - coleta de dados demográficos
  if (!playerData || !gameStarted) {
    return <DemographicForm onSubmit={handleDemographicSubmit} />;
  }

  // Tela final do jogo
  if (gameState.isGameOver) {
    return (
      <GameEnd
        gameState={gameState}
        playerData={playerData}
        decisions={decisions}
        onRestart={handleRestart}
      />
    );
  }

  const currentCard = getCurrentCard();
  const isSkipped = shouldSkipCurrentRound();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold mb-2 text-foreground">
            AINDA ESTAMOS AQUI
          </h1>
          <p className="text-muted-foreground font-mono text-sm mb-4">
            Rodada {gameState.round + 1} de {16} • Jornalista em Regime Autoritário
          </p>
        </div>

        {/* Pontuações */}
        <div className="mb-8">
          <ScoreDisplay gameState={gameState} />
        </div>

        {/* Carta do Jogo */}
        <div className="mb-8">
          {currentCard ? (
            <GameCard
              key={`${currentCard.id}-${gameState.round}`}
              card={currentCard}
              onChoice={handleChoice}
              isSkipped={isSkipped}
            />
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground font-mono">Carregando próxima decisão...</p>
            </div>
          )}
        </div>

        {/* Botão de emergência para reiniciar */}
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRestart}
            className="font-mono text-xs"
          >
            Reiniciar Experimento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
