import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookiesProvider } from 'react-cookie';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import GlobalBoundary from '@/shared/components/Boundary/GlobalBoundary';
import Portal from '@/Portal';
import Floating from '@/shared/components/Floating/Floating';
import { Toaster } from '@/components/ui/toaster';
import ModalProvider from '@/shared/providers/modal-provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError: true,
    },
  },
});

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
          <Portal portalName="floating">
            <Floating />
          </Portal>
        </GlobalBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </CookiesProvider>
    </QueryClientProvider>
  );
};

export default App;
