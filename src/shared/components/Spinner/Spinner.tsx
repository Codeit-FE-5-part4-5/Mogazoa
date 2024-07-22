import usePendingTimeout from '@/shared/hooks/usePendingTimeout';
import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
};

interface SpinerProps {
  isLoading: boolean;
  isTimeout?: boolean;
  size?: number;
}

const Spinner = ({ isLoading, isTimeout = false, size = 30 }: SpinerProps) => {
  const [loading] = usePendingTimeout(isLoading);

  return (
    <ClipLoader
      color="#ffffff"
      loading={isTimeout ? loading : isLoading}
      cssOverride={override}
      size={size}
    />
  );
};

export default Spinner;
