import { faCircleMinus, faFileInvoiceDollar, faPlay, faPrint } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Formulas = () => {
    return (
        <div> <div className="w-5/6 p-4">
            <div className="bg-gray-300 p-4 mb-1 rounded-lg border border-grey-500 mb-4">
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
                                <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay}/></button>
                                <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar}/></button>
                                <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint}/></button>
                                <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus}/></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2 text-center">#0024</td>
                            <td className="border border-gray-300 p-2 ">JAMES BRAVO ZUÑIGA</td>
                            <td className="border border-gray-300 p-2 text-center">$30.000</td>
                            <td className="border border-gray-300 p-2 text-center">07/08/2024</td>
                            <td className="border border-gray-300 p-2 text-center text-blue-500">En Producción</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay}/></button>
                                <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar}/></button>
                                <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint}/></button>
                                <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus}/></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2 text-center">#0025</td>
                            <td className="border border-gray-300 p-2 ">MARIA VERTEL VERTEL</td>
                            <td className="border border-gray-300 p-2 text-center">$30.000</td>
                            <td className="border border-gray-300 p-2 text-center">07/08/2024</td>
                            <td className="border border-gray-300 p-2 text-center text-red-500">Cancelado</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay}/></button>
                                <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar}/></button>
                                <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint}/></button>
                                <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus}/></button>
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
        </div>
        </div>
    )
}