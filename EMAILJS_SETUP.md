# EmailJS com Anexos - Configuração

## Configuração do EmailJS

### 1. Criar conta no EmailJS
1. Acesse [EmailJS](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Crie um novo serviço (Gmail, Outlook, etc.)

### 2. Configurar Template
No painel do EmailJS, crie um template com as seguintes variáveis:

```
Para: {{to_email}}
De: {{from_name}}
Assunto: {{subject}}

Mensagem:
{{message}}

{{#if attachment_name}}
Anexo: {{attachment_name}}
{{/if}}
```

### 3. Configurar Webhook (para anexos)
Para suportar anexos, você precisará configurar um webhook no EmailJS:

1. No painel do EmailJS, vá em "Integrations"
2. Configure um webhook que processe os anexos
3. Use o seguinte código no webhook:

```javascript
// Webhook para processar anexos
if (data.attachment_content && data.attachment_name) {
  const attachment = {
    filename: data.attachment_name,
    content: data.attachment_content,
    encoding: 'base64',
    contentType: data.attachment_type
  };
  
  // Adicionar anexo ao email
  message.attachments = [attachment];
}
```

### 4. Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id  
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
```

### 5. Uso do Componente

```tsx
import { EmailWithAttachment } from '@/components/EmailWithAttachment';

function App() {
  return (
    <EmailWithAttachment
      serviceId={import.meta.env.VITE_EMAILJS_SERVICE_ID}
      templateId={import.meta.env.VITE_EMAILJS_TEMPLATE_ID}
      publicKey={import.meta.env.VITE_EMAILJS_PUBLIC_KEY}
    />
  );
}
```

## Limitações Importantes

### Tamanho de Arquivo
- **Máximo**: 2MB por anexo
- **Recomendado**: Até 1MB para melhor performance

### Tipos de Arquivo Suportados
- Documentos: PDF, DOC, DOCX, TXT
- Imagens: JPG, JPEG, PNG, GIF
- Arquivos: ZIP, RAR
- Outros: A maioria dos tipos comuns

### Plano Gratuito do EmailJS
- 200 emails por mês
- Limitação de tamanho de anexo
- Sem suporte premium

## Alternativas para Arquivos Grandes

Se você precisar enviar arquivos maiores que 2MB, considere:

1. **Upload para Cloud Storage**:
   ```tsx
   // Upload para Cloudinary, AWS S3, etc.
   const uploadFile = async (file: File) => {
     // Upload logic
     return fileUrl;
   };
   
   // Enviar apenas o link no email
   const templateParams = {
     message: `Arquivo disponível em: ${fileUrl}`,
     // ... outros campos
   };
   ```

2. **Compressão de Arquivos**:
   ```tsx
   import { compress } from 'image-compression';
   
   const compressImage = async (file: File) => {
     const options = {
       maxSizeMB: 1,
       maxWidthOrHeight: 1920
     };
     return await compress(file, options);
   };
   ```

3. **Serviços Especializados**:
   - WeTransfer API
   - Dropbox API
   - Google Drive API

## Exemplo de Uso Completo

```tsx
import React from 'react';
import { EmailWithAttachment } from '@/components/EmailWithAttachment';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Enviar Email com Anexo</h1>
      
      <EmailWithAttachment
        serviceId={import.meta.env.VITE_EMAILJS_SERVICE_ID}
        templateId={import.meta.env.VITE_EMAILJS_TEMPLATE_ID}
        publicKey={import.meta.env.VITE_EMAILJS_PUBLIC_KEY}
      />
    </div>
  );
}
```

## Troubleshooting

### Erro: "Template not found"
- Verifique se o templateId está correto
- Confirme se o template foi publicado no EmailJS

### Erro: "Service not found"  
- Verifique se o serviceId está correto
- Confirme se o serviço está ativo

### Arquivo não sendo anexado
- Verifique se o arquivo é menor que 2MB
- Confirme se o tipo de arquivo é suportado
- Verifique se o webhook está configurado corretamente

### Performance lenta
- Reduza o tamanho dos arquivos
- Use compressão de imagens
- Considere upload para cloud storage
