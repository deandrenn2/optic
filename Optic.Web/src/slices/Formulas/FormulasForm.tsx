export const FormulasForm = () => {
    return (
        <form className="flex flex-col">
            <div className="mb-4">
                <label className="block text-gray-700">N° Formula</label>
                <input type="text" className="w-full px-3 py-2 border rounded" value="00001" readOnly />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Cliente</label>
                <input type="text" className="w-full px-3 py-2 border rounded" value="DEIMER ANDRES NUÑEZ NOVOA" readOnly />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Valor Consulta</label>
                <input type="text" className="w-full px-3 py-2 border rounded" value="$ 30.000" readOnly />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Fecha</label>
                <input type="text" className="w-full px-3 py-2 border rounded" value="07/08/2024" readOnly />
            </div>
            <div className="mb-4">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                <label className="block text-gray-700">Estado</label>
                <select className="w-full px-3 py-2 border rounded">
                    <option>Seleccione</option>
                </select>
            </div>
            <div className="">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-400">
                    Guardar
                </button>
            </div>
        </form>
    );
};