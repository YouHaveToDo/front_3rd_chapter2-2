import ProductItem from './ProductItem.tsx';
import { Discount, Product } from '../../../types.ts';
import { useForm } from '../../hooks/useForm.ts';

type ProductInfoProps = {
  products: Product[];
  onProductUpdate: (product: Product) => void;
};

function ProductInfo({ products, onProductUpdate }: ProductInfoProps) {
  const {
    form: editingProduct,
    setForm: setEditingProduct,
    clearForm: clearEditingProduct
  } = useForm<Product>({
    id: '',
    name: '',
    price: 0,
    stock: 0,
    discounts: []
  });

  const { form: editingDiscount, setForm: setEditingDiscount } =
    useForm<Discount>({
      quantity: 1,
      rate: 1
    });

  const handleEditingProductUpdate = (updatedProduct: Product) => {
    onProductUpdate(updatedProduct);
    clearEditingProduct();
  };

  // 새로운 핸들러 함수 추가
  const handleProductUpdate = (
    productId: string,
    key: string,
    newValue: string | number
  ) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, [key]: newValue };
      setEditingProduct(updatedProduct);
    }
  };

  const handleDeleteProduct = (index: number) => {
    const updatedDiscount = editingProduct.discounts.filter(
      (_, i) => i !== index
    );
    setEditingProduct((prev) => ({ ...prev, discounts: updatedDiscount }));
  };

  const handleAddDiscount = () => {
    const updatedDiscounts = [...editingProduct.discounts, editingDiscount];
    setEditingProduct((prev) => ({ ...prev, discounts: updatedDiscounts }));
  };

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductItem
          key={product.id}
          product={product}
          dataTestId={`product-${index + 1}`}
          onProductUpdate={handleEditingProductUpdate}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          handleProductUpdate={handleProductUpdate}
          editingDiscount={editingDiscount}
          setEditingDiscount={setEditingDiscount}
          handleDeleteProduct={handleDeleteProduct}
          handleAddDiscount={handleAddDiscount}
        />
      ))}
    </div>
  );
}

export default ProductInfo;
