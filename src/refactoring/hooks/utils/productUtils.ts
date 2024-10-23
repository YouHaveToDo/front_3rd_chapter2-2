import { CartItem, Product } from '../../../types.ts';
import { subtract } from '../../utils/calculator.ts';

export const updateProduct = (products: Product[], newProduct: Product) => {
  return products.map((product) =>
    product.id === newProduct.id ? newProduct : product
  );
};

export const addProduct = (products: Product[], newProduct: Product) => {
  return [...products, newProduct];
};

export const getRemainingStock = (cart: CartItem[], product: Product) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return subtract(product.stock, cartItem?.quantity || 0);
};
