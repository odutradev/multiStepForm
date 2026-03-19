import MultiStepForm from '@components/multiStepForm';
import HtmlModal from './subcomponents/HtmlModal';
import useMain from './hooks';
import { MainContainer } from './styles';
import { asprecFormConfig } from './form';

const Main = () => {
  const { isModalOpen, iframeReference, printableHtmlContent, handleFormSubmit, handleCloseModal, handleHtmlDownload, handlePdfDownload, handleCopyToClipboard } = useMain();

  return (
    <MainContainer>
      <MultiStepForm config={asprecFormConfig} onSubmit={handleFormSubmit} />
      <HtmlModal isOpen={isModalOpen} printableHtmlContent={printableHtmlContent} iframeReference={iframeReference} onClose={handleCloseModal} onCopy={handleCopyToClipboard} onDownloadHtml={handleHtmlDownload} onDownloadPdf={handlePdfDownload} />
    </MainContainer>
  );
};

export default Main;
