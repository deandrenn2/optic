import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useClientPager } from '../Clients/useClient';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { formatDistance, parseISO } from 'date-fns';
import { Link, useLocation } from 'react-router-dom';
export const CardClient = () => {
    const { clients } = useClientPager();
    const location = useLocation();
    return (
        <div className="bg-white rounded-lg shadow p-4 ">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                <h2 className="text-gray-500 font-bold">Clientes</h2>
            </div>
            {clients?.map((client) => (
                <div className="space-y-1 ">
                    <Link to={`/Clientes/${client.id}`}
                        state={{ fromHome: location.pathname === "/" }}>
                        <div className="  flex justify-betweenp-4 items-center mr-2">
                            <div className='w-full rounded-lg border border-gray-400 p-4 mb-2 hover:border-blue-700 transition-colors duration-300 '>
                                <div className="relative">
                                    <p>{client.fullName}</p>
                                    <span title={client.identificationType} className='text-blue-700 font-bold'>{client.identificationAbbreviation}</span> -
                                    {" "}{client.identificationNumber}
                                    <div className='absolute inset-y-5 right-1'>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={client.sex === 1 ? faMars : faVenus}
                                            className={client.sex === 1 ? "text-blue-600 fas fa-mars  text-3xl" : "text-pink-600 fas fa-mars text-3xl"}
                                        />
                                    </div>
                                    <p className=" text-gray-500 text-sm">Hace, {formatDistance(new Date(), parseISO(client.updateDate ? client.updateDate.toString() : new Date().toString()))}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};
