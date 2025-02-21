import { faEye, faEyeSlash, faKey, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserContext from "../../shared/context/useUserContext";
import useUsers from "./useUsers";
import { useState } from "react";

export const PasswordModel = ({ onClose }: { onClose: () => void }) => {
    const { user } = useUserContext();
    const { updateUsersPassword } = useUsers();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validar contraseña solo cuando se escribe en "password"
    const validatePassword = (password: string) => {
        const minPasswordLength = 14;
        if (password.length < minPasswordLength) {
            setErrorMessage('La contraseña debe tener al menos 14 caracteres');
        } else {
            setErrorMessage('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(`Cambiando ${name}: ${value}`);

        if (name === 'password') {
            validatePassword(value);
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("Contraseña ingresada:", password);
        console.log("Confirmación de contraseña:", confirmPassword);

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            console.log("Error: Las contraseñas no coinciden");
            return;
        }

        if (password.length < 14) {
            setErrorMessage('La contraseña debe tener al menos 14 caracteres');
            console.log("Error: La contraseña es demasiado corta");
            return;
        }

        if (user) {
            console.log("Enviando datos al servidor...");
            await updateUsersPassword.mutateAsync({
                id: user.id ?? 0,
                email: user.email ?? '',
                password: password,
            });
            console.log("Contraseña actualizada correctamente");
            handleClose(); // Cierra el modal y limpia los campos
        }
    };

    const handleClose = () => {
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Cambiar Contraseña</h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 w-full max-w-md grid gap-6 my-5">
                    
                    {/* Nueva contraseña */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="password">
                            Nueva contraseña
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>

                    {/* Confirmar contraseña */}
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirmar contraseña
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>

                    {/* Mensaje de error */}
                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                    )}

                    {/* Botones */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md flex items-center mr-4 hover:bg-blue-400"
                        >
                            <FontAwesomeIcon icon={faKey} className="mr-2" />
                            Cambiar contraseña
                        </button>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                        >
                            <FontAwesomeIcon icon={faTimes} className="mr-2" />
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};




