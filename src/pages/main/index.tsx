import { useState, useCallback } from 'react';

import { generatePrecatorioHtml } from './subcomponents/HtmlModal/template';
import MultiStepForm from '@components/multiStepForm';
import HtmlModal from './subcomponents/HtmlModal';
import { MainContainer } from './styles';
import { mockFormConfig } from './form';

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHtml, setModalHtml] = useState('');

  const handleFormSubmit = useCallback((data: Record<string, unknown>) => {
    const generatedHtml = generatePrecatorioHtml(data);
    setModalHtml(generatedHtml);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <MainContainer>
      <MultiStepForm config={mockFormConfig} onSubmit={handleFormSubmit} />
      <HtmlModal isOpen={isModalOpen} htmlContent={modalHtml} onClose={handleCloseModal} />
    </MainContainer>
  );
};

export default Main;