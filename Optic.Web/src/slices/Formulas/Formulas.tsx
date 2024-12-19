import { faCircleMinus, faFileInvoiceDollar, faMagnifyingGlass, faPlay, faPlus, faPrint } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { FormulasDetail } from "./FormulasDetail";

export const Formulas = () => {
   const  [isOpen, setIsOpen] = useState(false);
    return (
        <div> <div className="w-full p-4">
            <div className="flex space-x-4 mb-2">
                <div className="mb-2">
                    <button type='button'
                        className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="fa-search top-3 pr-2 font-bold" onClick={() => setIsOpen(true)}/>
                            Nuevo
                    </button>
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
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">#</th>
                        <th className="border border-gray-300 p-2">Cliente</th>
                        <th className="border border-gray-300 p-2">Valor Consulta</th>
                        <th className="border border-gray-300 p-2">Fecha</th>
                        <th className="border border-gray-300 p-2">Estado</th>
                        <th className="border border-gray-300 p-2">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 p-2 text-center">#0023</td>
                        <td className="border border-gray-300 p-2 ">DEIMER ANDRES NUÑEZ NOVOA</td>
                        <td className="border border-gray-300 p-2 text-center">$30.000</td>
                        <td className="border border-gray-300 p-2 text-center">07/08/2024</td>
                        <td className="border border-gray-300 p-2 text-center text-green-500">Entregado</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay} /></button>
                            <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar} /></button>
                            <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint} /></button>
                            <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus} /></button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-2 text-center">#0024</td>
                        <td className="border border-gray-300 p-2 ">JAMES BRAVO ZUÑIGA</td>
                        <td className="border border-gray-300 p-2 text-center">$30.000</td>
                        <td className="border border-gray-300 p-2 text-center">07/08/2024</td>
                        <td className="border border-gray-300 p-2 text-center text-blue-500">En Producción</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay} /></button>
                            <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar} /></button>
                            <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint} /></button>
                            <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus} /></button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-2 text-center">#0025</td>
                        <td className="border border-gray-300 p-2 ">MARIA VERTEL VERTEL</td>
                        <td className="border border-gray-300 p-2 text-center">$30.000</td>
                        <td className="border border-gray-300 p-2 text-center">07/08/2024</td>
                        <td className="border border-gray-300 p-2 text-center text-red-500">Cancelado</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay} /></button>
                            <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar} /></button>
                            <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint} /></button>
                            <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus} /></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mt-4 flex justify-center">
                <nav className="inline-flex rounded-md shadow">
                    <a href="#" className="px-4 py-2 bg-white hover:bg-blue-500  border border-gray-300">1</a>
                    <a href="#" className="px-4 py-2 bg-white hover:bg-blue-500  border border-gray-300">2</a>
                    <a href="#" className="px-4 py-2 bg-white hover:bg-blue-500 border border-gray-300">3</a>
                </nav>
            </div>

        </div>
        {isOpen && <FormulasDetail onClose={() => setIsOpen(false)} />}
    </div>
    )
}