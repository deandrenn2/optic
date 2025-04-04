import { useState, useEffect } from "react";
import { MoneyFormatter } from "../Numbers/MoneyFormatter";
import { getSalePaymentsService, SalesCreatePaymer } from "../../../slices/Sales/SalesServices";

export const SalesPaymer = ({ Id }: { Id: number }) => {
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [abonos, setAbonos] = useState<{ amount: number; date: string }[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // ✅ Nuevo estado para errores

    useEffect(() => {
        const loadAbonos = async () => {
            try {
                const response = await getSalePaymentsService(Id);
                if (response.isSuccess && response.data) {
                    setAbonos(response.data);
                }
            } catch (error) {
                setErrorMessage("Error al cargar los abonos. Intenta de nuevo.");
                console.error("Error al cargar los abonos:", error);
            }
        };
        loadAbonos();
    }, [Id]);

    const handleAddAbono = async () => {
        setErrorMessage(null); // ✅ Limpiar mensaje de error previo

        if (amount <= 0) {
            setErrorMessage("⚠️ Ingresa un monto válido mayor a 0.");
            return;
        }

        setLoading(true);
        const currentDate = new Date().toISOString();

        try {
            const response = await SalesCreatePaymer(Id, { amount, date: currentDate });

            if (response.isSuccess) {
                setAbonos([...abonos, { amount, date: currentDate }]);
                setAmount(0);
            } else {
                setErrorMessage(`❌ Error al agregar abono: ${response.message}`);
                console.error("❌ Error al agregar abono:", response.message);
            }
        } catch (error) {
            setErrorMessage("💥 Error de red o servidor. Intenta más tarde.");
            console.error("💥 Error de red o servidor:", error);
        } finally {
            setLoading(false);
        }
    };

    const totalAbonos = abonos.reduce((total, abono) => total + abono.amount, 0);

    return (
        <div className="grid-cols-2 mb-4 gap-4">
            {errorMessage && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{errorMessage}</div>
            )}
            <label className="block text-gray-700 font-bold mb-2">
                <MoneyFormatter amount={amount} />
            </label>
            <div className="flex rounded-lg w-full">
                <div className="relative">
                    <input
                        type="number"
                        placeholder="Abono"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        className="shadow appearance-none border rounded-tl-lg rounded-bl-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={handleAddAbono}
                    disabled={loading}
                    className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 font-bold rounded-tr-lg rounded-br-lg w-full"
                >
                    {loading ? "Guardando..." : "Agregar"}
                </button>
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">Facturación:</h3>
                <h3 className="text-lg font-semibold text-gray-700">
                    Abonos: <MoneyFormatter amount={totalAbonos} />
                </h3>
                <h3 className="text-lg font-semibold text-gray-700">Deuda:</h3>
                {abonos.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                        {abonos.map((abono, index) => (
                            <li key={index} className="flex justify-between items-center border-b border-gray-300 py-2">
                                <p className="text-sm text-gray-500">{new Date(abono.date).toLocaleDateString()}</p>
                                <p className="text-gray-600"><MoneyFormatter amount={abono.amount} /></p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No se han realizado abonos aún.</p>
                )}
            </div>
        </div>
    );
};
