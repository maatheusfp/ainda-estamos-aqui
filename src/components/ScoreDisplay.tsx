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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* População */}
        <div className="p-4 border border-population/30 bg-population/5 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-mono font-bold text-population">POPULAÇÃO</h3>
            <span className="font-mono text-lg font-bold text-population">
              {displayedPopulation}
            </span>
          </div>
          <Progress
            value={displayedPopulation}
            className="h-2"
            style={
              {
                "--progress-background": "hsl(var(--population))",
              } as React.CSSProperties
            }
          />
          {scores.paranoia > 0 && (
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              ±{Math.floor(scores.paranoia / 2)} margem de erro
            </p>
          )}
        </div>

        {/* Governo */}
        <div className="p-4 border border-government/30 bg-government/5 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-mono font-bold text-government">GOVERNO</h3>
            <span className="font-mono text-lg font-bold text-government">
              {displayedGovernment}
            </span>
          </div>
          <Progress
            value={displayedGovernment}
            className="h-2"
            style={
              {
                "--progress-background": "hsl(var(--government))",
              } as React.CSSProperties
            }
          />
          {scores.paranoia > 0 && (
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              ±{Math.floor(scores.paranoia / 2)} margem de erro
            </p>
          )}
        </div>

        {/* Paranoia */}
        {showParanoia && (
          <div className="p-4 border border-paranoia/30 bg-paranoia/5 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-mono font-bold text-paranoia">PARANOIA</h3>
              <span className="font-mono text-lg font-bold text-paranoia">
                {scores.paranoia}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              {/* A barra agora vai de 0 a 100 sempre */}
              <div
                className="h-full bg-paranoia transition-all duration-300"
                style={{
                  width: `${Math.min(100, (scores.paranoia / 100) * 100)}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              Afeta percepção das pontuações
            </p>
          </div>
        )}
      </div>

      {/* Consequências Ativas */}
      {gameState.consequences.length > 0 && (
        <div className="mt-4 p-4 border border-destructive/30 bg-destructive/5 rounded-lg">
          <h4 className="font-mono font-bold text-destructive mb-2">
            CONSEQUÊNCIAS ATIVAS:
          </h4>
          <ul className="space-y-1">
            {gameState.consequences.map((consequence, index) => (
              <li key={index} className="text-sm font-mono text-destructive/90">
                • {consequence}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
