import { ChangeEvent, useCallback, useState } from 'react';

const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  const initValue = () => {
    setValue(initialValue);
  };

  return [value, handler, initValue];
};

export default useInput;
