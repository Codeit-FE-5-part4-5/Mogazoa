import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import GlobalBoundary from '@/shared/components/Boundary/GlobalBoundary';
import ModalProvider from '@/shared/providers/modal-provider';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Portal from '@/shared/components/Portal/Portal';
import Floating from '@/shared/components/Floating/Floating';
import queryClient from '@/lib/query';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <ModalProvider />
          <Toaster />
          <Portal portalName="floating">
            <Floating />
          </Portal>
          <GlobalBoundary>
            <Component {...pageProps} />
          </GlobalBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </CookiesProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default App;
