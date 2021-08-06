import { useEffect, useState } from 'react';

function useLoadImage(url) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (url) {
      const preLoad = new Image();
      preLoad.addEventListener('load', () => {
        setImage({
          loaded: true,
          url: preLoad.src,
        });
      });
      preLoad.addEventListener('error', () => {
        setImage({
          loaded: false,
        });
      });
      preLoad.src = url;
    } else {
      setImage(null);
    }
    return () => {
      setImage(null);
    };
  }, [url]);

  return image;
}

export default useLoadImage;
