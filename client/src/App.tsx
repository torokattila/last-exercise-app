import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoadingScreen from './components/LoadingScreen';
import useAuth from './hooks/useAuth';
import Router from './routes';

const App = (): JSX.Element => {
  const { isInitialized } = useAuth();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {isInitialized ? <Router /> : <LoadingScreen />}
    </QueryClientProvider>
  );
};

export default App;
