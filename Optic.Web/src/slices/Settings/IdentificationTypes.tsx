import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useListSettings } from "../../shared/components/List/useListSettings";
import useClient from "../Clients/useClient";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
export const IdentificationTypes = () => {
    const { clients: Clients } = useClient();

    const { identificationTypes } = useListSettings();

    return (
        <div>
            <div className="flex space-x-4 mb-4">
                <div className="mb-2">
                    <button type='button' className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"
                    > <FontAwesomeIcon icon={faPlus} className="fa-search top-3 pr-2 font-bold"
                        />Nuevo</button>
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


            <div className="rounded-lg border border-grey-500 mb-4 w-full ">
                <table className=" bg-white rounded shadow w-full">
                    <thead>
                        <tr>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Tipo de Identificacion</th>
                            <th className="border p-2">Idetificacion</th>
                            <th className="border p-2">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Clients?.map((client) => (
                            <tr key={client.id}>
                                <td className="border border-gray-300 p-2 text-center">{client.firstName + ' ' + client.lastName}</td>
                                <td className="border border-gray-300 p-2 text-center">{identificationTypes?.find(x => x.id === client.identificationTypeId)?.name}</td>
                                <td className="border border-gray-300 p-2 text-center"><span title={identificationTypes?.find(x => x.id === client.identificationTypeId)?.name} className='text-blue-700 font-bold'>{identificationTypes?.find(x => x.id === client.identificationTypeId)?.abbreviation}</span> -
                                    {client.identificationNumber}</td>
                                <td className="border border-gray-300 p-2 text-center">

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}