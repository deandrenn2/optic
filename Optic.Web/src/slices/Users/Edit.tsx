import { faFloppyDisk, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PasswordModel } from "./PasswordModel";

export const EditProfile = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
            <div className=" flex justify-center items-center h-screen bg-gray-200">
                <div className="bg-white py-9 rounded-lg p-4 shadow-md mx-4" >
                    <h2 className="text-4xl font-bold mb-4">Editar Usuario</h2>
                    <form className=" grid grid-cols-1 md:grid-cols-3 gap-4 mx-5 p-8">
                        <div>
                            <label htmlFor="Nombre" className="block text-gray-600 text-sm font-bold mb-2">UserName</label>
                            <input type="text" className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div>
                            <label htmlFor="Email" className="block text-gray-600 text-sm font-bold mb-2">Email</label>
                            <input type="email" className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div>
                            <label  className="block text-gray-600 text-sm font-bold mb-2">Account Type</label>
                            <input type="text" className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div className="col-span-1 md:col-span-3 flex justify-start mt-6">
                            <button type="submit" className=" bg-teal-500 text-white px-4 py-3 rounded-md shadow-md flex items-center mr-4 hover:bg-teal-400">
                                <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />Guardar
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsOpen(true)}
                                className="bg-purple-500 text-white px-4 p-2 py-2 rounded-md shadow-md flex items-center mr-4 hover:bg-purple-400">
                                <FontAwesomeIcon icon={faKey} className="mr-2" />Cambiar contraseña
                            </button>

                        </div>

                    </form>
                </div>
                {isOpen && <PasswordModel />}
            </div>
    )
};
