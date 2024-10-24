import { Discount } from '../../../types.ts';

type ProductDiscountEditItemProps = {
  discount: Discount;
  onRemoveDiscount: () => void;
};

function ProductEditDiscountItem({
  discount,
  onRemoveDiscount
}: ProductDiscountEditItemProps) {
  return (
    <div className="flex justify-between items-center mb-2">
      <span>
        {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
      </span>
      <button
        onClick={onRemoveDiscount}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        삭제
      </button>
    </div>
  );
}

export default ProductEditDiscountItem;
