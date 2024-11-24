export const ProductsForm = () => {
    return (
        <div
            className="fixed inset-y-3 right-0 translate-x-full transition-transform duration-300 bg-gray-00 text-black-500 ">
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl text-black-600">Nuevo Producto</h2>
                        <i id="cerrarModal" className="fas fa-times cursor-pointer text-red-500"></i>
                    </div>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700">N° Producto</label>
                            <input type="text" className="w-full px-3 py-2 border rounded" value="00001" readOnly />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Codigo de Barra
                                <span className="ml-2 text-gray-600">Generar Automático</span>
                                <label className="ml-2 flex items-center ">
                                    <input type="checkbox" className="hidden"/>
                                    <span className="relative">
                                        <span className="block w-10 h-6 bg-gray-300 rounded-full shadow-inner"></span>
                                        <span
                                            className="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out"></span>
                                    </span>
                                </label>
                            </label>
                            <div className="flex items-center">
                                <input type="text" className="w-full px-3 py-2 border rounded"
                                    placeholder="Escribe o Genera el código" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Producto</label>
                            <input type="text" className="w-full px-3 py-2 border rounded"
                                placeholder="Descripción del Producto" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Marca</label>
                            <div className="relative">
                                <select className="w-full px-3 py-2 border rounded">
                                    <option>Seleccione</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <i className="fas fa-chevron-down text-gray-500"></i>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Categoria</label>
                            <div className="relative">
                                <select className="w-full px-3 py-2 border rounded">
                                    <option>Seleccione</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <i className="fas fa-chevron-down text-gray-500"></i>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Precio de costo</label>
                            <input type="text" className="w-full px-3 py-2 border rounded" value="$ 0" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Precio de Venta</label>
                            <input type="text" className="w-full px-3 py-2 border rounded" value="$ 0" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Existencias</label>
                            <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Cantidades unitarias" />
                        </div>
                        <div className="">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Crear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}