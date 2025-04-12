import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import ButtonDetail from "../../shared/components/Buttons/ButtonDetail";
import { useFileDownload } from "../../shared/components/FilesDowload";
import { useBilling } from "./useBilling";
import { Bar } from "../../shared/components/Progress/Bar";
import { getStatusColorInvoice } from "../Formulas/FormulasUtils";
export const Billing = () => {
    const { descargarArchivo } = useFileDownload();
    const [filterNumber, setFilterNumber] = useState<number | undefined>();
    const [filterStatus, setFilterStatus] = useState<string | undefined>();
    const [filterClientOrSupplierType, setFilterClientOrSupplierType] = useState<string | undefined>("cliente");
    const [filterClientOrSupplierID,] = useState<number | undefined>();
    const [filterFrom, setFilterFrom] = useState<string | undefined>();
    const [filterTo, setFilterTo] = useState<string | undefined>();
    const { queryBilling, billing } = useBilling(filterNumber, filterStatus, filterClientOrSupplierType, filterClientOrSupplierID, undefined, filterFrom, filterTo);

    const handleDownload = async (id: number, typeDocument: string) => {
        let urlBlob = "";
        if (typeDocument === 'Venta')
            urlBlob = `/api/invoices/${id}/report`;
        if (typeDocument === 'Compra')
            urlBlob = `/api/purchases/${id}/report`;
        if (typeDocument === 'Formula')
            urlBlob = `/api/formulas/${id}/report`;

        await descargarArchivo(urlBlob, `${typeDocument}_${id}_${new Date().toISOString().split('T')[0]}.xlsx`);
    }

    if (queryBilling.isLoading)
        return <Bar Title="Cargando..." />;

    return (
        <div className="w-full p-4">
            <div className="max-w-8xl mx-auto bg-white p-6 rounded shadow mb-4">

                {/* Filtros */}
                <div className="grid grid-cols-2 md-grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-4">

                    <div>
                        <label className="block text-gray-700 text-sm mb-1">Número de factura</label>
                        <input
                            type="text"
                            placeholder="Número de factura"
                            value={filterNumber || ""}
                            onChange={(e) => setFilterNumber(e.target.value ? parseInt(e.target.value) : undefined)}
                            className="border p-2 w-full rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm mb-1">Estado de pago</label>
                        <select
                            value={filterStatus || ""}
                            onChange={(e) => setFilterStatus(e.target.value || undefined)}
                            className="border p-2 w-full rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Todas las transacciones</option>
                            <option value="Pagada">Pagada</option>
                            <option value="Crédito">Crédito</option>
                            <option value="Devolución">Devolución</option>
                            <option value="Anulada">Anulada</option>
                            <option value="Borrador">Borrador</option>
                        </select>
                    </div>

                    {/* Clientes */}
                    {/* <div>
                        <label className="block text-gray-700 text-sm mb-1">Clientes</label>
                        <select
                            value={filterClientOrSupplierType || ""}
                            onChange={(e) => setFilterClientOrSupplierType(e.target.value || undefined)}
                            className="border p-2 w-full rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Todo el listado</option>
                            <option value="cliente">Cliente</option>
                            <option value="proveedor">Proveedor</option>
                        </select>
                    </div> */}

                    {/* Período */}
                    {/* <div>
                        <label className="block text-gray-700 text-sm mb-1">Período</label>
                        <div className="flex items-center border rounded p-2">
                            <input
                                type="date"
                                value={filterFrom || ""}
                                onChange={(e) => setFilterFrom(e.target.value || undefined)}
                                className="w-full leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="mx-2">-</span>
                            <input
                                type="date"
                                value={filterTo || ""}
                                onChange={(e) => setFilterTo(e.target.value || undefined)}
                                className="w-full leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div> */}
                </div>

                {/* Botón de búsqueda */}
                <div className="flex justify-end">
                    {/* <button
                        onClick={fetchBills}
                        className="bg-blue-500 text-white px-6 py-2 rounded flex items-center"
                    >
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />
                        Buscar
                    </button> */}
                </div>
            </div>

            {/* Tabla de facturas */}
            <div className="overflow-x-auto">
                <div className="overflow-x-auto max-h-96 border border-gray-300 rounded">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2"># Factura</th>
                                <th className="border p-2">Tipo documento</th>
                                <th className="border p-2">Estado</th>
                                <th className="border p-2">Cliente o Proveedor</th>
                                <th className="border p-2">Fecha</th>
                                <th className="border p-2">Tipo de pago</th>
                                <th className="border p-2">Total</th>
                                <th className="border p-2">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queryBilling.isLoading && <Bar Title="Cargando..." />}
                            {!queryBilling.isLoading && billing && billing.map((bill, i) => (
                                <tr key={i} className="hover:bg-pink-200">
                                    <td className="border p-2 text-center">#{bill.number.toString().padStart(5, '0')}</td>
                                    <td className="border p-2 text-center">{bill.typeDocument}</td>
                                    <td className="border p-2 text-center">
                                        <span className={` ${bill.state?.trim().toLowerCase() === "pagada" ? "font-bold text-green-500 mr-2"
                                            : bill.state?.trim().toLowerCase() === "crédito" ?
                                                "font-bold text-blue-500 mr-2" : bill.state?.trim().toLowerCase() === "borrador" ?
                                                    "font-bold text-gray-500 mr-2" : "font-bold text-yellow-500 mr-2"}`}>{bill.state || "Desconocido"}
                                        </span>
                                        <span className="text-xs">
                                            <FontAwesomeIcon className={getStatusColorInvoice(bill.state)} icon={faCircle} />
                                        </span>
                                    </td>
                                    <td className="border p-2 text-center">{bill.clientOrSupplier}</td>
                                    <td className="border p-2 text-center">{new Date(bill.date).toLocaleDateString()}</td>
                                    <td className={`border p-2 text-center ${bill.paymentMethod === 'Contado' ? 'text-green-500 font-bold' : bill.paymentMethod === 'Crédito' ? 'text-blue-500 font-bold' : ''}`}>{bill.paymentMethod}</td>
                                    <td className="border p-2 text-center font-bold">${bill.total.toLocaleString()}</td>
                                    <td className="border p-2 text-center">
                                        <ButtonDetail url={bill.typeDocument === 'Venta' ? `/Sales/${bill.id}` : bill.typeDocument === "Formula" ? `/Formulas/${bill.id}` : `/Purchases/${bill.id}`} />
                                        <button onClick={() => handleDownload(bill.id, bill.typeDocument)} className="text-green-500 mr-3  text-2xl"><FontAwesomeIcon icon={faFileExcel} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};