import { useEffect } from 'react';

function useOnClickOutside(ref, excludeRef, handler) {
  useEffect(() => {
    const listener = event => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        !excludeRef.current ||
        excludeRef.current.contains(event.target)
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, excludeRef, handler]);
}

export default useOnClickOutside;
