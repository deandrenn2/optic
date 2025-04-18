import { useEffect, useRef, useState } from "react";
import { ProductModel, ProductsResponseModel } from "./ProductModel";
import { useProducts } from "./useProducts";
import { ButtonReset } from "../../shared/components/Buttons/ButtonReset";
import { useListSettings } from "../../shared/components/List/useListSettings";
import { SupplierSelect } from "../Suppliers/SupplierSelect";
import { ComponentBrands } from "../../shared/components/List/ComponentBrands";
import { CategoriesSelect, Option } from "./CategoriesSelect";
import { MultiValue } from "react-select";
import "../../shared/helpers/Utils";
import { MoneyFormatter } from "../../shared/components/Numbers/MoneyFormatter";
export const ProductForm = ({ id, isVisibleQuantity = true }: { id?: number, isVisibleQuantity?: boolean }) => {
   const { settings } = useListSettings();
   const isModeEdit = (id !== undefined && id !== null);
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
      idSupplier: 0,
      image: "",
      categories: [],
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
      if (name === "quantity" || name === "stock") {
         setForm({
            ...form,
            [name]: parseInt(value) < 0 ? 0 : parseInt(value),
         });
         return;
      }
      setForm({
         ...form,
         [name]: value
      });
   };

   const handleChangeCategories = (newValue: MultiValue<Option>) => {
      setForm({
         ...form,
         categories: newValue.map((x) => x?.value),
      });
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isModeEdit) {
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
               idSupplier: 0,
               image: "",
               categories: [],
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
               autoComplete="off"
               required
               name="codeNumber"
               value={form?.codeNumber}
               disabled={isModeEdit}
               onChange={(e) => handleChange(e)}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         </div>
         {settings?.isEnabledBarcode &&
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
            </div>}
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
            <label className="block text-gray-700 text-sm font-bold mb-2" >
               Proveedor
            </label>
            <SupplierSelect
               selectedValue={form?.idSupplier?.toString()}
               xChange={(e) => handleChange(e)}
               required
               name="idSupplier"
            />
         </div>

         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Marca/Modelo
            </label>
            <ComponentBrands selectedValue={form?.idBrand?.toString()} xChange={(e) => handleChange(e)} />
         </div>

         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Categoría
            </label>
            <CategoriesSelect xChange={handleChangeCategories} selectedValue={form?.categories?.map((x) => ({ value: x, label: x }))} />
         </div>
         {isVisibleQuantity &&
            <div className="mb-2">
               <label className="block text-gray-700 text-sm font-bold mb-2">
                  Cantidad
               </label>
               <input
                  type="number"
                  name="quantity"
                  min="0"
                  max="999"
                  value={form?.quantity}
                  onChange={(e) => handleChange(e)}
                  placeholder="Cantidad"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>}

         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Precio de Costo <MoneyFormatter amount={form?.unitPrice} />
            </label>
            <input
               type="number"
               name="unitPrice"
               value={form?.unitPrice}
               onChange={(e) => handleChange(e)}
               required
               placeholder="0"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>

         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Precio de Venta <MoneyFormatter amount={form?.salePrice} />
            </label>
            <input
               type="number"
               step="0.01"
               name="salePrice"
               value={form?.salePrice}
               onChange={(e) => handleChange(e)}
               required
               placeholder="0"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>

         <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
               Stock
            </label>
            <input
               type="number"
               min="0"
               max="999"
               name="stock"
               value={form?.stock}
               onChange={(e) => handleChange(e)}
               required
               placeholder="stock"
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