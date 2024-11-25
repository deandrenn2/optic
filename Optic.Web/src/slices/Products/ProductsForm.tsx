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
        <div className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre:
            </label>
          <input
            
            value={product?.name}
            onChange={(e) => handleChange(e)}
             name="firstName"
            placeholder="Nombre"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID Marca:
          </label>
          <input
            required
            type="number"
            name="idBrand"
            value={product.idBrand}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Número de Código:</label>
          <input
            required
            type="text"
            name="codeNumber"
            value={product.codeNumber}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div  className="mb-4">
          <label  className="block text-gray-700 text-sm font-bold mb-2">
            Código de Barras:
          </label>
          <input
            type="text"
            name="barCode"
            value={product?.barCode || ""}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div  className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Cantidad:
          </label>
          <input
            type="number"
            name="quantity"
            value={product?.quantity}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div  className="mb-4">
          <label  className="block text-gray-700 text-sm font-bold mb-2">
            Precio Unitario:
          </label>
          <input
            type="number"
            name="unitPrice"
            step="0.01"
            value={product.unitPrice}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div  className="mb-4">
          <label  className="block text-gray-700 text-sm font-bold mb-2">
            Precio de Venta:
          </label>
          <input
            type="number"
            name="salePrice"
            step="0.01"
            value={product.salePrice}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Inventario:
          </label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Imagen (URL):
          </label>
          <input
            type="text"
            name="image"
            value={product.image || ""}
            onChange={(e) => handleChange(e)}
          />
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
        </div>
      </form>
    );
};