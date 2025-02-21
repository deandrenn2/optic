import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PasswordRecover } from "./LoginServices";
import { PasswordModel } from "../../slices/Users/PasswordModel";
import useUserContext from "../../shared/context/useUserContext";

export const PasswordRecoverComponent = () => {
  const { user, setUser } = useUserContext();
  const [phrase, setPhrase] = useState('');
  const [error, setError] = useState('');
  const [showPasswordModel, setShowPasswordModel] = useState(false);

  
  const validateUserAndPhrase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Se verifica que exista el usuario y su email en el contexto
      if (!user || !user.email) {
        setError("Usuario no encontrado. Por favor, Verifique que sea el correcto.");
        return;
      }

      // Se envían los datos al servicio de validación
      const response = await PasswordRecover({ email: user.email, securePharse: phrase });
      if (response.isSuccess) {
        // Si la validación es exitosa, se redirige al modal para actualizar la contraseña.
        setShowPasswordModel(true);
    } else {
        setError("El usuario o la frase segura son incorrectos.");
      }
    } catch (err) {
      console.error("Error al validar el usuario y la frase segura:", err);
      setError("Error en la validación. Intente nuevamente.");
    }
  };

  // Si showPasswordModel es true, se renderiza el modal PasswordModel
  if (showPasswordModel) {
    // Se puede pasar el email (u otros datos) como prop si el modal lo requiere
    return <PasswordModel email={user.email} />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Validación de Frase Segura</h2>
        <form
          className="bg-white p-9 w-full max-w-md grid gap-6 my-5"
          onSubmit={validateUserAndPhrase}
        >
          <div>
            <label htmlFor="email" className="block text-gray-600 text-sm font-bold mb-1">
              Email
            </label>
            <div className="relative p-1">
              <input
                type="email"
                name="email"
                id="email"
                value={user ? user.email : ''}
                disabled
                placeholder="Escriba su email con el que se registró en el sistema"
                className="w-full px-1 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="securePhrase" className="block text-gray-600 text-sm font-bold mb-2">
              Frase Segura
            </label>
            <input
              type="text"
              id="securePhrase"
              name="securePhrase"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              placeholder="Escriba la frase segura con la que se registró en el sistema"
              className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md flex items-center mr-4 hover:bg-blue-400"
            >
              <FontAwesomeIcon icon={faKey} className="mr-2" />
              Verificar
            </button>
            <button
              type="button"
              onClick={() => {
                // Aquí puedes definir la acción para cancelar, por ejemplo limpiar los inputs o cerrar el modal.
                setPhrase('');
                setError('');
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecoverComponent;