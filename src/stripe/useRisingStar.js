import { useEffect, useState } from 'react';
import { isRisingStar } from './isRisingStar';

export const useRisingStar = (user) => {
  const [risingStar, setRisingStar] = useState(false);

  useEffect(() => {
    if (user) {
      const checkResingStarStatus = async () => {
        setRisingStar(await isRisingStar());
      };

      checkResingStarStatus();
    }
  }, [user]);

  return {risingStar};
};
