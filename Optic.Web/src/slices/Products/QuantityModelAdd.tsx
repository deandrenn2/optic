import { useState } from "react";
import { ProductsResponseModel } from "./ProductModel";
import { useQuantity } from "./useProducts";
export const QuantityModelAdd = ({product,onClose}: {product: ProductsResponseModel | undefined; onClose (): void}) => {
  const [productCount, setProductCount] = useState(product?.quantity || 0);
  const [quantityToAdd, setQuantityToAdd] = useState('');
  const [message, setMessage] = useState('');
  const {updateQuantity} = useQuantity ()

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuantityToAdd(inputValue);

    const quantity = Number(inputValue);

    if (!inputValue) {
      setMessage('');
      return;
    }
    const newProductCount = productCount + quantity;
    setMessage(`La existencia del producto será de ${newProductCount}.`);
  };
 
  const handleAdd = () => {
    const quantity = Number(quantityToAdd);

    if (isNaN(quantity) || quantity <= 0) {
      return;
    }

    const newProductCount = productCount + quantity;
    setProductCount(newProductCount);
    setQuantityToAdd('');
    setMessage('');
    if (product?.id) {
      updateQuantity.mutate(
        { id: product.id, quantity: newProductCount, isIncrement: true },
       
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form className="bg-white p-4 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Agregar existencia</h2>
        <div className="font-bold mb-4">
          <p>Producto: {product?.name}</p>
          <p>Existencia actual: {productCount}</p>
        </div>
        <p className="text-blue-500">Cantidad</p>
        <input
          className="mt-1 block w-full border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
          type="number"
          value={quantityToAdd}
          onChange={handleQuantityChange}
          min="1"
        />
        <p className="text-gray-500">¿Cuántos productos de este tipo deseas agregar?</p>
        {message && <p className="text-green-500">{message}</p>}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleAdd}
            disabled={updateQuantity.isPending}
            className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-400">
             {updateQuantity.isPending ? "Guardar..." : "Guardar"}
          </button>
         
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 mt-2">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
