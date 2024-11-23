import { faMagnifyingGlass, faPlay, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Settings = () => {
    return (
        <div className="w-full p-4">
            <div className="flex space-x-4 mb-4">
                <div className="mb-2">
                    <button type='button' className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="fa-search top-3 pr-2 font-bold" />Nuevo</button>
                </div>
                <div className="mb-2">
                    <div className="relative">
                        <div className="inline-flex">
                            <input
                                type="text"
                                placeholder="Buscar usuario"
                                className="p-2 pl-10 border-blue-400 rounded" />
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="fa-search absolute left-3 top-3 text-gray-400" />
                            <button className="text-white font-bold border hover:bg-blue-700 bg-blue-500 px-4 py-2 rounded ">Buscar</button>
                        </div>
                    </div>
                </div>
            </div>

                  {/* <!-- TABLA DE CREAR USUARIO --> */}
            <div className="rounded-lg border border-grey-500 mb-4 w-full ">
                <table className=" bg-white rounded shadow w-full">
                    <thead>
                        <tr>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2 text-center">DEIMER ANDRES NUÑEZ NOVOA</td>
                            <td className="border border-gray-300 p-2 text-center">adenes@gmail.com</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay} /></button>
                                <button className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2 text-center">ARLEY RODRIGUEZ</td>
                            <td className="border border-gray-300 p-2 text-center">arley@gmail.com</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button className="text-blue-500 mr-3"> <FontAwesomeIcon icon={faPlay} /></button>
                                <button className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};