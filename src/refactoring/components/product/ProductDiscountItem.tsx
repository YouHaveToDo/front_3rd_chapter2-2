import { Discount } from '../../../types.ts';

type ProductDiscountItemProps = {
  discount: Discount;
};

function ProductDiscountItem({ discount }: ProductDiscountItemProps) {
  return (
    <span>
      {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
    </span>
  );
}

export default ProductDiscountItem;
