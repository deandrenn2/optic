
import { useEffect, useRef, useState } from "react";
import { ProductModel, ProductsResponseModel } from "./ProductModel";
import useProducts from "./useProducts";
import { ButtonReset } from "../../shared/components/Buttons/ButtonReset";
export const ProductForm = ({ id }: { id?: number }) => {

   const [form, setForm] = useState<ProductModel | ProductsResponseModel>({
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
   const { createProduct, updateProduct, products } = useProducts();

   const formRef = useRef<HTMLFormElement>(null);

   useEffect(() => {
      if (id) {
         const product = products?.find((product) => product.id === id);
         if (product) {
            setForm(product);
         }
      }
   }, [id, products]);


   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm({
         ...form,
         [name]: value
      });
   };
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (id) {
         await updateProduct.mutateAsync(form);
      } else {
         const res = await createProduct.mutateAsync(form);
         if (res.isSuccess) {
            setForm({
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
            formRef.current?.reset();
         }
      }
   };
   return (
      <form className="flex flex-col" onSubmit={handleSubmit}>
         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               N° Producto
            </label>
            <input
               required
               name="codeNumber"
               value={form?.codeNumber}
               onChange={(e) => handleChange(e)}
               placeholder="#"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         </div>

         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Código de Barras
            </label>
            <input
               name="barCode"
               value={form?.barCode}
               onChange={(e) => handleChange(e)}
               placeholder="Código de Barras"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Nombre
            </label>
            <input
               required
               name="name"
               value={form?.name}
               onChange={(e) => handleChange(e)}
               placeholder="Nombre del producto"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>

         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Marca/Modelo
            </label>
            <select
               name="idBrand"
               value={form?.idBrand}
               onChange={(e) => handleChange(e)}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
               <option value="">Seleccione</option>
               <option value="1">Crizal</option>
               <option value="2">Ovation</option>
            </select>
         </div>

         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Cantidad
            </label>
            <input
               type="number"
               name="quantity"
               value={form?.quantity}
               onChange={(e) => handleChange(e)}
               placeholder="Cantidad"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>

         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Precio de Costo
            </label>
            <input
               type="number"
               step="0.01"
               name="unitPrice"
               value={form?.unitPrice}
               onChange={(e) => handleChange(e)}
               placeholder="0"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>

         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Precio de Venta
            </label>
            <input
               type="number"
               step="0.01"
               name="salePrice"
               value={form?.salePrice}
               onChange={(e) => handleChange(e)}
               placeholder="0"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>

         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Existencias
            </label>
            <input
               type="number"
               step="0.01"
               name="stock"
               value={form?.stock}
               onChange={(e) => handleChange(e)}
               placeholder="stock"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Imagen (URL)
            </label>
            <input
               value={form?.image}
               onChange={(e) => handleChange(e)}
               placeholder="URL de la imagen del productoge"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
         <div className="mt-1">
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




