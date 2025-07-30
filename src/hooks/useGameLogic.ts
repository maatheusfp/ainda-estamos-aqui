import { useState, useCallback } from "react";
import { GameState, Choice, DecisionMetric, PlayerData } from "@/types/game";
import { gameCards } from "@/data/cards";

export const useGameLogic = (playerData: PlayerData | null) => {
  const [gameState, setGameState] = useState<GameState>({
    round: 0,
    scores: {
      population: 50,
      government: 50,
      paranoia: 0,
    },
    consequences: [],
    isGameOver: false,
  });

  const [decisions, setDecisions] = useState<DecisionMetric[]>([]);
  const [skipNextRound, setSkipNextRound] = useState(false);

  const makeDecision = useCallback(
    (choice: Choice, decisionTime: number) => {
      if (!playerData) return;

      console.log(
        "Making decision:",
        choice.id,
        "Current round:",
        gameState.round
      );

      setGameState((prevState) => {
        console.log("Previous state:", prevState);
        // Aumentar paranoia mais rapidamente
        const paranoiaIncrease =
          (choice.effects.paranoia || 0) * 1.5 +
          (Math.abs(choice.effects.population || 0) +
            Math.abs(choice.effects.government || 0)) *
            0.2;
        const newScores = {
          population: Math.max(
            0,
            Math.min(
              100,
              prevState.scores.population + (choice.effects.population || 0)
            )
          ),
          government: Math.max(
            0,
            Math.min(
              100,
              prevState.scores.government + (choice.effects.government || 0)
            )
          ),
          paranoia: Math.max(
            0,
            Math.min(
              100,
              Math.round(prevState.scores.paranoia + paranoiaIncrease)
            )
          ),
        };
        console.log("New scores:", newScores);

        // Registrar métrica da decisão
        const metric: DecisionMetric = {
          roundNumber: prevState.round + 1,
          cardType: gameCards[prevState.round]?.type || "unknown",
          choiceId: choice.id,
          decisionTime,
          populationBefore: prevState.scores.population,
          governmentBefore: prevState.scores.government,
          paranoiaBefore: prevState.scores.paranoia,
          populationAfter: newScores.population,
          governmentAfter: newScores.government,
          paranoiaAfter: newScores.paranoia,
        };

        setDecisions((prev) => [...prev, metric]);

        // Gerenciar consequências
        let newConsequences = [...prevState.consequences];

        if (choice.consequence) {
          if (choice.consequence.includes("hospitalizado")) {
            setSkipNextRound(true);
          } else if (choice.consequence.includes("removidas")) {
            newConsequences = [];
          } else {
            newConsequences.push(choice.consequence);
          }
        }

        // Verificar se deve pular a próxima rodada
        if (choice.consequence?.includes("hospitalizado")) {
          newConsequences.push("Hospitalizacao - próxima rodada será pulada");
        }

        // Verificar condições de fim de jogo
        const nextRound = prevState.round + 1;
        const isGameOver =
          nextRound >= gameCards.length ||
          newScores.population === 0 ||
          newScores.government === 0;

        console.log("Next round:", nextRound, "Is game over:", isGameOver);

        const newState = {
          ...prevState,
          round: nextRound,
          scores: newScores,
          consequences: newConsequences,
          isGameOver,
        };

        console.log("New state:", newState);
        return newState;
      });
    },
    [playerData]
  );

  const getCurrentCard = useCallback(() => {
    console.log(
      "getCurrentCard called - round:",
      gameState.round,
      "total cards:",
      gameCards.length
    );
    if (gameState.round >= gameCards.length) {
      console.log("No more cards - round exceeds available cards");
      return null;
    }
    const card = gameCards[gameState.round];
    console.log("Returning card:", card?.id, card?.title);
    return card;
  }, [gameState.round]);

  const shouldSkipCurrentRound = useCallback(() => {
    if (skipNextRound) {
      setSkipNextRound(false);
      setGameState((prev) => ({
        ...prev,
        round: prev.round + 1,
        consequences: prev.consequences.filter(
          (c) => !c.includes("Hospitalizacao")
        ),
      }));
      return true;
    }
    return false;
  }, [skipNextRound]);

  const resetGame = useCallback(() => {
    setGameState({
      round: 0,
      scores: {
        population: 50,
        government: 50,
        paranoia: 0,
      },
      consequences: [],
      isGameOver: false,
    });
    setDecisions([]);
    setSkipNextRound(false);
  }, []);

  // Função para calcular a margem de erro baseada na paranoia
  const getErrorMargin = () => {
    // Margem de erro mínima 2, máxima 20
    const paranoia = gameState.scores.paranoia;
    return Math.max(2, Math.round((paranoia / 100) * 20));
  };

  // Função para retornar score "percebido" com margem de erro
  const getScoreWithError = (scoreName: "population" | "government") => {
    const real = gameState.scores[scoreName];
    const margin = getErrorMargin();
    const half = Math.floor(margin / 2);
    const min = Math.max(0, real - half);
    const max = Math.min(100, real + half);
    // Valor "percebido" aleatório dentro do range
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return {
    gameState,
    decisions,
    makeDecision,
    getCurrentCard,
    shouldSkipCurrentRound,
    resetGame,
    getErrorMargin,
    getScoreWithError,
  };
};
