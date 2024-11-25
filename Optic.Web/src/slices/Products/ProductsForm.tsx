import { useEffect, useRef, useState } from "react";
import { ProductsModel, ProductsResponseModel } from "./ProductsModel";
import useProduct from "./useProducts";
import { ButtonReset } from "../../shared/components/Buttons/ButtonReset";

export const ProductsForm = ({ id }: { id?: number }) => {

   const [product, setProduct] = useState<ProductsModel | ProductsResponseModel>({
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
   }, [id, products]);

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
        <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>ID Marca:</label>
          <input
            type="number"
            name="idBrand"
            value={product.idBrand}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Número de Código:</label>
          <input
            type="text"
            name="codeNumber"
            value={product.codeNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Código de Barras:</label>
          <input
            type="text"
            name="barCode"
            value={product.barCode || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio Unitario:</label>
          <input
            type="number"
            name="unitPrice"
            step="0.01"
            value={product.unitPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio de Venta:</label>
          <input
            type="number"
            name="salePrice"
            step="0.01"
            value={product.salePrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Inventario:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Imagen (URL):</label>
          <input
            type="text"
            name="image"
            value={product.image || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
            {id &&
               (
                  <button type="submit" disabled={updateProduct.isPending} className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                     {updateProduct.isPending ? "Actualizando..." : "Actualizar cliente"}
                  </button>
               )}

            {!id &&
               (
                  <>
                     <button type="submit" disabled={createProduct.isPending} className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                        {createProduct.isPending ? "Creando..." : "Crear cliente"}
                     </button>
                     <ButtonReset />
                  </>)}
         </div>
      </form>
    );
};