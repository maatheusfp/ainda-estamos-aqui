import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlayerData } from '@/types/game';

interface DemographicFormProps {
  onSubmit: (data: PlayerData) => void;
}

export const DemographicForm = ({ onSubmit }: DemographicFormProps) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<PlayerData['gender']>('masculino');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!age || parseInt(age) < 18 || parseInt(age) > 99) {
      alert('Por favor, insira uma idade válida entre 18 e 99 anos.');
      return;
    }

    const playerData: PlayerData = {
      age: parseInt(age),
      gender,
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      startTime: Date.now()
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
                <Label htmlFor="age" className="font-mono">Idade</Label>
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
                  onValueChange={(value) => setGender(value as PlayerData['gender'])}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label htmlFor="masculino" className="font-normal">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feminino" id="feminino" />
                    <Label htmlFor="feminino" className="font-normal">Feminino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outro" id="outro" />
                    <Label htmlFor="outro" className="font-normal">Outro</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="p-4 border border-muted/50 bg-muted/10 rounded-lg">
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Você assumirá o papel de um jornalista durante um regime autoritário. 
              Suas decisões afetarão sua reputação com a população, o governo e seu 
              nível de paranoia. Os dados coletados serão utilizados apenas para 
              fins acadêmicos.
            </p>
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