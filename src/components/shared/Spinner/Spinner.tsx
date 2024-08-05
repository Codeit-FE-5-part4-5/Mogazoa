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
  variant?: 'clip' | 'sync';
  isLoading: boolean;
  isTimeout?: boolean;
  size?: number;
}

const Spinner = ({
  variant = 'clip',
  isLoading,
  isTimeout = false,
  size,
}: SpinerProps) => {
  const loading = usePendingTimeout(isLoading);

  if (isServer) return null;

  switch (variant) {
    case 'clip': {
      return (
        <ClipLoader
          color="#ffffff"
          loading={isTimeout ? loading : isLoading}
          cssOverride={override}
          size={size ?? 30}
        />
      );
    }
    case 'sync': {
      return (
        <SyncLoader
          color="#ffffff"
          loading={isTimeout ? loading : isLoading}
          cssOverride={override}
          margin={4}
          size={size ?? 15}
        />
      );
    }
    default:
      return null;
  }
};

export default Spinner;
