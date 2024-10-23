import { Coupon } from '../../../types.ts';

export const addCoupon = (coupons: Coupon[], newCoupon: Coupon) => {
  return [...coupons, newCoupon];
};
