import { useCallback, useEffect, useState } from 'react';

const useAnimation = (condition: boolean): [boolean, boolean, () => void] => {
  const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    if (condition) {
      setComplete(condition);
    }
  }, [condition]);

  let shouldRender = condition || isComplete;
  let animationTrigger = condition && isComplete;

  const handleAnimationEnd = useCallback(() => {
    if (!condition) {
      setComplete(false);
    }
  }, [condition]);

  return [shouldRender, animationTrigger, handleAnimationEnd];
};

export default useAnimation;
