import { Coupon } from '../../../types.ts';

type CouponItemProps = {
  coupon: Coupon;
  dataTestId: string;
};

function formatText(coupon: Coupon) {
  return `${coupon.name} (${coupon.code}):${
    coupon.discountType === 'amount'
      ? coupon.discountValue
      : coupon.discountValue
  }% 할인`;
}

function CouponItem({ coupon, dataTestId }: CouponItemProps) {
  return (
    <div data-testid={dataTestId} className="bg-gray-100 p-2 rounded">
      {formatText(coupon)}
    </div>
  );
}

export default CouponItem;
