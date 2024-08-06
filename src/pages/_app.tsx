import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import queryClient from '@/lib/query';
import ModalProvider from '@/providers/modal-provider';

import { Toaster } from '@/components/shared/ui/toaster';
import { GlobalBoundary, Portal, Floating } from '@/components/shared';

import '@/styles/globals.css';
import { useState } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  const [newQueryClient] = useState(queryClient);
  return (
    <QueryClientProvider client={newQueryClient}>
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
