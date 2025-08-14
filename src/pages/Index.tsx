import { useState } from "react";
import { PlayerData, Choice } from "@/types/game";
import { DemographicForm } from "@/components/DemographicForm";
import { GameCard } from "@/components/GameCard";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { GameEnd } from "@/components/GameEnd";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useSessionData } from "@/hooks/useSessionData";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [gameStartTime] = useState<Date>(new Date());

  const {
    gameState,
    decisions,
    makeDecision,
    getCurrentCard,
    shouldSkipCurrentRound,
    resetGame,
  } = useGameLogic(playerData);

  const { exportSessionData, downloadSessionData } = useSessionData();

  const handleDemographicSubmit = (data: PlayerData) => {
    setPlayerData(data);
    setShowIntro(true);
  };

  const handleStartGame = () => {
    setShowIntro(false);
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

  if (!playerData) {
    return <DemographicForm onSubmit={handleDemographicSubmit} />;
  }

  if (showIntro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] p-4">
          <div className="bg-card border-2 border-foreground rounded-lg shadow-xl p-6 sm:p-10 text-center">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-foreground">
              Bem-vindo ao Diário de Lúmenia
            </h1>
            <p className="text-base sm:text-lg text-foreground mb-6 font-newspaper leading-relaxed">
              Você é o editor-chefe do principal jornal de Lúmenia, um país
              fictício mergulhado em uma ditadura cada vez mais repressiva. O
              movimento antigoverno cresce nas ruas, mas as autoridades
              intensificam a vigilância e a censura.
              <br />
              <br />
              Sua missão é escolher, a cada dia, qual será a manchete de capa do
              jornal. Suas decisões podem inspirar mudanças, mas também colocar
              sua vida pessoal e sua equipe em risco. Equilibre suas convicções
              políticas com as consequências reais de cada escolha.
              <br />
              <br />
              Até onde você irá para defender a verdade?
            </p>
            <Button
              className="mt-2 px-8 py-2 text-lg font-mono"
              onClick={handleStartGame}
            >
              Começar Jogo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Tela final do jogo
  if (gameState.isGameOver) {
    return (
      <GameEnd
        gameState={gameState}
        playerData={playerData}
        decisions={decisions}
        onRestart={handleRestart}
        gameStartTime={gameStartTime}
      />
    );
  }

  const currentCard = getCurrentCard();
  const isSkipped = shouldSkipCurrentRound();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header estilo jornal */}
        <div className="text-center mb-8 border-b-4 border-foreground pb-6">
          <h1 className="text-6xl font-serif font-black mb-4 text-foreground uppercase tracking-widest">
            Ainda Estamos Aqui
          </h1>
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-px bg-foreground flex-1"></div>
            <p className="text-foreground font-mono text-sm uppercase tracking-wider px-4">
              Edição {gameState.round + 1} de 16 • Jornalista em Regime
              Autoritário
            </p>
            <div className="h-px bg-foreground flex-1"></div>
          </div>
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
              <p className="text-muted-foreground font-mono">
                Carregando próxima decisão...
              </p>
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
