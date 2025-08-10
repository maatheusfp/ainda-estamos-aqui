import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

interface EmailWithAttachmentProps {
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
}

interface TemplateParams {
  to_email: string;
  from_name: string;
  subject: string;
  message: string;
  attachment_name?: string;
  attachment_content?: string;
  attachment_type?: string;
  [key: string]: unknown;
}

export const EmailWithAttachment: React.FC<EmailWithAttachmentProps> = ({
  serviceId = 'YOUR_SERVICE_ID',
  templateId = 'YOUR_TEMPLATE_ID', 
  publicKey = 'YOUR_PUBLIC_KEY'
}) => {
  const [formData, setFormData] = useState({
    to_email: '',
    from_name: '',
    subject: '',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error' | null, message: string}>({
    type: null,
    message: ''
  });

  // Converter arquivo para Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove o prefixo "data:type/subtype;base64," para obter apenas o Base64
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verificar tamanho do arquivo (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        setStatus({
          type: 'error',
          message: 'Arquivo muito grande! O tamanho máximo é 2MB.'
        });
        return;
      }
      setSelectedFile(file);
      setStatus({ type: null, message: '' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      let templateParams: TemplateParams = {
        ...formData,
        to_email: formData.to_email,
        from_name: formData.from_name,
        subject: formData.subject,
        message: formData.message
      };

      // Se há arquivo selecionado, converter para Base64
      if (selectedFile) {
        const fileBase64 = await fileToBase64(selectedFile);
        templateParams = {
          ...templateParams,
          attachment_name: selectedFile.name,
          attachment_content: fileBase64,
          attachment_type: selectedFile.type
        };
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setStatus({
        type: 'success',
        message: 'Email enviado com sucesso!'
      });
      
      // Limpar formulário
      setFormData({
        to_email: '',
        from_name: '',
        subject: '',
        message: ''
      });
      setSelectedFile(null);
      
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setStatus({
        type: 'error',
        message: 'Erro ao enviar email. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Enviar Email com Anexo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={sendEmail} className="space-y-4">
          <div>
            <Label htmlFor="to_email">Para (Email)</Label>
            <Input
              id="to_email"
              name="to_email"
              type="email"
              value={formData.to_email}
              onChange={handleInputChange}
              required
              placeholder="destinatario@email.com"
            />
          </div>

          <div>
            <Label htmlFor="from_name">Seu Nome</Label>
            <Input
              id="from_name"
              name="from_name"
              value={formData.from_name}
              onChange={handleInputChange}
              required
              placeholder="Seu nome"
            />
          </div>

          <div>
            <Label htmlFor="subject">Assunto</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              placeholder="Assunto do email"
            />
          </div>

          <div>
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Digite sua mensagem..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="file">Anexo (máx. 2MB)</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt,.zip"
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {selectedFile && (
              <p className="text-sm text-gray-600 mt-1">
                Arquivo selecionado: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          {status.message && (
            <Alert className={status.type === 'error' ? 'border-red-500' : 'border-green-500'}>
              <AlertDescription className={status.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                {status.message}
              </AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Enviando...' : 'Enviar Email'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
