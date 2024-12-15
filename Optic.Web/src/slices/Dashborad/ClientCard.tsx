
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useClient from '../Clients/useClient';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
export const CardClient = () => {
    const { clients } = useClient();
    return (
        <div className="bg-white rounded-lg shadow p-4 ">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                <h2 className="text-gray-500 font-bold">Clientes</h2>
            </div>
            {clients?.map((client) => (
                <div className="space-y-1">
                    <div className="  flex justify-betweenp-4 flex justify-between items-center mr-2 " >
                        <div>
                            <p>
                                {' '}
                                <FontAwesomeIcon
                                    icon={client.sex === 1 ? faMars : faVenus}
                                    className={client.sex === 1 ? "text-blue-600 fas fa-mars text-lg mr-2" : "text-pink-600 fas fa-mars text-lg mr-2"}
                                />
                                {client.firstName + client.lastName}
                                </p>
                             </div>
                            <i className="fas fa-mars text-gray-400"></i>
                        <i className="fas fa-play text-gray-500"></i>
                    </div>
                </div>
            ))}
        </div>
    )
};