export const FormulasDetail = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Formula</h1>
                    <div className="flex items-center">
                        <i className="fas fa-print text-blue-500 text-xl mr-2"></i>
                        <span className="text-xl font-bold">#00045</span>
                        <div className="relative h-20">
                            <i className=" fas fa-times cursor-pointer text-red-500"></i>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Cliente</label>
                        <p className="font-bold">DEIMER ANDRÉS NÚÑEZ NOVOA</p>
                    </div>
                    <div>
                        <label className="block text-gray-700">Fecha</label>
                        <div className="flex items-center">
                            <input type="text" value="29/09/2024" className="border border-gray-300 rounded p-2 w-full" />
                            <i className="fas fa-calendar-alt text-xl ml-2"></i>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Tipo Lente</label>
                        <input type="text" value="Progresivo" className="border border-gray-300 rounded p-2 w-full mb-2" />
                        <input type="text" value="Vidrio Blanco" className="border border-gray-300 rounded p-2 w-full" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Diagnostico</label>
                        <p className="font-bold">OI_ESF <span className="font-normal">N/A</span></p>
                        <p className="font-bold">ADD (Adición) <span className="font-normal">200</span></p>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción</label>
                    <textarea className="border border-gray-300 rounded p-2 w-full"></textarea>
                </div>
                <h2 className="text-xl font-bold mb-4">Facturación</h2>
                <div className="flex items-center mb-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2">+ Abono</button>
                    <select className="border border-gray-300 rounded p-2 mr-2">
                        <option>Estado</option>
                    </select>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Actualizar</button>
                    <input type="text" value="35.000" className="border border-gray-300 rounded p-2 ml-2 w-24" />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <p className="font-bold">MARCO CATERPILLER</p>
                        <input type="text" value="200.000" className="border border-gray-300 rounded p-2 w-full mb-2" />
                        <input type="text" value="120.000" className="border border-gray-300 rounded p-2 w-full" />
                    </div>
                    <div>
                        <p className="font-bold">Cantidad</p>
                        <input type="text" value="2" className="border border-gray-300 rounded p-2 w-full mb-2" />
                        <input type="text" value="1" className="border border-gray-300 rounded p-2 w-full" />
                    </div>
                    <div className=" text-right">
                        <p className="font-bold">Total:</p>
                        <p className="mb-2">Total: $400.000</p>
                        <p>Total: $120.000</p>
                    </div>
                </div>
                <div className="mb-4 text-right">
                    <p>Consulta: $35.000</p>
                    <p>Productos: $520.000</p>
                    <p>Abono: $0</p>
                    <p className="font-bold">Total: $555.000</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Confirma Fomula</button>
            </div>
        </div>
    );
};