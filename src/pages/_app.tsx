import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookiesProvider } from 'react-cookie';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ModalProvider } from '@/shared/providers/modal-provider';
import '@/styles/globals.css';
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
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <ModalProvider />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </CookiesProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
