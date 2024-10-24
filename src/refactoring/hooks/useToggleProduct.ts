import { useState } from 'react';
import { toggleSet } from '../utils/set.ts';

export const useToggleProduct = () => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      return toggleSet(prev, productId);
    });
  };

  return {
    openProductIds,
    toggleProductAccordion
  };
};
