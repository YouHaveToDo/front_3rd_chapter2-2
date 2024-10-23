import { Product } from '../../types.ts';
import { useState } from 'react';
import * as productUtils from './utils/productUtils';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (newProduct: Product) => {
    setProducts((prev) => productUtils.updateProduct(prev, newProduct));
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => productUtils.addProduct(prev, newProduct));
  };

  return {
    products,
    updateProduct,
    addProduct
  };
};
