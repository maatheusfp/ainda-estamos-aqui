import { useState } from "react";
import { Card, Choice } from "@/types/game";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameCardProps {
  card: Card | null;
  onChoice: (choice: Choice, decisionTime: number) => void;
  isSkipped?: boolean;
  onStartGame?: () => void;
}

export const GameCard = ({
  card,
  onChoice,
  isSkipped = false,
  onStartGame,
}: GameCardProps) => {
  const [startTime] = useState(Date.now());
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(card == null);

  console.log(
    "GameCard rendered with card:",
    card?.id,
    "selectedChoice:",
    selectedChoice
  );

  const handleChoice = (choice: Choice) => {
    console.log("Button clicked for choice:", choice.id);
    console.log("Selected choice before:", selectedChoice);

    if (selectedChoice !== null) {
      console.log("Button disabled - choice already selected");
      return;
    }

    const decisionTime = Date.now() - startTime;
    setSelectedChoice(choice.id);
    console.log("Choice selected:", choice.id, "Decision time:", decisionTime);
    setTimeout(() => {
      console.log("Calling onChoice callback");
      onChoice(choice, decisionTime);
    }, 300);
  };

  const getCardTypeColor = (type: Card["type"]) => {
    switch (type) {
      case "assistente":
        return "border-population/50 bg-population/5";
      case "informante":
        return "border-paranoia/50 bg-paranoia/5";
      case "agente":
        return "border-government/50 bg-government/5";
    }
  };

  const getCardTypeLabel = (type: Card["type"]) => {
    switch (type) {
      case "assistente":
        return "ASSISTENTE";
      case "informante":
        return "INFORMANTE";
      case "agente":
        return "AGENTE DO GOVERNO";
    }
  };

  if (showIntro) {
    return (
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
            onClick={() => {
              setShowIntro(false);
              if (onStartGame) onStartGame();
            }}
          >
            Começar Jogo
          </Button>
        </div>
      </div>
    );
  }

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
    <div className="w-full max-w-4xl mx-auto">
      <div
        className={cn(
          "p-8 border-4 border-foreground bg-card transition-all duration-300",
          "shadow-xl newspaper-style"
        )}
      >
        {/* Header do jornal */}
        <div className="border-b-4 border-foreground mb-6 pb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-mono font-bold text-foreground uppercase tracking-wider">
              {getCardTypeLabel(card.type)}
            </span>
            <span className="text-sm font-mono text-foreground uppercase tracking-wider">
              EDIÇÃO ESPECIAL
            </span>
          </div>
        </div>

        {/* Manchete principal */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-serif font-black mb-4 text-foreground uppercase tracking-wide leading-tight">
            {card.title}
          </h1>
          <div className="w-full h-1 bg-foreground mb-6"></div>
          <p className="text-lg font-newspaper leading-relaxed text-foreground max-w-3xl mx-auto">
            {card.description}
          </p>
        </div>

        {/* Área de decisões estilo jornal */}
        <div className="border-t-2 border-foreground pt-6">
          <h3 className="text-xl font-serif font-bold mb-4 text-center text-foreground uppercase">
            {card.type === "assistente"
              ? "Escolha a manchete para publicar"
              : "Decisão editorial"}
          </h3>
          <div
            className={cn(
              "grid gap-4",
              card.type === "assistente"
                ? "grid-cols-1 md:grid-cols-3"
                : "grid-cols-2"
            )}
          >
            {card.choices.map((choice, index) => (
              <Button
                key={choice.id}
                variant="outline"
                className={cn(
                  "h-auto p-4 border-2 border-foreground bg-card hover:bg-muted/30",
                  "transition-all duration-200 text-left justify-start overflow-hidden",
                  card.type === "informante"
                    ? "text-center justify-center"
                    : "text-left justify-start",
                  "hover:text-foreground/80", // <- hover mais escuro
                  selectedChoice === choice.id && "bg-muted/50 text-foreground",
                  card.type === "assistente" ? "min-h-[100px]" : "min-h-[80px]"
                )}
                onClick={() => handleChoice(choice)}
                disabled={selectedChoice !== null}
              >
                <div className="flex flex-col gap-2 w-full">
                  {card.type === "assistente" ? (
                    <div className="text-center">
                      <span className="font-serif font-bold text-sm leading-tight block break-words whitespace-normal w-full">
                        {choice.text}
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="font-serif font-bold text-lg uppercase tracking-wide break-words whitespace-normal w-full">
                        {choice.text}
                      </span>
                      {choice.consequence && (
                        <span className="text-xs text-destructive font-mono italic break-words whitespace-normal w-full">
                          {choice.consequence}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
