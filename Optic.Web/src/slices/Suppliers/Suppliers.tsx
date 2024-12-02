import { faMagnifyingGlass, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SuppliersForm } from "./SuppliersForm"
import { MouseEvent, useState } from "react";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { useSupplier } from "./useSupplier";
import Swal from "sweetalert2";
import DeleteButton from "../../shared/components/Buttons/ButtonDelete";
import DetailButton from "../../shared/components/Buttons/ButtonDetail";

export const Suppliers = () => {
    const [visible, setVisible] = useState(false);

    const { suppliers, querySuppliers, deleteSupplier } = useSupplier();

    function handleClose(): void {
        setVisible(false);
    }
    if (querySuppliers.isLoading) {
        return <div>Cargando...</div>;
    }

    function handleDelete(e: MouseEvent<HTMLButtonElement>, id: number): void {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar este proveedor?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                await deleteSupplier.mutateAsync(id);
            }
        })
    }

    return (
        <div className="w-full p-4"> {/* <!-- TABLA DE PROVEEDORES --> */}
            <div className="flex space-x-4 mb-4">
                <div className="mb-2">
                    <button type='button' onClick={() => setVisible(true)} className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">Nuevo Proveedor</button>
                </div>
                <div className="mb-2">
                    <div className="relative">
                        <div className="inline-flex">
                            <input type="text" placeholder="Buscar Proveedor" className="p-2 pl-10 border-blue-400 rounded" />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="fas fa-search absolute left-3 top-3 text-gray-400" />
                            <button
                                className="font-bold border p-2 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white ">Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- TABLA DE PROVEEDORES --> */}
            <table id="tablaProveedores" className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Proveedor</th>
                        <th className="border border-gray-300 p-2">Nit</th>
                        <th className="border border-gray-300 p-2">Celular</th>
                        <th className="border border-gray-300 p-2">Dirección</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers?.map((supplier) => (
                        <tr key={supplier.id}>

                            <td className="border border-gray-300 p-2 text-center">{supplier.name}</td>
                            <td className="border border-gray-300 p-2 text-center">{supplier.nit}</td>
                            <td className="border border-gray-300 p-2 text-center">{supplier.cellPhoneNumber}</td>
                            <td className="border border-gray-300 p-2 text-center">{supplier.address}</td>
                            <td className="border border-gray-300 p-2 text-center">{supplier.email}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <DetailButton url={`/suppliers/${supplier.id}`}/>
                                <DeleteButton id={supplier.id} onDelete={handleDelete} />
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tbody id="listaProveedores"></tbody>
            </table>
            <div className="mt-4 flex justify-center">
                <nav className="inline-flex rounded-md shadow">
                    <a href="#" className="px-4 py-2 bg-white hover:bg-blue-500  border border-gray-300">1</a>
                    <a href="#" className="px-4 py-2 bg-white hover:bg-blue-500  border border-gray-300">2</a>
                    <a href="#" className="px-4 py-2 bg-white hover:bg-blue-500 border border-gray-300">3</a>
                </nav>
            </div>
            <OffCanvas titlePrincipal='Registro de Proveedor' visible={visible} xClose={handleClose} position={Direction.Right} >
                <SuppliersForm />
            </OffCanvas>
        </div>


    )
}