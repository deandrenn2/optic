import { useProducts, } from "./useProducts";
import { useState } from "react";

export const QuantitykModel = ({ }) => {
    const { products } = useProducts();
    const [form] = useState({
        id: 0,
        quantity: 0,
      });


   
return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Agregar existencia</h2>
            {products?.map((product) => (
              <div key={product.id} className="mb-4">
                <p className="mb-1">
                  <strong>Producto: </strong>
                  {product?.name || "Desconocido"}
                </p>
                <p>
                  <strong>Cantidad: </strong>
                  {product?.quantity}
                </p>
              </div>
            ))}
    
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="number"
              id="cantidad"
              placeholder="¿Cuántos productos de este tipo agrega?"
              value={form.quantity}
            />
    
            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-400"
                onClick={() => (form)}
              >
                Guardar
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      );
    };
    