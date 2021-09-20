import { useEffect, useState } from 'react';
import { isSuperStar } from './isSuperStar';

export const useSuperStar = (user) => {
  const [superStar, setSuperStar] = useState(false);

  useEffect(() => {
    if (user) {
      const checkSuperStarStatus = async () => {
        setSuperStar(await isSuperStar());
      };

      checkSuperStarStatus();
    }
  }, [user]);

  return {superStar};
};
