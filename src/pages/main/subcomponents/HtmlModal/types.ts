import type { RefObject } from 'react';

export interface HtmlModalProps {
  iframeReference: RefObject<HTMLIFrameElement | null>;
  printableHtmlContent: string;
  onDownloadHtml: () => void;
  onDownloadPdf: () => void;
  onClose: () => void;
  isOpen: boolean;
  onCopy: () => void;
}