export const FormulasDetail = () => {
    return (
        <div
            className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black  bg-opacity-50 ">
            <div className=" bg-gray-100 p-1 mb-1 rounded-lg border border-grey-500 p-1  full fixed left-50 top-15">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-xl font-bold">Nueva formula</h1>
                    <span className="text-xl font-bold absolute right-10">#00045</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <label className=" font-bold block text-sm font-medium mb-0">Cliente</label>
                        <input type="text" className="w-full border border-gray-300 rounded p-1" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-0">Fecha</label>
                        <div className="relative">
                            <input type="text" className="w-full border border-gray-300 rounded p-1"
                                value="29/09/2024" />
                            <i className="fas fa-calendar-alt absolute right-1 top-2 text-gray-400"></i>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Tipo Lente</label>
                        <div className="flex items-center">
                            <select className="w-full border border-gray-300 rounded py-1 mr-1">
                                <option>Seleccione</option>
                            </select>
                            <button className="bg-green-500 text-white px-2 py-2 rounded">Agregar</button>
                        </div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-1">
                                <input type="text" className="w-full border-2  p-1 px-4 " value="Progresivo" />
                                <button className="text-red-500"><i
                                    className="fas fa-minus-circle alt absolute right-1 top-2  "></i></button>
                            </div>
                            <div className="relative">
                                <input type="text" className="w-full border-2  p-1 px-4 " value="Vidrio Blanco" />
                                <i className="fas fa-minus-circle alt absolute right-1 top-2 text-red-500  "></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Diagnóstico</label>
                        <div className="flex items-center">
                            <select className="w-full border border-gray-300 rounded p-1 mr-1">
                                <option>Seleccione</option>
                            </select>
                            <button className="bg-green-500 text-white px-2 py-2 rounded">Agregar</button>
                        </div>
                        <div className="mt-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold">OI_ESF </span>
                                <input type="text" className="w-209 border-2  p-1 px-4 ml-10 " value="No Aplica" />
                                <button className="bg-red-500 text-white px-2 py-1 rounded ">Eliminar</button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold"> ADD (Adición)</span>
                                <input type="text"
                                    className="w-209 border border-gray-300 rounded p-1 px-4 relative right-0"
                                    value="200" />
                                <button className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-0 py-0">
                    <label className="block text-sm font-medium mb-0">Descripción</label>
                    <textarea className="w-full border border-gray-300 rounded p-1"></textarea>
                </div>
                <div className="bg-gray-100 py-1 rounded-lg">
                    <h2 className="text-lg font-bold text-center">Facturación</h2>
                    <div className="flex items-center mb-3">
                        <button className="bg-blue-500 text-white px-1 py-1 rounded mr-1">+ Productucto</button>
                        <button className="bg-green-500 text-white px-1 py-1 rounded mr-1">+ Reparación</button>
                        <button className="bg-yellow-500 text-white px-1 py-1 rounded">+ Abono</button>
                        <div className="absolute right-6">
                            <label className="block text-sm font-medium mb-1">Valor Consulta</label>
                            <input type="text" className="w-full border border-gray-300 rounded p-1" value="35.000" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap- mb-4">
                        <div>
                            <div className="flex justify-center">
                                <span className="font-bold">MARCO CATERPILLER</span>
                                <input type="text" value="120.000"
                                    className="border border-gray-300 rounded p-1 ml-6" />
                                <input type="number" value="2"
                                    className="w-12 border border-gray-300 rounded p-1 ml-2" />
                                <button className="text-red-500  flex items-center"><i
                                    className="fas fa-minus-circle ml-2"></i></button>
                                <p className="absolute right-0">Total: $400.000</p>

                            </div>
                            <div className="flex justify-center">
                                <span className="font-bold">REPARACION LENTES</span>
                                <input type="text" className="border border-gray-300 rounded p-1 ml-6"
                                    value="35.000" />
                                <input type="number" value="1"
                                    className="w-12 border border-gray-300 rounded p-1 ml-2" />
                                <button className="text-red-500  justify-center"><i
                                    className="fas fa-minus-circle ml-2 "></i></button>
                                <p className="absolute right-0">Total: $400.000</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-4 text-right">
                    <p>Consulta: $35.000</p>
                    <p>Productos: $520.000</p>
                    <p>Abono: $0</p>
                    <p className="font-bold">Total: $555.000</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Guardar
                    Cambios
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" >
                    Cancerlar
                </button>
            </div>
        </div>
    );
};