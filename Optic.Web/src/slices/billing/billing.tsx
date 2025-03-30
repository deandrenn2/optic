import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFileInvoiceDollar, faSearch } from "@fortawesome/free-solid-svg-icons";

import { BillingDocumentModel } from "./BillingModal";
import { getDocuments } from "./BillingServices";
import ButtonDelete from "../../shared/components/Buttons/ButtonDelete";
import ButtonDetail from "../../shared/components/Buttons/ButtonDetail";

export const Billing = () => {
    const [bills, setBills] = useState<BillingDocumentModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Estados para los filtros
    const [filterNumber, setFilterNumber] = useState<number | undefined>();
    const [filterStatus, setFilterStatus] = useState<string | undefined>();
    const [filterClient, setFilterClient] = useState<number | undefined>();
    const [filterSupplier, setFilterSupplier] = useState<number | undefined>();
    const [filterFrom, setFilterFrom] = useState<string | undefined>();
    const [filterTo, setFilterTo] = useState<string | undefined>();

    const fetchBills = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getDocuments(filterNumber, filterStatus);
            if (!response.isSuccess) throw new Error(response.message);
            setBills(response.data ?? []);
        } catch (err) {
            console.error("Error al obtener facturas:", err);
            setError("Error al obtener facturas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBills();
    }, []);

    return (
        <div className="w-full p-4">
            <div className="max-w-8xl mx-auto bg-white p-6 rounded shadow mb-4">

                {/* Filtros */}
                <div className="grid grid-cols-6 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Número de factura"
                        value={filterNumber || ""}
                        onChange={(e) => setFilterNumber(e.target.value ? parseInt(e.target.value) : undefined)}
                        className="border p-2 rounded"
                    />

                    <select
                        value={filterStatus || ""}
                        onChange={(e) => setFilterStatus(e.target.value || undefined)}
                        className="border p-2 rounded"
                    >
                        <option value="">Todas las transacciones</option>
                        <option value="Pago">Pagado</option>
                        <option value="Sin pagar">Sin pagar</option>
                    </select>

                    <input
                        type="text"
                        placeholder="ID Cliente"
                        value={filterClient || ""}
                        onChange={(e) => setFilterClient(e.target.value ? parseInt(e.target.value) : undefined)}
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        placeholder="ID Proveedor"
                        value={filterSupplier || ""}
                        onChange={(e) => setFilterSupplier(e.target.value ? parseInt(e.target.value) : undefined)}
                        className="border p-2 rounded"
                    />

                    <input
                        type="date"
                        value={filterFrom || ""}
                        onChange={(e) => setFilterFrom(e.target.value || undefined)}
                        className="border p-2 rounded"
                    />

                    <input
                        type="date"
                        value={filterTo || ""}
                        onChange={(e) => setFilterTo(e.target.value || undefined)}
                        className="border p-2 rounded"
                    />

                    <button
                        onClick={fetchBills}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
                    >
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />
                        Buscar
                    </button>
                </div>

                {/* Tabla de Facturas */}
                {loading ? (
                    <p className="text-center text-blue-500">Cargando facturas...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="overflow-y-auto max-h-96 border border-gray-300 rounded">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead className="bg-gray-100">
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
                                    {bills.map((bill) => (
                                        <tr key={bill.id} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 p-2 text-center">{bill.number}</td>
                                            <td className="border border-gray-300 p-2 text-center">{bill.typeDocument}</td>
                                            <td className="border border-gray-300 p-2 text-center">

                                                <span className={`px-2 py-1 rounded text-white ${bill.state === "Pago" ? "bg-green-500" : "bg-red-500"}`}>
                                                    {bill.state === "Pago" ? "Pagado" : "Sin pagar"}
                                                </span>
                                            </td>
                                            <td className="border border-gray-300 p-2 text-center">
                                                {bill.clientOrSupplier ? bill.clientOrSupplier : "Desconocido"}
                                            </td>
                                            <td className="border border-gray-300 p-2 text-center">
                                                {new Date(bill.date).toLocaleDateString()}
                                            </td>
                                            <td className="border border-gray-300 p-2 text-center">{bill.paymentMethod}</td>
                                            <td className="border border-gray-300 p-2 text-center font-bold">
                                                ${bill.total.toLocaleString()}
                                            </td>
                                            <td className="border border-gray-300 p-2 text-center">
                                                <ButtonDetail url={""} />
                                                <button className="text-green-500 mr-2 text-2xl">
                                                    <FontAwesomeIcon icon={faFileInvoiceDollar} />
                                                </button>
                                                <ButtonDelete id={0} onDelete={undefined} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
