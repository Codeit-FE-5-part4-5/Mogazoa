import { CSSProperties, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
};

const Spinner = ({ isLoading }: { isLoading: boolean }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timerId = setTimeout(() => {
      if (isLoading) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timerId);
    };
  }, [isLoading]);

  return (
    <ClipLoader
      color="#ffffff"
      loading={loading}
      cssOverride={override}
      size={30}
    />
  );
};

export default Spinner;
