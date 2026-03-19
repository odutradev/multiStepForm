export const HTML_MODAL_CONSTANTS = {
  DOWNLOAD_FILE_NAME: 'oficio-precatorio.html',
  MIME_TYPE: 'text/html;charset=utf-8',
  PRINT_STYLE_REPLACE_TARGET: '</head>',
  PRINT_STYLE_INJECTION: '<style>@media print { @page { size: A4; margin: 15mm; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: #ffffff !important; } main { box-shadow: none !important; padding: 0 !important; margin: 0 !important; } }</style></head>',
  SUCCESS_COPY: 'Documento copiado com sucesso! Pode colar no seu editor.',
  ERROR_COPY: 'Erro ao copiar o documento.',
  ERROR_PDF: 'Erro ao acessar o documento para geração de PDF.',
  ERROR_PDF_NATIVE: 'Erro ao acionar a geração nativa de PDF.'
} as const;