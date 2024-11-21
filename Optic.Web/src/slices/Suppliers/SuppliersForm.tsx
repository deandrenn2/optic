import { useState } from "react";
export const SuppliersForm = () => {
    const [isOpen] = useState(true);
    return (
        <div className={`fixed inset-y-0 right-0 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 bg-gray-500 text-black-500`}>
            <div className="flex justify-center h-screen bg-gray-50 border-2 border-grey-200 ">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <form className="flex flex-col">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nombre
                            </label>
                            <input
                                required
                                type="text"
                                name="firstName"
                                placeholder="Nombre"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nit
                            </label>
                            <input
                                required
                                type="text"
                                name="firstName"
                                placeholder="Nombre"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nit
                            </label>
                            <input
                                required
                                type="text"
                                name="firstName"
                                placeholder="Nombre"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Celular
                            </label>
                            <input
                                type="text"
                                required
                                name="cellPhoneNumber"
                                placeholder="Celular"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Dirección
                            </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Dirección"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">Crear</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    )
}