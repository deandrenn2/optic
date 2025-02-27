import React, { useState } from "react";
import { ProductsResponseModel } from "./ProductModel";
import { useQuantity } from "./useProducts";
export const QuantitykModelRemove = ({ product, onClose,onUpdate }: { product: ProductsResponseModel | undefined; onClose(): void; onUpdate(): void }) => {
  const [productCount, setProductCount] = useState(product?.quantity || 0);
  const [quantityToRemove, setQuantityToRemove] = useState('');
  const [message, setMessage] = useState('');
  const { updateQuantity } = useQuantity();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuantityToRemove(inputValue);
    
    const quantity = Number(inputValue);
    if (!inputValue) {
      setMessage('');
      return;
    }
    const newProductCount = productCount - quantity;
    setMessage(`La existencia del producto será de ${newProductCount}.`);
  };
  
  const handleRemove = () => {
    const quantity = Number(quantityToRemove);
  
    if (isNaN(quantity) || quantity <= 0) {
      setMessage('Por favor ingrese una cantidad válida.');
      return;
    }
  
    if (quantity > productCount) {
      setMessage('No puedes restar más cantidad de la que hay en stock.');
      return;
    }
  
    if (product?.id) {
      updateQuantity.mutate(
        { id: product.id, quantity, isIncrement: false },
        {
          onSuccess: () => {
            const newProductCount = productCount - quantity;
            setProductCount(newProductCount);
            product.quantity = newProductCount; 
            setQuantityToRemove('');
            setMessage('');
            onUpdate();
          },
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        <form>
          <h2 className="text-2xl font-bold mb-2">Restar existencia</h2>
          <div className="font-bold mb-4">
            <p>Producto: {product?.name}</p>
            <p>Existencia actual: {product?.quantity}</p>
          </div>
          <p className="text-blue-500">Cantidad a restar:</p>
          <input
            className="mt-1 block w-full border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
            type="number"
            value={quantityToRemove}
            onChange={handleQuantityChange}
            min="1"
          />
          <p className="text-gray-500">¿Cuántos productos de este tipo restas?</p>
          {message && <p className="text-green-500">{message}</p>}
        </form>
        <div>
          <button
            type="submit"
            onClick={handleRemove}
            disabled={updateQuantity.isPending}
            className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold"
          >
            {updateQuantity.isPending ? "Guardar..." : "Guardar"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 mt-2">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
};