import { faCircleMinus, faFileInvoiceDollar, faPlay, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Facturacion = () => {
    return (
        <div className="w-full p-4">
                <div className="mb-2">
                    <div className="max-w-8xl mx-auto bg-white p-6 rounded shadow mb-4 ">
                        <div className="grid grid-cols-4 gap-4 mb-4">
                            <div>
                                <label htmlFor="invoice-number" className="block text-sm font-medium text-gray-700">Número de factura</label>
                                <input type="text" id="invoice-number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div>
                                <label htmlFor="payment-status" className="block text-sm font-medium text-gray-700">Estado de pago</label>
                                <select id="payment-status" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                    <option>Todas las transacciones</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="clients" className="block text-sm font-medium text-gray-700">Clientes</label>
                                <select id="clients" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                    <option>Todos los Clientes</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="period" className="block text-sm font-medium text-gray-700">Periodo</label>
                                <div className="relative mt-1">
                                    <input type="text" id="period" className="block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    <i className="fas fa-calendar-alt absolute top-3 right-3 text-gray-500"></i>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded shadow flex items-center hover:bg-blue-700">
                                <i className="fas fa-search mr-2"></i> Buscar
                            </button>
                        </div>
                    </div>

                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2"># Factura</th>
                                <th className="border border-gray-300 p-2">Tipo documento</th>
                                <th className="border border-gray-300 p-2">Estado</th>
                                <th className="border border-gray-300 p-2">Cliente o Proveedor</th>
                                <th className="border border-gray-300 p-2">Fecha</th>
                                <th className="border border-gray-300 p-2">Tipo de pago</th>
                                <th className="border border-gray-300 p-2">Total</th>
                                <th className="border border-gray-300 p-2">Opciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2 text-center">0045</td>
                                <td className="border border-gray-300 p-2 text-center">Compra</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <span className="bg-green-500 text-white px-2 py-1 rounded">Pago</span></td>
                                <td className="border border-gray-300 p-2 text-center">Gafas el Imperio</td>
                                <td className="border border-gray-300 p-2 text-center">09/08/2024</td>
                                <td className="border border-gray-300 p-2 text-center">Efectivo</td>
                                <td className="border border-gray-300 p-2 text-center">1.200.000</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay}/></button>
                                    <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar}/></button>
                                    <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint}/></button>
                                    <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus}/></button>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-center">0046</td>
                                <td className="border border-gray-300 p-2 text-center">Compra</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <span className="bg-red-500 text-white px-2 py-1 rounded">Sin pagar</span></td>
                                <td className="border border-gray-300 p-2 text-center">Colgafas</td>
                                <td className="border border-gray-300 p-2 text-center">10/08/2024</td>
                                <td className="border border-gray-300 p-2 text-center">Creditos</td>
                                <td className="border border-gray-300 p-2 text-center">8.534.000</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay}/></button>
                                    <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar}/></button>
                                    <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint}/></button>
                                    <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus}/></button>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-center">0047</td>
                                <td className="border border-gray-300 p-2 text-center">Venta</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <span className="bg-green-500 text-white px-2 py-1 rounded">pago</span></td>
                                <td className="border border-gray-300 p-2 text-center">Pedreo Mantinez</td>
                                <td className="border border-gray-300 p-2 text-center">11/08/2024</td>
                                <td className="border border-gray-300 p-2 text-center">Efectivo</td>
                                <td className="border border-gray-300 p-2 text-center">1.200.000</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay}/></button>
                                    <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar}/></button>
                                    <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint}/></button>
                                    <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus}/></button>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-center">0048</td>
                                <td className="border border-gray-300 p-2 text-center">Venta</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <span className="bg-green-500 text-white px-2 py-1 rounded">pago</span></td>
                                <td className="border border-gray-300 p-2 text-center">Jose Bravo</td>
                                <td className="border border-gray-300 p-2 text-center">13/08/2024</td>
                                <td className="border border-gray-300 p-2 text-center">Efectivo</td>
                                <td className="border border-gray-300 p-2 text-center">1.200.000</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay}/></button>
                                    <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar}/></button>
                                    <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint}/></button>
                                    <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus}/></button>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-center">0049</td>
                                <td className="border border-gray-300 p-2 text-center">Compra</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <span className="bg-red-500 text-white px-2 py-1 rounded">Sin pagar</span></td>
                                <td className="border border-gray-300 p-2 text-center">Camila Medrano</td>
                                <td className="border border-gray-300 p-2 text-center">14/08/2024</td>
                                <td className="border border-gray-300 p-2 text-center">Efectivo</td>
                                <td className="border border-gray-300 p-2 text-center">1.200.000</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay}/></button>
                                    <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar}/></button>
                                    <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint}/></button>
                                    <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus}/></button>
                                </td>
                            </tr>

                            <tr>
                                <td className="border border-gray-300 p-2 text-center">0049</td>
                                <td className="border border-gray-300 p-2 text-center">Venta</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <span className="bg-red-500 text-white px-2 py-1 rounded">Sin pagar</span></td>
                                <td className="border border-gray-300 p-2 text-center">Andrea Martinez</td>
                                <td className="border border-gray-300 p-2 text-center">15/08/2024</td>
                                <td className="border border-gray-300 p-2 text-center">Efectivo</td>
                                <td className="border border-gray-300 p-2 text-center">1.200.000</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay}/></button>
                                    <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar}/></button>
                                    <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint}/></button>
                                    <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus}/></button>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 text-center">0050</td>
                                <td className="border border-gray-300 p-2 text-center">Compra</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <span className="bg-green-500 text-white px-2 py-1 rounded">pago</span></td>
                                <td className="border border-gray-300 p-2 text-center">Maria Peña</td>
                                <td className="border border-gray-300 p-2 text-center">/17/2024</td>
                                <td className="border border-gray-300 p-2 text-center">Efectivo</td>
                                <td className="border border-gray-300 p-2 text-center">1.200.000</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay}/></button>
                                    <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar}/></button>
                                    <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint}/></button>
                                    <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus}/></button>
                                </td>
                            </tr>

                            <tr>
                                <td className="border border-gray-300 p-2 text-center">0051</td>
                                <td className="border border-gray-300 p-2 text-center">Formula</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <span className="bg-green-500 text-white px-2 py-1 rounded">pago</span></td>
                                <td className="border border-gray-300 p-2 text-center">Cristina muños</td>
                                <td className="border border-gray-300 p-2 text-center">20/08/2024</td>
                                <td className="border border-gray-300 p-2 text-center">Efectivo</td>
                                <td className="border border-gray-300 p-2 text-center">1.200.000</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay}/></button>
                                    <button className="text-green-500 mr-3"><FontAwesomeIcon icon={faFileInvoiceDollar}/></button>
                                    <button className="text-blue-500 mr-3"><FontAwesomeIcon icon={faPrint}/></button>
                                    <button className="text-red-500"><FontAwesomeIcon icon={faCircleMinus}/></button>
                                </td>
                            </tr>
                        </tbody >
                    </table >
                </div>
            </div>
    )
}