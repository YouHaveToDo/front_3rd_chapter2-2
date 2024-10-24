import { useState } from 'react';
import { Product } from '../../types.ts';

export const useEditingProduct = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  return {
    editingProduct,
    handleEditProduct
  };
};
