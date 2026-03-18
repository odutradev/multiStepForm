import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import MultiStepForm from '@components/multiStepForm';
import { mockFormConfig } from './form';
import { MainContainer } from './styles';

const Main = () => {
  const navigate = useNavigate();

  const handleFormSubmit = useCallback((data: Record<string, unknown>) => {
    navigate('/view', { state: { formData: data } });
  }, [navigate]);

  return (
    <MainContainer>
      <MultiStepForm config={mockFormConfig} onSubmit={handleFormSubmit} />
    </MainContainer>
  );
};

export default Main;