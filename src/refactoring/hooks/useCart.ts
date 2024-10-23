// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import * as cartUtils from './utils/cartUtils';
import { getRemainingStock } from './utils/productUtils.ts';

function getExistingItem(cart: CartItem[], product: Product) {
  return cart.find((item) => item.product.id === product.id);
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    const remainingStock = getRemainingStock(cart, product);
    if (remainingStock <= 0) return;

    setCart((prevCart) => {
      const existingItem = getExistingItem(prevCart, product);
      if (existingItem) {
        return cartUtils.updateCartItemQuantity(
          prevCart,
          product.id,
          cartUtils.getAvailablePurchaseQuantity(
            product.stock,
            existingItem.quantity + 1
          )
        );
      }

      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => cartUtils.updateCartItemQuantity(prev, productId, 0));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) =>
      cartUtils.updateCartItemQuantity(prev, productId, newQuantity)
    );
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(() => coupon);
  };

  const calculateTotal = () =>
    cartUtils.calculateCartTotal(cart, selectedCoupon);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon
  };
};
