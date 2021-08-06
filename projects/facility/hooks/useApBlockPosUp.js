import { useEffect, useState } from 'react';

function useApBlockPosUp(ref, isOpened) {
  const [isPosUp, setIsPosUp] = useState(false);

  useEffect(() => {
    if (ref.current) {
      setIsPosUp(
        ref.current.getBoundingClientRect().bottom > window.innerHeight,
      );
    }

    return function cleanup() {
      setIsPosUp(false);
    };
  }, [ref, isOpened]);

  return isPosUp;
}

export default useApBlockPosUp;
