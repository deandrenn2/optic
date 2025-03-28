import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { PasswordRecover } from "./LoginServices";
import PasswordResetModal from "./ChangePaswordLogin";
import Swal from 'sweetalert2'

const PasswordRecoverForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [phrase, setPhrase] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const validatePhrase = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        
            const response = await PasswordRecover({ email, securePharse: phrase });

            if (response.isSuccess) {
                setTimeout(() => setIsModalOpen(true), 400);
            } else {
                Swal.fire('La frase segura no es correcta', 'Por favor, revise su frase segura y vuelva a intentarlo.')
            }
       

        setLoading(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEmail("");
        setPhrase("");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Recuperación de Contraseña</h2>
                <form className="space-y-6" onSubmit={validatePhrase}>
                    {/* Email */}
                    <div className="relative">
                        <label className="block text-gray-600 text-sm font-bold mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingrese su correo"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Frase Segura */}
                    <div className="relative">
                        <label className="block text-gray-600 text-sm font-bold mb-1">Frase Segura</label>
                        <input
                            type="text"
                            value={phrase}
                            onChange={(e) => setPhrase(e.target.value)}
                            placeholder="Ingrese su frase segura"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Mensajes */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                    {/* Buttons */}
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-400"
                            disabled={loading}
                        >
                            {loading ? "Verificando..." : <>
                                <FontAwesomeIcon icon={faKey} className="mr-2" />
                                Recuperar Contraseña
                            </>}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Volver al Inicio
                        </button>
                    </div>
                </form>
            </div>

            {/* MODAL PARA CAMBIAR CONTRASEÑA */}
            {isModalOpen && <PasswordResetModal isOpen={isModalOpen} onClose={closeModal} email={email} />}
        </div>
    );
};

export default PasswordRecoverForm;


