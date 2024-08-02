import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import queryClient from '@/lib/query';
import ModalProvider from '@/providers/modal-provider';

import { Toaster } from '@/components/ui/toaster';
import GlobalBoundary from '@/components/shared/Boundary/GlobalBoundary';
import Portal from '@/components/shared/Portal/Portal';
import Floating from '@/components/shared/Floating/Floating';

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
