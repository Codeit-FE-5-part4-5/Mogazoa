import { useCallback, useEffect, useState } from 'react';

type TAnimation = (condition: boolean) => [boolean, boolean, () => void];

/**
 *
 * @param {boolean} condition 애니메이션을 위한 isOpen과 같은 불리언 값 입니다.
 * @returns {boolean} shouldRender 인자로 들어온 condition대신 렌더링 조건문에 사용합니다.
 * @returns {boolean} animationTrigger 해당 요소가 마운트 될때와 언마운트 될때의 애니메이션을 효과를 줄때 사용할 렌더링 조건문에 사용합니다.
 * @returns {function} handleAnimationEnd 애니메이션을 적용할 요소의 onAnimationEnd 어트리뷰트로 걸어줄 함수입니다.
 */
const useAnimation: TAnimation = (condition) => {
  const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    if (condition) {
      setComplete(condition);
    }
  }, [condition]);

  const shouldRender = condition || isComplete;
  const animationTrigger = condition && isComplete;

  const handleAnimationEnd = useCallback(() => {
    if (!condition) {
      setComplete(false);
    }
  }, [condition]);

  return [shouldRender, animationTrigger, handleAnimationEnd];
};

export default useAnimation;
