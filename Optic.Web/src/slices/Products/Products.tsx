import { faCircleMinus, faMagnifyingGlass, faPlay, faPlus, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { MouseEvent } from "react";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { ProductForm } from "./ProductsForm";
import { Direction } from "../../shared/components/OffCanvas/Models";
import useProducts from "./useProducts";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


export const Products = () => {
    const [visible, setVisible] = useState(false);

    const { products, queryProducts, deleteProduct } = useProducts();

    function handleClose(): void {
        setVisible(false);
    }

    if (queryProducts.isLoading) {
        return <div>Cargando...</div>;
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
    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-4">
                <div className="mb-2">
                    <button type='button' className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"
                        onClick={() => setVisible(true)}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="fa-search top-3 pr-2 font-bold" />Nuevo Producto</button>
                </div>

                <div className="mb-2">
                    <div className="relative">
                        <div className=" inline-flex">
                            <input type="text" placeholder="Buscar Proveedor" className="p-2 pl-10 border-blue-400 rounded" />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="fas fa-search absolute left-3 top-3 text-gray-400" />
                            <button
                                className="font-bold border p-2 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700 ">Buscar</button>
                            <div className=" ml-2">
                                <div className="flex items-center bg-gray-600 text-white rounded-md">
                                    <div className="px-3 py-2 border-r border-gray-500">1</div>
                                    <div className="px-3 py-2 flex items-center"> Filtrar <i className="fas fa-caret-down ml-2"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- TABLA DE PRODUCTOS --> */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">N° Producto</th>
                        <th className="border border-gray-300 p-2">Código de barra</th>
                        <th className="border border-gray-300 p-2">Nombre</th>
                        <th className="border border-gray-300 p-2">Marca / Modelo</th>
                        <th className="border border-gray-300 p-2">Cantidad</th>
                        <th className="border border-gray-300 p-2">Precio de Costo</th>
                        <th className="border border-gray-300 p-2">precio de venta</th>
                        <th className="border border-gray-300 p-2">Existencias</th>
                        <th className="border border-gray-300 p-2">Opciones</th>
                    </tr>
                </thead >
                <tbody>
                    {products?.map((product) => (
                        <tr key={product.id}>
                            <td className="border border-gray-300 p-2 text-center">{product.codeNumber}</td>
                            <td className="border border-gray-300 p-2 text-center">{product.barCode}</td>
                            <td className="border border-gray-300 p-2 text-center">{product.name}</td>
                            <td className="border border-gray-300 p-2 text-center">{product.idBrand}</td>
                            <td className="border border-gray-300 p-2 text-center">{product.quantity}</td>
                            <td className="border border-gray-300 p-2 text-center">{product.unitPrice}</td>
                            <td className="border border-gray-300 p-2 text-center">{product.salePrice}</td>
                            <td className="border border-gray-300 p-2 text-center">{product.stock}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <Link to={`/Products/${product.id}`} title='Ver detalle' className='text-blue-500  mr-10 hover:text-blue-700'>
                                    <FontAwesomeIcon icon={faPlay} />
                                </Link>
                                <button className="text-red-500" onClick={(e) => handleDelete(e, product.id)}>
                                    <FontAwesomeIcon icon={faCircleMinus} className="ml-2" />
                                </button>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <nav className="inline-flex">
                    <a href="#"
                        className="hover:bg-blue-500 px-3 py-1 border border-gray-300 bg-white text-gray-700">1</a>
                    <a href="#"
                        className="hover:bg-blue-500 px-3 py-1 border border-gray-300 bg-white text-gray-700">2</a>
                    <a href="#"
                        className="hover:bg-blue-500 px-3 py-1 border border-gray-300 bg-white text-gray-700">3</a>
                </nav>
            </div>
            <OffCanvas titlePrincipal='Registro de Producto' visible={visible} xClose={handleClose} position={Direction.Right} >
                <ProductForm />
            </OffCanvas>
        </div>
    )
}