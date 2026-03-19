import MultiStepForm from '@components/multiStepForm';
import HtmlModal from './subcomponents/HtmlModal';
import useMain from './hooks';
import { MainContainer } from './styles';
import { mockFormConfig } from './form';

const Main = () => {
  const { isModalOpen, iframeReference, printableHtmlContent, handleFormSubmit, handleCloseModal, handleHtmlDownload, handlePdfDownload, handleCopyToClipboard } = useMain();

  return (
    <MainContainer>
      <MultiStepForm config={mockFormConfig} onSubmit={handleFormSubmit} />
      <HtmlModal isOpen={isModalOpen} printableHtmlContent={printableHtmlContent} iframeReference={iframeReference} onClose={handleCloseModal} onCopy={handleCopyToClipboard} onDownloadHtml={handleHtmlDownload} onDownloadPdf={handlePdfDownload} />
    </MainContainer>
  );
};

export default Main;
