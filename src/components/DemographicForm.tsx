import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlayerData } from "@/types/game";

type PoliticalPosition = "1" | "2" | "3" | "4" | "5" | "nao_respondeu";

interface DemographicFormProps {
  onSubmit: (data: PlayerData & { political?: string }) => void;
}

export const DemographicForm = ({ onSubmit }: DemographicFormProps) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<PlayerData["gender"]>("masculino");
  const [political, setPolitical] =
    useState<PoliticalPosition>("nao_respondeu");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!age || parseInt(age) < 18 || parseInt(age) > 99) {
      alert("Por favor, insira uma idade válida entre 18 e 99 anos.");
      return;
    }

    const playerData: PlayerData & { political?: string } = {
      age: parseInt(age),
      gender,
      political,
      sessionId: `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      startTime: Date.now(),
    };

    onSubmit(playerData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-4 text-foreground">
            AINDA ESTAMOS AQUI
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            Experimento sobre Dilemas Sociais
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Universidade Federal de Pernambuco
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-lg font-serif font-bold mb-4 text-card-foreground">
              Dados Demográficos
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="age" className="font-mono">
                  Idade
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="99"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Digite sua idade"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label className="font-mono">Gênero</Label>
                <RadioGroup
                  value={gender}
                  onValueChange={(value) =>
                    setGender(value as PlayerData["gender"])
                  }
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label htmlFor="masculino" className="font-normal">
                      Masculino
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feminino" id="feminino" />
                    <Label htmlFor="feminino" className="font-normal">
                      Feminino
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outro" id="outro" />
                    <Label htmlFor="outro" className="font-normal">
                      Outro
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div>
              <Label className="font-mono mt-4 block">
                Posicionamento Político
              </Label>
              <div className="h-3" />
              <RadioGroup
                value={political}
                onValueChange={(value) =>
                  setPolitical(value as PoliticalPosition)
                }
                className="mt-2"
              >
                <div className="flex items-center gap-2 mb-2 w-full justify-center">
                  <span className="text-xs text-muted-foreground mr-1">
                    Esquerda
                  </span>
                  {["1", "2", "3", "4", "5"].map((val) => (
                    <div key={val} className="flex flex-col items-center mx-1">
                      <RadioGroupItem value={val} id={"politico-" + val} />
                      <Label
                        htmlFor={"politico-" + val}
                        className="font-normal text-xs"
                      >
                        {val}
                      </Label>
                    </div>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    Direita
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="nao_respondeu"
                    id="politico-nao-respondeu"
                  />
                  <Label
                    htmlFor="politico-nao-respondeu"
                    className="font-normal"
                  >
                    Prefiro não responder
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full h-12 font-mono font-bold"
            variant="default"
          >
            INICIAR EXPERIMENTO
          </Button>
        </form>
      </div>
    </div>
  );
};
