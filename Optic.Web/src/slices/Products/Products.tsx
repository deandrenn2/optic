import { faMagnifyingGlass, faPlay, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { ProductForm } from "./ProductsForm";
import { Direction } from "../../shared/components/OffCanvas/Models";
export const Products = () => {
const [visible, setVisible] = useState(false);

    const handleClose = () => {
        setVisible(false);
    }

    function handleClick() {
        setVisible(true);
    }
    
    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-4">
            <div className="mb-2">
                <button type='button' className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="fa-search top-3 pr-2 font-bold" />Nuevo Producto</button>
            </div>

            <div className="mb-2">
                    <div className="relative">
                        <div className=" inline-flex">
                            <input type="text" placeholder="Buscar Proveedor" className="p-2 pl-10 border-blue-400 rounded" 
                                onClick={handleClick} />
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
                            <th className="border border-gray-300 p-2">Referencia Montura</th>
                            <th className="border border-gray-300 p-2">Marca / Modelo</th>
                            <th className="border border-gray-300 p-2">Categoría</th>
                            <th className="border border-gray-300 p-2">Precio de Costo</th>
                            <th className="border border-gray-300 p-2">precio de venta</th>
                            <th className="border border-gray-300 p-2">Existencias</th>
                            <th className="border border-gray-300 p-2">Opciones</th>
                        </tr>
                    </thead >
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2 text-center">1</td>
                            <td className="border border-gray-300 p-2 text-center">2480293473</td>
                            <td className="border border-gray-300 p-2 text-center">Gafa formulada L+ unisex</td>
                            <td className="border border-gray-300 p-2 text-center">JB325</td>
                            <td className="border border-gray-300 p-2 text-center">Jack Becker</td>
                            <td className="border border-gray-300 p-2 text-center">Gafas</td>
                            <td className="border border-gray-300 p-2 text-center">230.000</td>
                            <td className="border border-gray-300 p-2 text-center">320.000</td>
                            <td className="border border-gray-300 p-2 text-center">3</td>
                            <td className="border border-gray-300 p-1 text-center">
                                <FontAwesomeIcon icon={faPlay} className=" text-blue-500 cursor-pointer ml-0" />
                                <FontAwesomeIcon icon={faTrash} className=" text-red-500 cursor-pointer ml-2" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2 text-center">2</td>
                            <td className="border border-gray-300 p-2 text-center">2480293484</td>
                            <td className="border border-gray-300 p-2 text-center">Gafa unisex RB</td>
                            <td className="border border-gray-300 p-2 text-center">RB2185</td>
                            <td className="border border-gray-300 p-2 text-center">Real black</td>
                            <td className="border border-gray-300 p-2 text-center">Gafas</td>
                            <td className="border border-gray-300 p-2 text-center">150.000</td>
                            <td className="border border-gray-300 p-2 text-center">210.000</td>
                            <td className="border border-gray-300 p-2 text-center">20</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <FontAwesomeIcon icon={faPlay} className=" text-blue-500 cursor-pointer ml-0" />
                                <FontAwesomeIcon icon={faTrash} className=" text-red-500 cursor-pointer ml-2" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2 text-center">3</td>
                            <td className="border border-gray-300 p-2 text-center">2480293495</td>
                            <td className="border border-gray-300 p-2 text-center">Gafa formulada traslúcida unisex</td>
                            <td className="border border-gray-300 p-2 text-center">ORX2155</td>
                            <td className="border border-gray-300 p-2 text-center">Orion</td>
                            <td className="border border-gray-300 p-2 text-center">Gafas</td>
                            <td className="border border-gray-300 p-2 text-center">465.000</td>
                            <td className="border border-gray-300 p-2 text-center">699.000</td>
                            <td className="border border-gray-300 p-2 text-center">6</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <FontAwesomeIcon icon={faPlay} className=" text-blue-500 cursor-pointer ml-0" />
                                <FontAwesomeIcon icon={faTrash} className=" text-red-500 cursor-pointer ml-2" />
                            </td>
                        </tr>
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
    );
};