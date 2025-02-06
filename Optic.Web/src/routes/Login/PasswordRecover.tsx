import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PasswordRecover } from "./LoginServices";

 export const passwordRecover = ()   => {
    const [phrase, setPhrase] = useState('');
    const [isValidated, setIsValidated] = useState(false);
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    

    
    // función para validar la frase
    const validatePhrase = async () => {
        try {
            const response = await PasswordRecover({ email: user.email, securePharse: phrase });
            if (response.isSuccess) {
                setIsValidated(true);
            } else {
                setIsValidated(false);
            }
        } catch (error) {
            console.error('Error al validar frase', error);
        }
    };
    // función para abrir el modal
    const handleOpenModal = () => {
        setModalIsOpen(true);

    };
    // función para cerrar el modal
    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    

     return (
            <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6">Validacion de frase Segura</h2>
                    <form  className="bg-white p-9 w-full max-w-md grid gap-6  my-5">
                    <div>
                        <label htmlFor="Email" className="block text-gray-600 text-sm font-bold mb-1 ">Email</label>
                        <div className="relative p-1">
                            <input
                                type="email"
                                name="email"
                               
                                placeholder="Escriba su email con el que se registró en el sistema"
                                className="w-full px-1 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-600 text-sm font-bold mb-2"
                                htmlFor="new-password">
                                Frase Segura
                            </label>
                            <input
                                type="text" 
                                id="ValidateSecurephrase"
                                placeholder="Escriba la frase Segura con la que se registró en el sistema"
                                className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-cente justify-betweenr ">
                            <button
                                className="bg-blue-500 text-white px-4 p-2 py-2 rounded-md shadow-md flex items-center mr-4 hover:bg-blue-400">
                                <FontAwesomeIcon icon={faKey} className="mr-2" />Verificar
                            </button>
                            <button
                                type="button"                              
                                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    )
};
   
export default passwordRecover;