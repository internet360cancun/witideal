import { useEffect, useState } from 'react';
import { isRockStar } from './isRockStar';

export const useRockStar = (user) => {
  const [rockStar, setRockStar] = useState(false);

  useEffect(() => {
    if (user) {
      const checkRockStarStatus = async () => {
        setRockStar(await  isRockStar() );
      };

      checkRockStarStatus();
    }
  }, [user]);

  return {rockStar};
};
