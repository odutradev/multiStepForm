import { useState, useCallback, useMemo, useRef } from 'react';
import { toast } from 'react-toastify';

import { generateDocumentHtml } from '../subcomponents/HtmlModal/template';
import { MODAL_CONSTANTS } from '../subcomponents/HtmlModal/constants';

import type { UseMainReturn } from './types';

const useMain = (): UseMainReturn => {
  const iframeReference = useRef<HTMLIFrameElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHtml, setModalHtml] = useState('');

  const printableHtmlContent = useMemo(() => modalHtml.replace(MODAL_CONSTANTS.PRINT_STYLE_TARGET, MODAL_CONSTANTS.PRINT_STYLE_INJECTION), [modalHtml]);

  const handleFormSubmit = useCallback((data: Record<string, unknown>) => {
    const generatedHtml = generateDocumentHtml(data);
    setModalHtml(generatedHtml);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleCopyToClipboard = useCallback(() => {
    const temporaryContainer = document.createElement('div');
    temporaryContainer.innerHTML = modalHtml;
    temporaryContainer.style.position = 'fixed';
    temporaryContainer.style.left = '-9999px';
    document.body.appendChild(temporaryContainer);

    const windowSelection = window.getSelection();
    const documentRange = document.createRange();
    documentRange.selectNodeContents(temporaryContainer);

    windowSelection?.removeAllRanges();
    windowSelection?.addRange(documentRange);

    try {
      document.execCommand('copy');
      toast.success(MODAL_CONSTANTS.SUCCESS_COPY);
    } catch {
      toast.error(MODAL_CONSTANTS.ERROR_COPY);
    } finally {
      windowSelection?.removeAllRanges();
      document.body.removeChild(temporaryContainer);
    }
  }, [modalHtml]);

  const handleHtmlDownload = useCallback(() => {
    const documentBlob = new Blob([modalHtml], { type: MODAL_CONSTANTS.MIME_TYPE });
    const objectUrl = URL.createObjectURL(documentBlob);
    const downloadLink = document.createElement('a');

    downloadLink.href = objectUrl;
    downloadLink.download = MODAL_CONSTANTS.DOWNLOAD_FILE_NAME;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(objectUrl);
  }, [modalHtml]);

  const handlePdfDownload = useCallback(() => {
    if (!iframeReference.current?.contentWindow) return void toast.error(MODAL_CONSTANTS.ERROR_PDF);

    try {
      iframeReference.current.contentWindow.print();
    } catch {
      toast.error(MODAL_CONSTANTS.ERROR_PDF_NATIVE);
    }
  }, []);

  return {
    isModalOpen,
    iframeReference,
    printableHtmlContent,
    handleFormSubmit,
    handleCloseModal,
    handleHtmlDownload,
    handlePdfDownload,
    handleCopyToClipboard
  };
};

export default useMain;