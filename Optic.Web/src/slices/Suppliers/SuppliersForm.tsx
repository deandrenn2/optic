import { useState } from "react";
export const SuppliersForm = () => {
    const [isOpen] = useState(true);
    return (
      

        <div className={`fixed inset-y-3 right-0 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 bg-gray-500 text-black-500`}>
        <div className="flex justify-center h-screen bg-gray-50 border-2 border-grey-200 ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl text-black-600">OPTICA</h2>
                    <i id="cerrarVentana" className="fas fa-times cursor-pointer text-red-500"></i>
                </div>
                <form id="formProveedor">
                    <div className ="mb-4">
                        <label  className="block text-gray-700" htmlFor="proveedor">Nombres</label>
                        <input type="text" placeholder="Nombres" id="proveedor" required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">NIT</label>
                        <input type="text" placeholder="NIT" id="nit" required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Celular</label>
                        <input type="text" placeholder="Celular" id="celular" required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Teléfono</label>
                        <input type="text" placeholder="Teléfono" id="telefono" required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Dirección</label>
                        <input type="text" placeholder="Dirección" id="direccion" required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" placeholder="Email" id="email" required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <button type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded">Guardar
                            Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    )}