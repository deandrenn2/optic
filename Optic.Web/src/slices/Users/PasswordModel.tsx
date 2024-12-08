import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PasswordModel = ({ }) => {

    return (
        <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-9 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Cambiar mi contraseña</h2>
                <form className="bg-white p-9 w-full max-w-md grid gap-6  my-5">
                    <div className="mb-4">
                        <label
                            className="block text-gray-600 text-sm font-bold mb-2"
                            htmlFor="new-password">
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className=" justify-betweenr ">
                        <button
                            className="bg-blue-500 text-white px-4 p-2 py-2 rounded-md shadow-md flex items-center mr-4 hover:bg-blue-400">
                            <FontAwesomeIcon icon={faKey} className="mr-2" />Cambiar contraseña
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};




