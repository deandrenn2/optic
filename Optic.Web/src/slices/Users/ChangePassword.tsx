import { faEye, faEyeSlash, faKey, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserContext from "../../shared/context/useUserContext";
import useUsers from "./useUsers";
import { useState } from "react";

const PasswordModel = ({ onClose }: { onClose: () => void }) => {
    const { user } = useUserContext();
    const { updateUsersPassword } = useUsers();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validatePassword = (password: string) => {
        if (password.length < 14) {
            setErrorMessage('⚠️ La contraseña debe tener al menos 14 caracteres.');
        } else {
            setErrorMessage('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'password') {
            validatePassword(value);
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('❌ Las contraseñas no coinciden.');
            return;
        }

        if (password.length < 14) {
            setErrorMessage('⚠️ La contraseña debe tener al menos 14 caracteres.');
            return;
        }

        if (user) {
            await updateUsersPassword.mutateAsync({
                id: user.id ?? 0,
                email: user.email ?? '',
                password: password,
            });

           
            handleClose();
        }
    };

    const handleClose = () => {
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fadeIn">
                <h2 className="text-2xl font-bold text-center text-blue-600"> Cambiar Contraseña</h2>
                <p className="text-center text-gray-500 mb-4">Ingrese y confirme su nueva contraseña</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nueva contraseña */}
                    <div className="relative">
                        <label className="block text-gray-700 font-semibold">Nueva contraseña</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <div className="relative">
                        <button
                            type="button"
                            className="absolute right-3  transform -translate-y-8 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                        </div>
                        
                    </div>

                    {/* Confirmar contraseña */}
                    <div className="relative">
                        <label className="block text-gray-700 font-semibold">Confirmar contraseña</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <div className="relative">
                        <button
                            type="button"
                            className="absolute right-3 transform -translate-y-8 text-gray-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                        </div>
                       
                    </div>

                    {/* Mensaje de error */}
                    {errorMessage && (
                        <p className="text-red-500 text-sm font-medium text-center">{errorMessage}</p>
                    )}

                    {/* Botones */}
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 flex items-center"
                        >
                            <FontAwesomeIcon icon={faKey} className="mr-2" />
                            Cambiar contraseña
                        </button>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center"
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

export default PasswordModel;


