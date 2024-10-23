import { Coupon } from '../../types.ts';
import { useState } from 'react';
import * as couponUtils from './utils/couponUtils';

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (newCoupon: Coupon) =>
    setCoupons((prev) => couponUtils.addCoupon(prev, newCoupon));

  return {
    coupons,
    addCoupon
  };
};
