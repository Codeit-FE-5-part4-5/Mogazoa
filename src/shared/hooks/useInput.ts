import { ChangeEvent, useCallback, useState } from 'react';

/**
 * @description
 * input값을 상태에 전달해주는 기능입니다.
 * 매번 input의 target.value를 state에 넘기는 함수를 작성하지 않고 해당 훅을 불러와 onChange에 handler를 걸어주시면 됩니다.
 */

type TChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type ReturnType<T> = [T, (e: TChangeEvent) => void, () => void];

const useInput = <T extends string>(initialValue: T): ReturnType<T> => {
  const [value, setValue] = useState<T>(initialValue);

  const handler = useCallback((e: TChangeEvent) => {
    setValue(e.target.value as T);
  }, []);

  const initValue = () => {
    setValue(initialValue);
  };

  return [value, handler, initValue];
};

export default useInput;
