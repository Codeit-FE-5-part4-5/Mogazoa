import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookiesProvider } from 'react-cookie';
import type { AppProps } from 'next/app';
import GlobalBoundary from '@/shared/components/Boundary/GlobalBoundary';
import { Toaster } from '@/components/ui/toaster';
import ModalProvider from '@/shared/providers/modal-provider';
import queryClient from '@/shared/providers/query-client-provider';
import '@/styles/globals.css';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <ModalProvider />
        <Toaster />
        <GlobalBoundary>
          <Component {...pageProps} />
        </GlobalBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </CookiesProvider>
    </QueryClientProvider>
  );
};

export default App;
