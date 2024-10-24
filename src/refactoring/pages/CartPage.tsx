import { Coupon, Product } from '../../types.ts';
import { useCart } from '../hooks';
import OrderSummary from '../components/order/OrderSummary.tsx';
import { ChangeEvent } from 'react';
import CouponApply from '../components/order/CouponApply.tsx';
import CartItemCard from '../components/order/CartItemCard.tsx';
import CartItemList from '../components/order/CartItemList.tsx';

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    applyCoupon(coupons[parseInt(e.target.value)]);
  };

  const handleClickQuantityButton = () => {
    return (productId: string, quantity: number) => {
      updateQuantity(productId, quantity);
    };
  };

  const handleClickAddButton = () => {
    return (product: Product) => addToCart(product);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <div className="space-y-2">
            {products.map((product) => {
              return (
                <CartItemList
                  key={product.id}
                  cart={cart}
                  product={product}
                  onClickHandler={handleClickAddButton}
                />
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <div className="space-y-2">
            {cart.map((item) => {
              return (
                <CartItemCard
                  key={item.product.id}
                  item={item}
                  onClickHandler={handleClickQuantityButton}
                  removeFromCart={removeFromCart}
                />
              );
            })}
          </div>

          <CouponApply
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            onChangeHandler={handleChangeSelect}
          />

          <OrderSummary
            totalBeforeDiscount={totalBeforeDiscount}
            totalAfterDiscount={totalAfterDiscount}
            totalDiscount={totalDiscount}
          />
        </div>
      </div>
    </div>
  );
};
