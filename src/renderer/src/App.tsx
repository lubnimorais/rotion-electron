import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './lib/react-query';

import { Routes } from './routes';

import './styles/globa.css';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
};

export { App };
