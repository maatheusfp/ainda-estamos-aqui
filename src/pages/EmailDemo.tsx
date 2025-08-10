import React from 'react';
import { EmailWithAttachment } from '@/components/EmailWithAttachment';

const EmailDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Demo: Email com Anexos
          </h1>
          <p className="text-gray-600">
            Demonstração de como enviar emails com anexos usando EmailJS
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Configuração Necessária</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
            <h3 className="font-medium text-yellow-800 mb-2">⚠️ Antes de usar:</h3>
            <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
              <li>Crie uma conta no <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="underline">EmailJS</a></li>
              <li>Configure um serviço de email (Gmail, Outlook, etc.)</li>
              <li>Crie um template com suporte a anexos</li>
              <li>Adicione suas credenciais no arquivo .env.local</li>
            </ol>
          </div>
          
          <div className="bg-gray-50 rounded-md p-4">
            <h3 className="font-medium text-gray-800 mb-2">Arquivo .env.local:</h3>
            <pre className="text-sm text-gray-600 overflow-x-auto">
{`VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id  
VITE_EMAILJS_PUBLIC_KEY=sua_public_key`}
            </pre>
          </div>
        </div>

        <EmailWithAttachment
          serviceId={import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'}
          templateId={import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'}
          publicKey={import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'}
        />

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="font-medium text-blue-800 mb-2">📝 Limitações:</h3>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>Tamanho máximo do arquivo: 2MB</li>
            <li>Plano gratuito: 200 emails/mês</li>
            <li>Tipos suportados: PDF, DOC, DOCX, JPG, PNG, TXT, ZIP</li>
            <li>Requer configuração de webhook para anexos</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Consulte o arquivo <code className="bg-gray-100 px-1 rounded">EMAILJS_SETUP.md</code> para instruções detalhadas
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailDemo;
