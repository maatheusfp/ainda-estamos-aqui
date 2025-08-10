import { useEffect, useMemo, useRef } from 'react';
import { GameState, PlayerData, DecisionMetric } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSessionData } from '@/hooks/useSessionData';
import { useSimpleEmailSender } from '@/hooks/useSimpleEmailSender';
import { Mail, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

interface GameEndProps {
  gameState: GameState;
  playerData: PlayerData;
  decisions: DecisionMetric[];
  onRestart: () => void;
  gameStartTime?: Date;
}

export const GameEnd = ({ gameState, playerData, decisions, onRestart, gameStartTime }: GameEndProps) => {
  const { exportSessionData } = useSessionData();
  const { sendSessionDataByEmail, isLoading, status, clearStatus } = useSimpleEmailSender();
  
  // Usar sessionId como chave única para evitar re-envios
  const sessionKey = `sent_${playerData.sessionId}`;
  const hasSentData = useRef(false);
  
  // Configuração do email (memoizada para evitar re-renders desnecessários)
  const emailConfig = useMemo(() => ({
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
    recipientEmail: import.meta.env.VITE_RECIPIENT_EMAIL || 'pesquisa.jogos@ufpe.br'
  }), []);

  // Envio automático dos dados quando o componente é montado (apenas uma vez por sessão)
  useEffect(() => {
    // Verificar se já enviou os dados para esta sessão específica
    if (hasSentData.current || sessionStorage.getItem(sessionKey)) {
      return;
    }

    const sendDataAutomatically = async () => {
      try {
        hasSentData.current = true;
        sessionStorage.setItem(sessionKey, 'true'); // Marcar no sessionStorage também
        
        const startTime = gameStartTime || new Date(playerData.startTime);
        const sessionData = exportSessionData(playerData, gameState, decisions, startTime);
        
        await sendSessionDataByEmail(sessionData, emailConfig);
      } catch (error) {
        console.error('Erro ao enviar dados automaticamente:', error);
        hasSentData.current = false;
        sessionStorage.removeItem(sessionKey); // Remover marca em caso de erro
      }
    };

    // Enviar dados após um pequeno delay para dar tempo da tela carregar
    const timer = setTimeout(() => {
      sendDataAutomatically();
    }, 1000);

    return () => clearTimeout(timer);
  }, [sessionKey, gameStartTime, playerData, gameState, decisions, exportSessionData, sendSessionDataByEmail, emailConfig]);
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
            Seus dados estão sendo enviados automaticamente para análise e contribuirão para pesquisas sobre tomada de decisão em contextos autoritários.
          </p>
          <p className="text-xs text-muted-foreground font-mono mb-4">
            Universidade Federal de Pernambuco - Centro de Informática<br/>
            Disciplina: Jogos e Dilemas Sociais (2025)<br/>
            ID da Sessão: {playerData.sessionId}
          </p>
          
          {/* Status do envio automático */}
          <div className="mb-4">
            {isLoading && (
              <Alert className="border-blue-500">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <AlertDescription className="text-blue-700">
                  Enviando dados da sessão automaticamente...
                </AlertDescription>
              </Alert>
            )}
            
            {status.message && !isLoading && (
              <Alert className={`${status.type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
                {status.type === 'error' ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                <AlertDescription className={status.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                  {status.message}
                  {status.type === 'success' && (
                    <>
                      <br />
                      <span className="text-sm">Dados enviados para: {emailConfig.recipientEmail}</span>
                    </>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {!isLoading && !status.message && (
              <Alert className="border-gray-500">
                <Mail className="h-4 w-4" />
                <AlertDescription className="text-gray-700">
                  Os dados desta sessão serão enviados automaticamente em alguns segundos...
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={onRestart} 
              variant="outline" 
              className="font-mono border-2 border-foreground hover:bg-muted/30 px-8"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              JOGAR NOVAMENTE
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};