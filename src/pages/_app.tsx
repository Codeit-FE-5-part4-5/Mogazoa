import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookiesProvider } from 'react-cookie';
import { ModalProvider } from '@/shared/providers/modal-provider';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <ModalProvider />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </CookiesProvider>
    </QueryClientProvider>
  );
};

export default App;
