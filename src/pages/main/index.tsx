import { useState, useCallback } from 'react';
import { Button } from '@mui/material';

import { MainContainer, Title, ButtonContainer } from './styles';
import MultiStepForm from '@components/multiStepForm';
import { mockFormConfig } from './defaultData';

const Main = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    window.location.reload();
  }, [theme]);

  const handleFormSubmit = useCallback((data: Record<string, unknown>) => {
    console.log('Payload enviado:', data);
  }, []);

  return (
    <MainContainer>
      <Title variant="h1">Cadastro de Ofício Precatório</Title>

      <MultiStepForm
        config={mockFormConfig}
        onSubmit={handleFormSubmit}
      />

      <ButtonContainer>
        <Button variant="outlined" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </ButtonContainer>
    </MainContainer>
  );
};

export default Main;