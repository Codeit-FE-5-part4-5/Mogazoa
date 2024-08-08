import SearchModal from '@/components/shared/Search/SearchModal';
import { useEffect, useState } from 'react';

const SearchProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <SearchModal />;
};

export default SearchProvider;
