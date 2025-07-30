import { GameState, PlayerData, DecisionMetric } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSessionData } from '@/hooks/useSessionData';
import { Download } from 'lucide-react';

interface GameEndProps {
  gameState: GameState;
  playerData: PlayerData;
  decisions: DecisionMetric[];
  onRestart: () => void;
  gameStartTime?: Date;
}

export const GameEnd = ({ gameState, playerData, decisions, onRestart, gameStartTime }: GameEndProps) => {
  const { exportSessionData, downloadSessionData } = useSessionData();
  const getFinalOutcome = (scores: GameState['scores']) => {
    const { population, government } = scores;
    const difference = Math.abs(population - government);
    
    if (population === 0) {
      return {
        title: "LINCHADO PELA POPULAÇÃO",
        description: "Suas decisões levaram a população ao desespero total. Em um ato de fúria coletiva, você foi responsabilizado pelos males da sociedade.",
        color: "destructive"
      };
    }
    
    if (government === 0) {
      return {
        title: "MORTE OU EXILAMENTO",
        description: "O governo colapsou completamente. Em meio ao caos, você foi forçado ao exílio ou pior destino por suas ações contra o regime.",
        color: "destructive"
      };
    }
    
    if (population > government && difference >= 15) {
      return {
        title: "REVOLUÇÃO",
        description: "Suas reportagens inspiraram a população a se levantar. O regime autoritário foi derrubado e uma nova era de liberdade começou.",
        color: "population"
      };
    }
    
    if (government > population && difference >= 15) {
      return {
        title: "POPULAÇÃO ALIENADA (1984)",
        description: "O governo consolidou seu controle total. A população foi completamente doutrinada e você se tornou parte da máquina de propaganda.",
        color: "government"
      };
    }
    
    return {
      title: "RELEGADO AO ESQUECIMENTO",
      description: "Nem a população nem o governo consideram você relevante. Sua carreira jornalística termina na obscuridade e indiferença geral.",
      color: "muted"
    };
  };

  const outcome = getFinalOutcome(gameState.scores);
  const totalTime = Math.round((Date.now() - playerData.startTime) / 1000);
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'population':
        return 'border-population/50 bg-population/5 text-population';
      case 'government':
        return 'border-government/50 bg-government/5 text-government';
      case 'destructive':
        return 'border-destructive/50 bg-destructive/5 text-destructive';
      default:
        return 'border-muted/50 bg-muted/5 text-muted-foreground';
    }
  };

  
  const handleDownloadData = () => {
    try {
      const startTime = gameStartTime || new Date(playerData.startTime);
      const sessionData = exportSessionData(playerData, gameState, decisions, startTime);
      downloadSessionData(sessionData);
    } catch (error) {
      console.error('Erro ao baixar dados:', error);
      // Fallback simples
      const simpleData = {
        playerData,
        decisions,
        finalScores: gameState.scores,
        finalOutcome: outcome.title,
        timestamp: new Date().toISOString()
      };
      const jsonString = JSON.stringify(simpleData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sessao_jogo_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* Resultado Final */}
        <Card className={`p-8 text-center ${getColorClasses(outcome.color)}`}>
          <h1 className="text-2xl font-serif font-bold mb-4">
            {outcome.title}
          </h1>
          <p className="text-base leading-relaxed mb-6">
            {outcome.description}
          </p>
          
          {/* Pontuações Finais */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="font-mono text-sm text-muted-foreground">POPULAÇÃO</p>
              <p className="font-mono text-xl font-bold text-population">
                {gameState.scores.population}
              </p>
            </div>
            <div className="text-center">
              <p className="font-mono text-sm text-muted-foreground">GOVERNO</p>
              <p className="font-mono text-xl font-bold text-government">
                {gameState.scores.government}
              </p>
            </div>
            <div className="text-center">
              <p className="font-mono text-sm text-muted-foreground">PARANOIA</p>
              <p className="font-mono text-xl font-bold text-paranoia">
                {gameState.scores.paranoia}
              </p>
            </div>
          </div>
        </Card>

        {/* Estatísticas da Sessão */}
        <Card className="p-6">
          <h2 className="font-serif font-bold text-lg mb-4">Estatísticas da Sessão</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="font-mono text-sm text-muted-foreground">TEMPO TOTAL</p>
              <p className="font-mono text-lg font-bold">{Math.floor(totalTime / 60)}min {totalTime % 60}s</p>
            </div>
            <div>
              <p className="font-mono text-sm text-muted-foreground">DECISÕES</p>
              <p className="font-mono text-lg font-bold">{decisions.length}</p>
            </div>
            <div>
              <p className="font-mono text-sm text-muted-foreground">TEMPO MÉDIO</p>
              <p className="font-mono text-lg font-bold">
                {decisions.length > 0 ? Math.round(decisions.reduce((acc, d) => acc + d.decisionTime, 0) / decisions.length / 1000) : 0}s
              </p>
            </div>
            <div>
              <p className="font-mono text-sm text-muted-foreground">IDADE</p>
              <p className="font-mono text-lg font-bold">{playerData.age}</p>
            </div>
          </div>
        </Card>

        {/* Agradecimento */}
        <Card className="p-6 text-center">
          <h3 className="font-serif font-bold text-lg mb-2">Obrigado pela Participação!</h3>
          <p className="text-muted-foreground mb-4">
            Seus dados contribuirão para pesquisas sobre tomada de decisão em contextos autoritários.
          </p>
          <p className="text-xs text-muted-foreground font-mono mb-4">
            Universidade Federal de Pernambuco - Centro de Informática<br/>
            Disciplina: Jogos e Dilemas Sociais (2025)<br/>
            ID da Sessão: {playerData.sessionId}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleDownloadData} 
              variant="default" 
              className="flex-1 font-mono bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-foreground"
            >
              <Download className="mr-2 h-4 w-4" />
              BAIXAR DADOS JSON
            </Button>
            <Button 
              onClick={onRestart} 
              variant="outline" 
              className="flex-1 font-mono border-2 border-foreground hover:bg-muted/30"
            >
              JOGAR NOVAMENTE
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};