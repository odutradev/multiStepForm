export const MODAL_CONSTANTS = {
  PRINT_STYLE_INJECTION: '<style>@media print { @page { size: A4; margin: 15mm; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: #ffffff !important; } main { box-shadow: none !important; padding: 0 !important; margin: 0 !important; } }</style></head>',
  SUCCESS_COPY: 'Documento copiado com sucesso! Pode colar no seu editor.',
  ERROR_PDF_NATIVE: 'Erro ao acionar a geração nativa de PDF.',
  ERROR_PDF: 'Erro ao acessar o documento para geração de PDF.',
  DOWNLOAD_FILE_NAME: 'oficio-precatorio.html',
  PRINT_STYLE_TARGET: '</head>',
  ERROR_COPY: 'Erro ao copiar o documento.',
  MIME_TYPE: 'text/html;charset=utf-8'
} as const;