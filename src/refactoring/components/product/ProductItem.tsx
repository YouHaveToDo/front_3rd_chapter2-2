import { Discount, Product } from '../../../types.ts';
import { useToggleProduct } from '../../hooks/useToggleProduct.ts';
import ProductEditForm from './ProductEditForm.tsx';

type ProductItemProps = {
  product: Product;
  dataTestId: string;
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
  handleDeleteProduct: (index: number) => void;
  handleAddDiscount: () => void;
};

// const testId = `product-${index + 1}`;

function ProductItem({
  product,
  dataTestId,
  onProductUpdate,
  editingProduct,
  setEditingProduct,
  handleProductUpdate,
  editingDiscount,
  setEditingDiscount,
  handleDeleteProduct,
  handleAddDiscount
}: ProductItemProps) {
  const { openProductIds, toggleProductAccordion } = useToggleProduct();

  return (
    <div data-testid={dataTestId} className="bg-white p-4 rounded shadow">
      <button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion(product.id)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>

      {openProductIds.has(product.id) && (
        <ProductEditForm
          product={product}
          onProductUpdate={onProductUpdate}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          handleProductUpdate={handleProductUpdate}
          editingDiscount={editingDiscount}
          setEditingDiscount={setEditingDiscount}
          handleDeleteDiscount={handleDeleteProduct}
          handleAddDiscount={handleAddDiscount}
        />
      )}
    </div>
  );
}

export default ProductItem;
