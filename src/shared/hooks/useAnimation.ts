import { useEffect, useState } from 'react';

export const useAnimation = (
  condition: boolean,
): [boolean, boolean, () => void] => {
  const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    if (condition) {
      setComplete(condition);
    }
  }, [condition]);

  let shouldRender = condition || isComplete;
  let animationTrigger = condition && isComplete;

  const handleTransitionEnd = () => {
    if (!condition) {
      setComplete(false);
    }
  };

  return [shouldRender, animationTrigger, handleTransitionEnd];
};
