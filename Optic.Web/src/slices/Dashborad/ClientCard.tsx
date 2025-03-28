import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useClientPager } from '../Clients/useClient';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import DetailButton from '../../shared/components/Buttons/ButtonDetail';
import { formatDistance, parseISO } from 'date-fns';
export const CardClient = () => {
    const { clients } = useClientPager();
    return (
        <div className="bg-white rounded-lg shadow p-4 ">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                <h2 className="text-gray-500 font-bold">Clientes</h2>
            </div>
            {clients?.map((client) => (
                <div className="space-y-1">
                    <div className="  flex justify-betweenp-4 items-center mr-2">
                        <div className='w-full rounded-lg border border-gray-400 p-4 mb-2'>
                            <div className="relative">
                                <p>
                                    {client.fullName}
                                </p>
                                <div className='justify-end'>
                                    <DetailButton url={`/Clientes/${client.id}`} className='text-blue-500 text-3xl hover:text-blue-700  absolute inset-y-2 right-0' />
                                </div>
                                <span title={client.identificationType} className='text-blue-700 font-bold'>{client.identificationAbbreviation}</span> -
                                {" "}{client.identificationNumber}
                                <div className='absolute inset-y-5 right-10'>
                                    {' '}
                                    <FontAwesomeIcon
                                        icon={client.sex === 1 ? faMars : faVenus}
                                        className={client.sex === 1 ? "text-blue-600 fas fa-mars  text-3xl" : "text-pink-600 fas fa-mars text-3xl"}
                                    />
                                </div>
                                <p className=" text-gray-500 text-sm">Hace, {formatDistance(new Date(), parseISO(client.updateDate ? client.updateDate.toString() : new Date().toString()))}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};
