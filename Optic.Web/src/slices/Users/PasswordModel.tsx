import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserContext from "../../shared/context/useUserContext";
import useUsers from "./useUsers";
import { useState } from "react";


export const PasswordModel = ({onClose}: { onClose: () => void }) => {
       const { user, setUser } = useUserContext();
       const { updateUsersPassword } = useUsers();
       const [password , setPassword] = useState('');
       const [confirmPassword, setConfirmPassword] = useState(''); 
       const [errorMessage, setErrorMessage] = useState('');
       const  [setIsOpen, setIsOpenProfile] = useState(false);

       const validatePassword = async () => {
        const minPasswordLength = 14;
        if (password) {
            if (password.length < minPasswordLength) {
                setErrorMessage('La contraseña debe tener al menos 14 caracteres');
            } else {
                setErrorMessage('');
            }
        }
    };


       const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value); // Actualiza el password
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value); // Actualiza el confirmPassword
        };
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
         // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    setErrorMessage('Las contraseñas no coinciden');
    return;  // No enviamos la solicitud si no coinciden

    // Si las contraseñas son válidas y coinciden, enviamos la solicitud
  }
        if (user) {
            await updateUsersPassword.mutateAsync({
                id: user.id === undefined ? 0 : user.id,
                email: user.email === undefined ? '' : user.email,
                password: password,
            });
        }
    };
       

    return (
        <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
            <div className="relative cursor-pointer " onClick={() => setIsOpenProfile(true)}>
                <h2 className="text-2xl font-bold mb-6">Cambiar Contraseña</h2>
                <form  onSubmit={handleSubmit} className="bg-white p-9 w-full max-w-md grid gap-6  my-5">
                    <div className="mb-4">
                        <label
                            className="block text-gray-600 text-sm font-bold mb-2"
                            htmlFor="new-password">
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password} // Obtiene el valor del password
                            onChange={(e) => handleChange(e)}
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="confirmPasswordTxt">
                            Confirmar contraseña
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword} // Obtiene el valor del confirmPassword
                            onChange={(e) => handleChange(e)}
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-cente justify-betweenr ">
                        <button
                            className="bg-blue-500 text-white px-4 p-2 py-2 rounded-md shadow-md flex items-center mr-4 hover:bg-blue-400">
                            <FontAwesomeIcon icon={faKey} className="mr-2" />Cambiar contraseña
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
};




