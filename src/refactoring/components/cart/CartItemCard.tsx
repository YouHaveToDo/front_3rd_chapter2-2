import { CartItem } from '../../../types.ts';
import { getMaxApplicableDiscount } from '../../hooks/utils/cartUtils.ts';
import { subtract, sum } from '../../utils/calculator.ts';

type CartHistoryProps = {
  item: CartItem;
  onClickHandler: () => (id: string, quantity: number) => void;
  removeFromCart?: (id: string) => void;
};

function CartItemCard({
  item,
  onClickHandler,
  removeFromCart = () => {}
}: CartHistoryProps) {
  const appliedDiscount = getMaxApplicableDiscount(item);

  return (
    <div
      key={item.product.id}
      className="flex justify-between items-center bg-white p-3 rounded shadow"
    >
      <div>
        <span className="font-semibold">{item.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {item.product.price}원 x {item.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">
              ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
            </span>
          )}
        </span>
      </div>
      <div>
        <button
          onClick={() =>
            onClickHandler()(item.product.id, subtract(item.quantity, 1))
          }
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
        >
          -
        </button>
        <button
          onClick={() =>
            onClickHandler()(item.product.id, sum(item.quantity, 1))
          }
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(item.product.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default CartItemCard;
