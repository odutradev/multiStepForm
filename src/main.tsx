import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StrictMode, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import 'dayjs/locale/pt-br';

import { toastContainerConfig } from '@assets/data/toast';
import { lightTheme, darkTheme } from '@styles/theme';
import defaultConfig from '@assets/config/default';
import GlobalStyles from '@styles/globalStyles';
import Router from '@routes/index';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedThemeMode = window.localStorage.getItem('theme');
    return savedThemeMode === 'dark' ? darkTheme : lightTheme;
  }
  return lightTheme;
};

const App = () => {
  const [activeTheme, setActiveTheme] = useState(getInitialTheme());

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'theme') {
        setActiveTheme(getInitialTheme());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    console.log(`version: ${defaultConfig.version} - mode: ${defaultConfig.mode}`);
  }, []);

  return (
    <ThemeProvider theme={activeTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <ToastContainer {...toastContainerConfig} />
        <CssBaseline />
        <Router />
        <GlobalStyles />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);