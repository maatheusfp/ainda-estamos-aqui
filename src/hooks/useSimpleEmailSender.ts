import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { SessionData } from './useSessionData';

interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  recipientEmail: string;
}

export const useSimpleEmailSender = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const sendSessionDataByEmail = async (
    sessionData: SessionData,
    config: EmailConfig
  ): Promise<boolean> => {
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      // Converter dados da sessão para texto formatado
      const sessionDataText = formatSessionDataAsText(sessionData);
      
      // Preparar parâmetros do template (sem anexo, apenas no corpo do email)
      const templateParams = {
        to_email: config.recipientEmail,
        from_name: import.meta.env.VITE_FROM_NAME || 'Sistema Ainda Estamos Aqui',
        subject: `Dados da Sessão - ID: ${sessionData.playerData.sessionId}`,
        message: sessionDataText,
        participant_age: sessionData.playerData.age,
        session_id: sessionData.playerData.sessionId,
        total_time: sessionData.sessionInfo.totalPlayTime,
        final_population: sessionData.gameMetrics.finalScores.population,
        final_government: sessionData.gameMetrics.finalScores.government,
        final_paranoia: sessionData.gameMetrics.finalScores.paranoia
      };

      const result = await emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams,
        config.publicKey
      );

      setStatus({
        type: 'success',
        message: 'Dados enviados com sucesso!'
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao enviar dados por email:', error);
      setStatus({
        type: 'error',
        message: 'Erro ao enviar dados. Tente novamente.'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const formatSessionDataAsText = (sessionData: SessionData): string => {
    const { playerData, gameMetrics, sessionInfo } = sessionData;
    
    let text = '';
    text += '='.repeat(60) + '\n';
    text += 'DADOS DA SESSÃO - AINDA ESTAMOS AQUI\n';
    text += '='.repeat(60) + '\n\n';
    
    // Informações do jogador
    text += 'DADOS DO PARTICIPANTE:\n';
    text += '-'.repeat(30) + '\n';
    text += `ID da Sessão: ${playerData.sessionId}\n`;
    text += `Idade: ${playerData.age} anos\n`;
    text += `Gênero: ${playerData.gender}\n`;
    text += `Tempo de Início: ${new Date(playerData.startTime).toLocaleString('pt-BR')}\n\n`;
    
    // Informações da sessão
    text += 'INFORMAÇÕES DA SESSÃO:\n';
    text += '-'.repeat(30) + '\n';
    text += `Início: ${new Date(sessionInfo.startTime).toLocaleString('pt-BR')}\n`;
    text += `Fim: ${new Date(sessionInfo.endTime).toLocaleString('pt-BR')}\n`;
    text += `Tempo Total: ${sessionInfo.totalPlayTime} minutos\n`;
    text += `Rounds Jogados: ${gameMetrics.totalRounds}\n`;
    text += `Motivo do Fim: ${gameMetrics.gameEndReason}\n\n`;
    
    // Pontuações finais
    text += 'PONTUAÇÕES FINAIS:\n';
    text += '-'.repeat(30) + '\n';
    text += `População: ${gameMetrics.finalScores.population}\n`;
    text += `Governo: ${gameMetrics.finalScores.government}\n`;
    text += `Paranoia: ${gameMetrics.finalScores.paranoia}\n\n`;
    
    // Estatísticas das decisões
    const decisionTimes = gameMetrics.decisions.map(d => d.decisionTime);
    const avgDecisionTime = decisionTimes.length > 0 
      ? decisionTimes.reduce((a, b) => a + b, 0) / decisionTimes.length 
      : 0;
    
    text += 'ESTATÍSTICAS DAS DECISÕES:\n';
    text += '-'.repeat(30) + '\n';
    text += `Total de Decisões: ${gameMetrics.decisions.length}\n`;
    text += `Tempo Médio por Decisão: ${Math.round(avgDecisionTime / 1000)} segundos\n`;
    if (decisionTimes.length > 0) {
      text += `Tempo Mínimo: ${(Math.min(...decisionTimes) / 1000).toFixed(1)} segundos\n`;
      text += `Tempo Máximo: ${(Math.max(...decisionTimes) / 1000).toFixed(1)} segundos\n`;
    }
    text += '\n';
    
    // Detalhes das decisões
    text += 'DETALHES DAS DECISÕES:\n';
    text += '-'.repeat(30) + '\n';
    gameMetrics.decisions.forEach((decision) => {
      text += `Rodada ${decision.roundNumber}:\n`;
      text += `  Tipo: ${decision.cardType}\n`;
      text += `  Escolha: ${decision.choiceId}\n`;
      text += `  Tempo: ${(decision.decisionTime / 1000).toFixed(1)}s\n`;
      text += `  População: ${decision.populationBefore} → ${decision.populationAfter}\n`;
      text += `  Governo: ${decision.governmentBefore} → ${decision.governmentAfter}\n`;
      text += `  Paranoia: ${decision.paranoiaBefore} → ${decision.paranoiaAfter}\n\n`;
    });
    
    // Consequências do jogo
    if (gameMetrics.consequences.length > 0) {
      text += 'CONSEQUÊNCIAS ACUMULADAS:\n';
      text += '-'.repeat(30) + '\n';
      gameMetrics.consequences.forEach((consequence, index) => {
        text += `${index + 1}. ${consequence}\n`;
      });
      text += '\n';
    }
    
    // Dados em formato JSON para análise programática
    text += 'DADOS ESTRUTURADOS (JSON):\n';
    text += '-'.repeat(30) + '\n';
    text += JSON.stringify(sessionData, null, 2);
    
    return text;
  };

  return {
    sendSessionDataByEmail,
    isLoading,
    status,
    clearStatus: () => setStatus({ type: null, message: '' })
  };
};
