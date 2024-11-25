import { useEffect, useRef, useState } from "react";
import { ProductModel, ProductsResponseModel } from "./ProductModel";
import useProduct from "./useProducts";
import { ButtonReset } from "../../shared/components/Buttons/ButtonReset";
export const ProductForm = ({ id }: { id?: number }) => {

   const [product, setProduct] = useState<ProductModel | ProductsResponseModel>({
      id: id,
      name: "",
      idBrand: 0,
      codeNumber: "",
      barCode: "",
      quantity: 0,
      unitPrice: 0,
      salePrice: 0,
      stock: 0,
      image: "",
   });
   const form = useRef<HTMLFormElement>(null);

   const { createProduct, updateProduct, products } = useProduct();
  
   
   useEffect(() => {
      if (id) {
         const product = products?.find((product: { id: number; }) => product.id === id);
         if (product) {
            setProduct(product);
         }
      }
   }, [id, product]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setProduct({ ...product, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (id) {
         await updateProduct.mutateAsync(product);
      } else {
         const res = await createProduct.mutateAsync(product);
         if (res.isSuccess) {
            form.current?.reset();
         }
      }
   };

    return (
      <form ref={form} className="flex flex-col" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
           N° Producto
          </label>
          <input
            required
            name="codeNumber"
            value={product?.codeNumber}
            onChange={(e) => handleChange(e)}
            placeholder="#"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Código de Barras:
          </label>
          <input
            required
            name="barCode"
            value={product?.barCode || ""}
            onChange={(e) => handleChange(e)}
            placeholder="Código de Barras"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            required
            name="name"
            value={product?. name}
            onChange={(e) => handleChange(e)}
            placeholder="Nombre del producto"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2">
                Marca/Modelo
               </label>
               <select
                  name="number"
                  value={product?.barCode}
                  onChange={(e) => handleChange(e)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Seleccione</option>
                  <option value="1">Crizal</option>
                  <option value="2">Ovation</option>
               </select>
            </div>
            


        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Precio de Costo
          </label>
          <input
            type="number"
            step="0.01"
            name="unitPrice"
            value={product?.unitPrice}
            onChange={(e) => handleChange(e)}
            placeholder="0"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Precio de Venta
          </label>
          <input
            type="number"
            step="0.01"
            name="salePrice"
            value={product?.salePrice}
            onChange={(e) => handleChange(e)}
            placeholder="0"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
           Existencias
          </label>
          <input
            type="number"
            step="0.01"
            name="stock"
            value={product?.stock}
            onChange={(e) => handleChange(e)}
            placeholder="stock"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Imagen (URL)
          </label>
          <input
            value={product?.image}
            onChange={(e) => handleChange(e)}
            placeholder="URL de la imagen del productoge"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div className="mt-4">
            {id &&
               (
                  <button type="submit" disabled={updateProduct.isPending} className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                     {updateProduct.isPending ? "Actualizando..." : "Actualizar Producto"}
                  </button>
               )}

            {!id &&
               (
                  <>
                     <button type="submit" disabled={createProduct.isPending} className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                        {createProduct.isPending ? "Creando..." : "Crear Producto"}
                     </button>
                     <ButtonReset />
                  </>)}
         </div>
      </form>
    );
};