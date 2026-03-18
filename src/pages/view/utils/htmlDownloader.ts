export const downloadHTML = (element: HTMLDivElement | null): void => {
  if (!element) return;
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Resumo Formulário</title>
      <style>
        body { font-family: sans-serif; padding: 20px; background-color: #f0f2f5; }
        .container { max-width: 1200px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
        th, td { border: 1px solid #e0e0e0; padding: 12px; text-align: left; }
        th { background-color: #f5f5f5; width: 40%; color: #333; }
        td { color: #555; }
        h2 { color: #2c3e50; margin-bottom: 16px; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        ${element.innerHTML}
      </div>
    </body>
    </html>
  `;
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resumo-formulario.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};