import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookiesProvider } from 'react-cookie';
import type { AppProps } from 'next/app';
import { ModalProvider } from '@/shared/providers/modal-provider';
import '@/styles/globals.css';
import AuthContext from '@/shared/context/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <ModalProvider />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </CookiesProvider>
      </QueryClientProvider>
    </AuthContext>
  );
}
