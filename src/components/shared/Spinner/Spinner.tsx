import usePendingTimeout from '@/hooks/usePendingTimeout';
import isServer from '@/utils/isServer';
import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import SyncLoader from 'react-spinners/SyncLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
};

interface SpinerProps {
  variants?: 'clip' | 'sync';
  isLoading: boolean;
  isTimeout?: boolean;
  size?: number;
}

const Spinner = ({
  variants = 'sync',
  isLoading,
  isTimeout = false,
  size = 15,
}: SpinerProps) => {
  const loading = usePendingTimeout(isLoading);

  if (isServer) return null;

  switch (variants) {
    case 'clip': {
      return (
        <ClipLoader
          color="#ffffff"
          loading={isTimeout ? loading : isLoading}
          cssOverride={override}
          size={size}
        />
      );
    }
    case 'sync': {
      return (
        <SyncLoader
          color="#ffffff"
          loading={isTimeout ? loading : isLoading}
          cssOverride={override}
          size={size}
        />
      );
    }
    default:
      return null;
  }
};

export default Spinner;
