import { useState } from 'react';
import { Button } from '@mui/material';

import { MainContainer, Title, ButtonContainer } from './styles';

const Main = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    window.location.reload()
  };

  return (
    <MainContainer>
      <Title variant="h1">Cadastro de Ofício Precatório</Title>
    
      <ButtonContainer>
        <Button variant="outlined" onClick={toggleTheme} sx={{ ml: 2 }}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </ButtonContainer>
    </MainContainer>
  );
};

export default Main;