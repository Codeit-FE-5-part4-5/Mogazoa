import { ChangeEvent, useCallback, useState } from 'react';

export default function useInput(initialValue: any) {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  return [value, handler, setValue];
}
