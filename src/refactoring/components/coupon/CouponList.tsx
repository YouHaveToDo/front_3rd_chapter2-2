import { Coupon } from '../../../types.ts';
import CouponItem from './CouponItem.tsx';

type CouponListProps = {
  coupons: Coupon[];
};

function CouponList({ coupons }: CouponListProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
      <div className="space-y-2">
        {coupons.map((coupon, index) => (
          <CouponItem
            key={index}
            coupon={coupon}
            dataTestId={`coupon-${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CouponList;
