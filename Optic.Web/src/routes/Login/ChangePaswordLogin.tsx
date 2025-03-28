import { faEye, faEyeSlash, faKey, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useUsers from "../../shared/context/useUsers";

const PasswordResetModal = ({
    isOpen,
    onClose,
    email
}: {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}) => {
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

    if (!isOpen) return null;

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

        if (email) {
            await updateUsersPassword.mutateAsync({ id: 0, email, password });          
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600">Recuperación de Contraseña</h2>
                <p className="text-center text-gray-600">Ingrese y confirme su nueva contraseña</p>

                <form onSubmit={handleSubmit} className="mt-4">
                    {/* Email (prellenado) */}
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Nueva contraseña */}
                    <div className="mb-4 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Nueva contraseña"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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
                    <div className="mb-4 relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirmar contraseña"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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
                    {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

                    {/* Botones */}
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            <FontAwesomeIcon icon={faKey} className="mr-2" />
                            Cambiar Contraseña
                        </button>
                        <button type="button" onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                            <FontAwesomeIcon icon={faTimes} className="mr-2" />
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetModal;
