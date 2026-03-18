import { toast } from 'react-toastify';

export const copyToClipboard = async (element: HTMLDivElement | null): Promise<void> => {
  if (!element) return;
  try {
    await navigator.clipboard.writeText(element.outerHTML);
    toast.success('Conteúdo HTML copiado com sucesso!');
  } catch {
    toast.error('Falha ao copiar conteúdo.');
  }
};