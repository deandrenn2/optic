import { faBoxesPacking, faMagnifyingGlass, faPlus, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SuppliersForm } from "./SuppliersForm"
import { MouseEvent, useState } from "react";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { useSupplier } from "./useSupplier";
import Swal from "sweetalert2";
import DeleteButton from "../../shared/components/Buttons/ButtonDelete";
import DetailButton from "../../shared/components/Buttons/ButtonDetail";
import { Bar } from "../../shared/components/Progress/Bar";
import { PurchasesCreate } from "../Purchase/PurchasesCreate";
export const Suppliers = () => {
    const [visible, setVisible] = useState(false);
    const [visiblePurchase, setVisiblePurchase] = useState(false);
    const { suppliers, querySuppliers, deleteSupplier } = useSupplier();
    const [searchSuppliers, setSearchSuppliers] = useState ('')
    function handleClose(): void {
        setVisible(false);
    }

    function handleClosePurchase(): void {
        setVisiblePurchase(false);
    }
    
    function handleOpenPurchase(): void {
        setVisiblePurchase(true);
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

    if (querySuppliers.isLoading)
        return <Bar Title="Cargando..." />;

    const filteredSuppliers = suppliers?.filter(supplier =>
     `${supplier.name}`.toLowerCase().includes(searchSuppliers.toLowerCase())
    )

    return (
        <div className="w-full "> {/* <!-- TABLA DE PROVEEDORES --> */}
            <div className="flex space-x-4 mb-4">
                <div className="mb-2">
                    <button type='button' onClick={() => setVisible(true)} className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">
                        <FontAwesomeIcon icon={faPlus} className="fa-search top-3 pr-2 font-bold" />Nuevo</button>
                </div>
                <div className="mb-2">
                    <button type='button' onClick={handleOpenPurchase} className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">
                        <FontAwesomeIcon icon={faBoxesPacking} className="fa-search top-3 pr-2 font-bold" />Pedidos</button>
                </div>
                <div className="mb-2">
                    <div className="relative">
                        <div className="inline-flex">
                            <input type="text"
                                value={searchSuppliers}
                                onChange={(e) => setSearchSuppliers(e.target.value)}
                                placeholder="Buscar Proveedor"
                                className="p-2 pl-10 border-blue-400 rounded-tl-lg rounded-bl-lg" />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="fas fa-search absolute left-3 top-3 text-gray-400" />
                            <button
                                className="text-white font-bold border hover:bg-blue-700 bg-blue-500 px-4 py-2 rounded-tr-lg rounded-br-lg ">Buscar</button>
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
                        <th className="border border-gray-300 p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSuppliers?.map((supplier) => (
                        <tr key={supplier.id}>

                            <td className="border border-gray-300 p-2 ">{supplier.name}</td>
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
            <OffCanvas titlePrincipal='Registro de Compra' visible={visiblePurchase} xClose={handleClosePurchase} position={Direction.Right}size="lg"  >
                <PurchasesCreate xChange={handleClosePurchase} />
            </OffCanvas>
            <OffCanvas titlePrincipal='Registro de Proveedor' visible={visible} xClose={handleClose} position={Direction.Right} >
                <SuppliersForm />
            </OffCanvas>
        </div>


    )
}