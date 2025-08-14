import { GameState } from "@/types/game";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ScoreDisplayProps {
  gameState: GameState;
  showParanoia?: boolean;
}

export const ScoreDisplay = ({
  gameState,
  showParanoia = true,
}: ScoreDisplayProps) => {
  const { scores } = gameState;

  // Aplicar efeito de paranoia na visualização
  const getDistortedScore = (realScore: number, paranoia: number) => {
    if (paranoia === 0) return realScore;

    const distortionRange = Math.floor(paranoia / 2);
    const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
    const distortion = randomFactor * distortionRange;

    return Math.max(0, Math.min(100, Math.floor(realScore + distortion)));
  };

  const displayedPopulation = getDistortedScore(
    scores.population,
    scores.paranoia
  );
  const displayedGovernment = getDistortedScore(
    scores.government,
    scores.paranoia
  );
  const margin = Math.floor(scores.paranoia / 2);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        {/* População */}
        <div className="p-2 md:p-4 border border-population/30 bg-population/5 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-mono font-bold text-population">POPULAÇÃO</h3>
            <span className="font-mono text-lg font-bold text-population">
              {displayedPopulation}
            </span>
          </div>
          <div className="relative w-full">
            {/* Barra base azul */}
            <Progress
              value={scores.population}
              className="h-2"
              style={
                {
                  "--progress-background": "hsl(var(--population))",
                } as React.CSSProperties
              }
            />
            {/* Barra amarela de margem de erro */}
            {scores.paranoia > 0 && (
              <div
                className="absolute top-0 left-0 h-2 bg-yellow-400 pointer-events-none rounded"
                style={{
                  left: `${Math.max(0, scores.population - margin)}%`,
                  width: `${
                    Math.min(100, scores.population + margin) -
                    Math.max(0, scores.population - margin)
                  }%`,
                  minWidth: margin > 0 ? "8px" : "0",
                  zIndex: 2,
                }}
              />
            )}
          </div>
          {scores.paranoia > 0 && (
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              ±{margin} margem de erro
            </p>
          )}
        </div>

        {/* Governo */}
        <div className="p-2 md:p-4 border border-government/30 bg-government/5 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-mono font-bold text-government">GOVERNO</h3>
            <span className="font-mono text-lg font-bold text-government">
              {displayedGovernment}
            </span>
          </div>
          <div className="relative w-full">
            {/* Barra base vermelha */}
            <Progress
              value={scores.government}
              className="h-2"
              style={
                {
                  "--progress-background": "hsl(var(--government))",
                } as React.CSSProperties
              }
            />
            {/* Barra amarela de margem de erro */}
            {scores.paranoia > 0 && (
              <div
                className="absolute top-0 left-0 h-2 bg-yellow-400 pointer-events-none rounded"
                style={{
                  left: `${Math.max(0, scores.government - margin)}%`,
                  width: `${
                    Math.min(100, scores.government + margin) -
                    Math.max(0, scores.government - margin)
                  }%`,
                  minWidth: margin > 0 ? "8px" : "0",
                  zIndex: 2,
                }}
              />
            )}
          </div>
          {scores.paranoia > 0 && (
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              ±{margin} margem de erro
            </p>
          )}
        </div>
      </div>

      {/* Consequências Ativas removidas */}
    </div>
  );
};
