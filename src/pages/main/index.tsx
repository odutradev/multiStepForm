import { useCallback } from 'react';

import MultiStepForm from '@components/multiStepForm';
import { mockFormConfig } from './defaultData';
import { MainContainer} from './styles';

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