import { useState } from "react";
import { ProductsResponseModel } from "./ProductModel";
export const QuantitykModel = ({ product,  }: { product: ProductsResponseModel }) => {
   const [form, setForm] = useState({
        id: product?.id || 0,
        quantity: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setForm((prevValues) => ({
            ...prevValues,
            [e.target.name]: value,
        }));
    }
  
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <form className="bg-white p-4 rounded-lg w-full max-w-md">
                <h2 className="flex flex-row text-2xl font-bold mb-2">Restar existencia</h2>
                <div className=" font-bold mb-4">
                    <p className="flex flex-ronw">Producto:{form?.quantity} </p>
                    <p className="flex fle-ronw">Exitencia Actual: </p>
                </div>
                <p className="text-blue-500 flex flex-row">Cantida a restar</p>
                <input
                    className="mt-1 block w-full border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-0"
                    type="number"
                    id="cantidad"              
                    onChange={handleChange}
                    value={product?.quantity}
                />
                <p className="text-gray-500 flex flex-row">¿Cuántos productos de este tipo restas?</p>
                <div className="mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-400 ">
                        Guardar
                    </button>
                    <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};
