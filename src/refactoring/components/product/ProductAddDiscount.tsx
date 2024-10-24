import { Discount } from '../../../types.ts';

type ProductAddDiscountProps = {
  editingDiscount: Discount;
  setEditingDiscount: (discount: Discount) => void;
  onAddDiscount: () => void;
};

function ProductAddDiscount({
  editingDiscount,
  setEditingDiscount,
  onAddDiscount
}: ProductAddDiscountProps) {
  return (
    <div className="flex space-x-2">
      <input
        type="number"
        placeholder="수량"
        value={editingDiscount.quantity}
        onChange={(e) =>
          setEditingDiscount({
            ...editingDiscount,
            quantity: parseInt(e.target.value)
          })
        }
        className="w-1/3 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="할인율 (%)"
        value={editingDiscount.rate * 100}
        onChange={(e) =>
          setEditingDiscount({
            ...editingDiscount,
            rate: parseInt(e.target.value) / 100
          })
        }
        className="w-1/3 p-2 border rounded"
      />
      <button
        onClick={onAddDiscount}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        할인 추가
      </button>
    </div>
  );
}

export default ProductAddDiscount;
