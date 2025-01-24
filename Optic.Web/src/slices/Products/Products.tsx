import { faMagnifyingGlass, faPlus, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { MouseEvent } from "react";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { ProductForm } from "./ProductsForm";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { useProducts } from "./useProducts";
import Swal from "sweetalert2";
import DeleteButton from "../../shared/components/Buttons/ButtonDelete";
import DetailButton from "../../shared/components/Buttons/ButtonDetail";
import { Bar } from "../../shared/components/Progress/Bar";
import { useListSettings } from "../../shared/components/List/useListSettings";
import { CategoriesForm } from "./CategoriesForm";
import { MoneyFormatter } from "../../shared/components/Numbers/MoneyFormatter";
import { ButtonStockRemove } from "../../shared/components/Buttons/ButtonStockRemove";
import { ProductsResponseModel } from "./ProductModel";
import { QuantitykModelRemove } from "./QuantitykModelRemove";



export const Products = () => {
    const [visible, setVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const [visibleCategories, setVisibleCategories] = useState(false);
    const { settings } = useListSettings();
    const { products, queryProducts, deleteProduct } = useProducts();
    const [product, setProduct] = useState<ProductsResponseModel | undefined>();
    
    const handleClickDecrease = (product: ProductsResponseModel) => {
        setProduct(product);
        setIsOpen(true);
    }
   
    function handleClose(): void {
        setVisible(false);
    }
    function handleDelete(e: MouseEvent<HTMLButtonElement>, id: number): void {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar este producto?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                await deleteProduct.mutateAsync(id);
            }
        })
    }
    const handleCloseCategories = (): void => {
        setVisibleCategories(false);
    }
    const getNameBrand = (id: number): string => {
        const brand = settings?.brands?.find(x => x.id === id);
        return brand?.name ?? '';
    }
    if (queryProducts.isLoading)
        return <Bar Title="Cargando..." />;
    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-2">
                <div className="mb-2">
                    <button type='button' className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"
                        onClick={() => setVisible(true)}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="fa-search top-3 pr-2 font-bold" />Nuevo</button>
                </div>
                <div className="mb-2">
                    <button type='button' className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"
                        onClick={() => setVisibleCategories(true)}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="fa-search top-3 pr-2 font-bold" />Categorias</button>
                </div>
                <div className="mb-2">
                    <div className="relative">
                        <div className=" inline-flex">
                            <input type="text"
                                placeholder="Buscar Proveedor"
                                className="p-2 pl-10 border-blue-400 rounded-tl-lg rounded-bl-lg" />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="fas fa-search absolute left-3 top-3 text-gray-400" />

                            <button
                                className="text-white font-bold border hover:bg-blue-700 bg-blue-500 px-4 py-2 rounded-tr-lg rounded-br-lg ">Buscar</button>
                        </div>
                    </div>
                </div>

            </div>
            {/* <!-- TABLA DE PRODUCTOS --> */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">N° Producto</th>
                        {settings?.isEnabledBarcode && <th className="border border-gray-300 p-2">Código de barra</th>}
                        <th className="border border-gray-300 p-2">Nombre</th>
                        <th className="border border-gray-300 p-2">Marca / Modelo</th>
                        <th className="border border-gray-300 p-2">Existencias</th>
                        <th className="border border-gray-300 p-2">Costo</th>
                        <th className="border border-gray-300 p-2">Precio de venta</th>
                        <th className="border border-gray-300 p-2">Stock</th>
                        <th className="border border-gray-300 p-2"></th>
                    </tr>
                </thead >
                <tbody>
                    {products?.map((product) => (
                        <tr key={product.id}>
                            <td className="border border-gray-300 p-2 text-center">#{product.codeNumber.padWithZeros(5)}</td>
                            {settings?.isEnabledBarcode && <td className="border border-gray-300 p-2 text-center">{product.barCode}</td>}
                            <td className="border border-gray-300 p-2 text-center">{product.name}</td>
                            <td className="border border-gray-300 p-2 text-center">{getNameBrand(product.idBrand)}</td>
                            <td className="border border-gray-300 p-2 text-center"> {product.quantity}</td>
                            <td className="border border-gray-300 p-2 text-center"><MoneyFormatter amount={product.unitPrice} /></td>
                            <td className="border border-gray-300 p-2 text-center"> <MoneyFormatter amount={product.salePrice} /></td>
                            <td className="border border-gray-300 p-2 text-center">{product.stock}</td>
                            <td className="border border-gray-300 p-2 text-center  ">
                                <DetailButton url={`/products/${product.id}`} />
                                <ButtonStockRemove onClick={() => handleClickDecrease(product)}/>
                                
                                <DeleteButton id={product.id} onDelete={handleDelete} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <OffCanvas titlePrincipal='Registro de Producto' visible={visible} xClose={handleClose} position={Direction.Right} >
                <ProductForm />
            </OffCanvas>
            <OffCanvas titlePrincipal='Registro de Categoria' visible={visibleCategories} xClose={handleCloseCategories} position={Direction.Right} >
                <CategoriesForm />
            </OffCanvas>      
            {isOpen && <QuantitykModelRemove product={product}/>}
        </div>
    )
}