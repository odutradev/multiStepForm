import { useCallback } from 'react';

import MultiStepForm from '@components/multiStepForm';
import { MainContainer } from './styles';
import { mockFormConfig } from './form';

const Main = () => {
  const handleFormSubmit = useCallback((data: Record<string, unknown>) => {
    console.log('Payload enviado:', data);
  }, []);

  return (
    <MainContainer>
      <MultiStepForm
        config={mockFormConfig}
        onSubmit={handleFormSubmit}
      />
    </MainContainer>
  );
};

export default Main;