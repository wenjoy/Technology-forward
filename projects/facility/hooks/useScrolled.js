import { useState, useEffect } from 'react';

function useScrolled(ref) {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = e => {
    setScrolled(e.target.scrollTop > 0);
  };

  useEffect(() => {
    const element = ref.current;

    element.addEventListener('scroll', onScroll);

    return function cleanup() {
      element.removeEventListener('scroll', onScroll);
    };
  }, [ref]);

  return scrolled;
}

export default useScrolled;
