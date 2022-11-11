import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoadingScreen from './components/LoadingScreen';
import useAuth from './hooks/useAuth';
import Router from './routes';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'NunitoSans',
  },
});

const App = (): JSX.Element => {
  const { isInitialized } = useAuth();
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {isInitialized ? <Router /> : <LoadingScreen />}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
