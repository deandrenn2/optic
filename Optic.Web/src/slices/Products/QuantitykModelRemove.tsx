import React, { useState } from "react";
import { ProductsResponseModel } from "./ProductModel";
export const QuantitykModelRemove = ({ product }: { product: ProductsResponseModel | undefined }) => {

  const [productCounte, setProductCounte] = useState(product?.quantity || 0); 
  const [quantityToRemove, setQuantityToRemove] = useState('');
  const [message, setMessage] = useState('');
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuantityToRemove(inputValue);
  
    const quantity = Number(inputValue);
  
    if (!inputValue || isNaN(quantity) || quantity <= 0) {
      setMessage('Por favor, ingresa un número válido.');
      return;
    }
  
    if (quantity > productCounte) {
      setMessage(`No puedes remover más de la cantidad disponible (${productCounte}).`);
      return;
    }
  
    const newProductCount = productCounte - quantity;
    setMessage(`La existencia actual será de ${newProductCount}.`);
  };
  
  const handleRemove = () => {
    const quantity = Number(quantityToRemove);
  
    const newProductCount = productCounte - quantity;
    setProductCounte(newProductCount); 
    setQuantityToRemove(''); 
    setMessage('Cantidad descontada exitosamente.');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form className="bg-white p-4 rounded-lg w-full max-w-md">
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
        <div className="mt-4">
          <button
            type="button"
            onClick={handleRemove}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-400 "
            disabled={isNaN(Number(quantityToRemove)) || Number(quantityToRemove) <= 0 || Number(quantityToRemove) >   productCounte || !! product?.quantity}>
              Guardar
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 mt-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
