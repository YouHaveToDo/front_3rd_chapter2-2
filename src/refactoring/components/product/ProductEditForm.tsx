import ProductDiscountItem from './ProductDiscountItem.tsx';
import { Discount, Product } from '../../../types.ts';
import ProductEditDiscountItem from './ProductEditDiscountItem.tsx';
import ProductAddDiscount from './ProductAddDiscount.tsx';

type ProductEditFormProps = {
  product: Product;
  onProductUpdate: (product: Product) => void;
  editingProduct: Product;
  setEditingProduct: (product: Product) => void;
  handleProductUpdate: (
    productId: string,
    key: string,
    newValue: string | number
  ) => void;
  editingDiscount: Discount;
  setEditingDiscount: (discount: Discount) => void;
  handleDeleteDiscount: (index: number) => void;
  handleAddDiscount: () => void;
};

function ProductEditForm({
  product,
  onProductUpdate,
  editingProduct,
  setEditingProduct,
  handleProductUpdate,
  editingDiscount,
  setEditingDiscount,
  handleDeleteDiscount,
  handleAddDiscount
}: ProductEditFormProps) {
  return (
    <div className="mt-2">
      {editingProduct && editingProduct.id === product.id ? (
        <div>
          <div className="mb-4">
            <label className="block mb-1">상품명: </label>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                handleProductUpdate(product.id, 'name', e.target.value)
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">가격: </label>
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                handleProductUpdate(
                  product.id,
                  'price',
                  parseInt(e.target.value)
                )
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">재고: </label>
            <input
              type="number"
              value={editingProduct.stock}
              onChange={(e) =>
                handleProductUpdate(
                  product.id,
                  'stock',
                  parseInt(e.target.value)
                )
              }
              className="w-full p-2 border rounded"
            />
          </div>
          {/*할인 정보 수정 부분*/}
          <div>
            <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
            {editingProduct.discounts.map((discount, index) => (
              <ProductEditDiscountItem
                key={index}
                discount={discount}
                onRemoveDiscount={() => handleDeleteDiscount(index)}
              />
            ))}
            <ProductAddDiscount
              editingDiscount={editingDiscount}
              setEditingDiscount={setEditingDiscount}
              onAddDiscount={handleAddDiscount}
            />
          </div>
          <button
            onClick={() => onProductUpdate(editingProduct)}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
          >
            수정 완료
          </button>
        </div>
      ) : (
        <div>
          {product.discounts.map((discount, index) => (
            <div className="mb-2" key={index}>
              <ProductDiscountItem discount={discount} />
            </div>
          ))}
          <button
            data-testid="modify-button"
            onClick={() => setEditingProduct(product)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
          >
            수정
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductEditForm;
