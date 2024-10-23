import { CartItem, Coupon, Discount, Product } from '../../../types';
import { multiply, subtract } from '../../utils/calculator.ts';

const NON_DISCOUNTED_RATIO = 1;

/**
 * 쿠폰 적용
 * @param {number} price - 상품 가격
 * @param {Coupon} coupon - 쿠폰 정보
 * @returns - 쿠폰 적용 후 상품 가격
 */
const applyCoupon = (price: number, coupon: Coupon | null) => {
  if (!coupon) {
    return price;
  }

  if (coupon.discountType === 'amount') {
    return subtract(price, coupon.discountValue);
  } else {
    return multiply(
      price,
      subtract(NON_DISCOUNTED_RATIO, coupon.discountValue / 100)
    );
  }
};

/**
 * 상품 갯수에 따른 할인 적용
 * @param {number} item - 카트에 담겨있는 개별 상품
 * @returns - 상품 갯수에 따른 할인이 적용된 상품 가격
 */
export const calculateItemTotal = (item: CartItem) => {
  const totalBeforeDiscount = multiply(item.product.price, item.quantity);
  const maxDiscount = getMaxApplicableDiscount(item);
  return multiply(totalBeforeDiscount, NON_DISCOUNTED_RATIO - maxDiscount);
};

function getApplicableQuantities(product: Product, quantity: number) {
  return product.discounts.filter((discount) => quantity >= discount.quantity);
}

function getMaxQuantityDiscount(applicableQuantities: Discount[]) {
  return applicableQuantities.reduce((max, discount) =>
    discount.quantity > max.quantity ? discount : max
  );
}

/**
 * 특정 아이템의 최대 할인율 계산
 * @param {CartItem} item - 카트에 담겨있는 개별 상품
 * @returns - 최대 할인율
 */
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;

  const applicableQuantities = getApplicableQuantities(product, quantity);

  if (applicableQuantities.length === 0) return 0;

  const maxQuantityDiscount = getMaxQuantityDiscount(applicableQuantities);

  return maxQuantityDiscount.rate;
};

function getTotalBeforeDiscount(cart: CartItem[]) {
  return cart.reduce(
    (acc, item) => acc + multiply(item.product.price, item.quantity),
    0
  );
}

function getTotalAfterDiscountByQuantity(cart: CartItem[]) {
  return cart.reduce((acc, item) => acc + calculateItemTotal(item), 0);
}

function getTotalDiscount(
  totalBeforeDiscount: number,
  totalAfterDiscount: number
) {
  return subtract(totalBeforeDiscount, totalAfterDiscount);
}

/**
 * 장바구니 총 가격 계산
 * @param {CartItem[]} cart - 장바구니
 * @param {Coupon | null} selectedCoupon - 적용 예정 쿠폰
 * @returns - 총 가격 정보
 */
export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;
  let totalDiscount = 0;

  totalBeforeDiscount = getTotalBeforeDiscount(cart);

  const totalAfterDiscountByQuantity = getTotalAfterDiscountByQuantity(cart);

  totalAfterDiscount = applyCoupon(
    totalAfterDiscountByQuantity,
    selectedCoupon
  );

  totalDiscount = getTotalDiscount(totalBeforeDiscount, totalAfterDiscount);

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount
  };
};

function findIndex(cart: CartItem[], productId: string) {
  return cart.findIndex((cartItem) => cartItem.product.id === productId);
}

function copyArray<T>(array: T[]) {
  return [...array];
}

function removeCartItem(copiedCart: CartItem[], productId: string) {
  return copiedCart.filter((item) => item.product.id !== productId);
}

/**
 * 상품 구매 가능 수량 계산
 * @param {number} stock - 상품 재고
 * @param {number} quantity - 구매 예정 수량
 * @returns - 구매 가능 수량
 */
export function getAvailablePurchaseQuantity(stock: number, quantity: number) {
  return Math.min(stock, quantity);
}

/**
 *
 * @param {CartItem[]} cart - 장바구니
 * @param {string} productId - 상품 ID
 * @param {number} newQuantity - 변경할 상품 수량
 * @returns - 특정 상품의 갯수가 변경된 장바구니
 */
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
) => {
  const copiedCart = copyArray<CartItem>(cart);

  const index = findIndex(copiedCart, productId);

  if (newQuantity === 0) {
    return removeCartItem(copiedCart, productId);
  }

  const stock = copiedCart[index].product.stock;
  newQuantity = getAvailablePurchaseQuantity(stock, newQuantity);

  copiedCart[index].quantity = newQuantity;

  return copiedCart;
};
