import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faSearch } from "@fortawesome/free-solid-svg-icons";
import { BillingDocumentModel } from "./BillingModal";
import { getDocuments } from "./BillingServices";
import ButtonDelete from "../../shared/components/Buttons/ButtonDelete";
import ButtonDetail from "../../shared/components/Buttons/ButtonDetail";
import { useFileDownload } from "../../shared/components/FilesDowload";

export const Billing = () => {
    const [bills, setBills] = useState<BillingDocumentModel[]>([]);
    const { descargarArchivo } = useFileDownload();

    // Estados para los filtros
    const [filterNumber, setFilterNumber] = useState<number | undefined>();
    const [filterStatus, setFilterStatus] = useState<string | undefined>();
    const [filterClientOrSupplierType, setFilterClientOrSupplierType] = useState<string | undefined>("cliente");
    const [filterClientOrSupplierID,] = useState<number | undefined>();
    const [filterFrom, setFilterFrom] = useState<string | undefined>();
    const [filterTo, setFilterTo] = useState<string | undefined>();

    const fetchBills = async () => {
        try {
            const response = await getDocuments(
                filterNumber,
                filterStatus,
                undefined,
                filterClientOrSupplierID,
                undefined,
                filterFrom,
                filterTo
            );
            if (!response.isSuccess) throw new Error(response.message);
            setBills(response.data ?? []);
        } catch (err) {
            console.error("Error al obtener facturas:", err);
        }
    };

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

    useEffect(() => {
        fetchBills();
    }, []);

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
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm mb-1">Estado de pago</label>
                        <select
                            value={filterStatus || ""}
                            onChange={(e) => setFilterStatus(e.target.value || undefined)}
                            className="border p-2 w-full rounded"
                        >
                            <option value="">Todas las transacciones</option>
                            <option value="Pagada">Pagada</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Crédito">Crédito</option>
                            <option value="Borrador">Borrador</option>
                        </select>
                    </div>

                    {/* Clientes */}
                    <div>
                        <label className="block text-gray-700 text-sm mb-1">Clientes</label>
                        <select
                            value={filterClientOrSupplierType || ""}
                            onChange={(e) => setFilterClientOrSupplierType(e.target.value || undefined)}
                            className="border p-2 w-full rounded"
                        >
                            <option value="">Todos los Clientes</option>
                            <option value="cliente">Cliente</option>
                            <option value="proveedor">Proveedor</option>
                        </select>
                    </div>

                    {/* Período */}
                    <div>
                        <label className="block text-gray-700 text-sm mb-1">Período</label>
                        <div className="flex items-center border rounded p-2">
                            <input
                                type="date"
                                value={filterFrom || ""}
                                onChange={(e) => setFilterFrom(e.target.value || undefined)}
                                className="w-full"
                            />
                            <span className="mx-2">-</span>
                            <input
                                type="date"
                                value={filterTo || ""}
                                onChange={(e) => setFilterTo(e.target.value || undefined)}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Botón de búsqueda */}
                <div className="flex justify-end">
                    <button
                        onClick={fetchBills}
                        className="bg-blue-500 text-white px-6 py-2 rounded flex items-center"
                    >
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />
                        Buscar
                    </button>
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
                            {bills.map((bill, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="border p-2 text-center">#{bill.number.toString().padStart(5, '0')}</td>
                                    <td className="border p-2 text-center">{bill.typeDocument}</td>
                                    <td className="border p-2 text-center">
                                        <span className={`px-2 py-1 rounded text-white ${bill.state?.trim().toLowerCase() === "pagada" ? "bg-green-500"
                                            : bill.state?.trim().toLowerCase() === "crédito" ? "bg-blue-500" : bill.state?.trim().toLowerCase() === "borrador" ? "bg-gray-500" : "bg-red-500"}`}>{bill.state || "Desconocido"}
                                        </span>
                                    </td>
                                    <td className="border p-2 text-center">{bill.clientOrSupplier}</td>
                                    <td className="border p-2 text-center">{new Date(bill.date).toLocaleDateString()}</td>
                                    <td className="border p-2 text-center">{bill.paymentMethod}</td>
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