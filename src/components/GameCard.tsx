import { useState } from 'react';
import { Card, Choice } from '@/types/game';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GameCardProps {
  card: Card;
  onChoice: (choice: Choice, decisionTime: number) => void;
  isSkipped?: boolean;
}

export const GameCard = ({ card, onChoice, isSkipped = false }: GameCardProps) => {
  const [startTime] = useState(Date.now());
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoice = (choice: Choice) => {
    const decisionTime = Date.now() - startTime;
    setSelectedChoice(choice.id);
    setTimeout(() => onChoice(choice, decisionTime), 300);
  };

  const getCardTypeColor = (type: Card['type']) => {
    switch (type) {
      case 'assistente':
        return 'border-population/50 bg-population/5';
      case 'informante':
        return 'border-paranoia/50 bg-paranoia/5';
      case 'agente':
        return 'border-government/50 bg-government/5';
    }
  };

  const getCardTypeLabel = (type: Card['type']) => {
    switch (type) {
      case 'assistente':
        return 'ASSISTENTE';
      case 'informante':
        return 'INFORMANTE';
      case 'agente':
        return 'AGENTE DO GOVERNO';
    }
  };

  if (isSkipped) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="p-8 border border-muted/50 bg-muted/10 rounded-lg text-center">
          <p className="text-muted-foreground font-mono">
            [RODADA PULADA - HOSPITALIZACAO]
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className={cn(
        "p-6 border-2 rounded-lg transition-all duration-300",
        getCardTypeColor(card.type),
        "shadow-lg"
      )}>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono font-bold text-muted-foreground">
              {getCardTypeLabel(card.type)}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {card.type === 'assistente' && 'EFEITOS OCULTOS'}
              {card.type === 'informante' && 'CONSEQUÊNCIAS PESSOAIS'}
              {card.type === 'agente' && 'APENAS PONTUAÇÃO'}
            </span>
          </div>
          <h2 className="text-xl font-serif font-bold mb-3 text-foreground">
            {card.title}
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            {card.description}
          </p>
        </div>

        <div className="space-y-3">
          {card.choices.map((choice) => (
            <Button
              key={choice.id}
              variant="outline"
              className={cn(
                "w-full text-left justify-start p-4 h-auto transition-all duration-200",
                "hover:bg-muted/20 hover:border-ring/50",
                selectedChoice === choice.id && "bg-ring/10 border-ring"
              )}
              onClick={() => handleChoice(choice)}
              disabled={selectedChoice !== null}
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{choice.text}</span>
                {choice.consequence && (
                  <span className="text-xs text-destructive/80 font-mono">
                    AVISO: {choice.consequence}
                  </span>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};