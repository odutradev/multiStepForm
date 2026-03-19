import type { RefObject } from 'react';

export interface UseMainReturn {
  handleFormSubmit: (data: Record<string, unknown>) => void;
  iframeReference: RefObject<HTMLIFrameElement | null>;
  handleCopyToClipboard: () => void;
  handleHtmlDownload: () => void;
  printableHtmlContent: string;
  handlePdfDownload: () => void;
  handleCloseModal: () => void;
  isModalOpen: boolean;
}