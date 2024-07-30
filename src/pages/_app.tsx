import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import GlobalBoundary from '@/shared/components/Boundary/GlobalBoundary';
import ModalProvider from '@/shared/providers/modal-provider';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import Portal from '@/Portal';
import Floating from '@/shared/components/Floating/Floating';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            throwOnError: true,
          },
        },
      }),
  );

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
