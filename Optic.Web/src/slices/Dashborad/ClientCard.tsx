
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useClient from '../Clients/useClient';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import ButtonNavigation from '../../shared/components/Buttons/ButtonNavigation';
import { useListSettings } from '../../shared/components/List/useListSettings';
import DetailButton from '../../shared/components/Buttons/ButtonDetail';
export const CardClient = () => {
    const { clients } = useClient();
    const { identificationTypes } = useListSettings();
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
                            <p>
                                {' '}
                                <FontAwesomeIcon
                                    icon={client.sex === 1 ? faMars : faVenus}
                                    className={client.sex === 1 ? "text-blue-600 fas fa-mars text-lg mr-2" : "text-pink-600 fas fa-mars text-lg mr-2"}
                                />
                                {client.firstName + client.lastName}
                               
                            </p>
                            <span title={identificationTypes?.find(x => x.id === client.identificationTypeId)?.name} className='text-blue-700 font-bold'>{identificationTypes?.find(x => x.id === client.identificationTypeId)?.abbreviation}</span> -
                           {client.identificationNumber}
                        </div>
                        <DetailButton url={`/Clientes/${client.id}`} className='text-blue-500 text-2xl hover:text-blue-700 mr-2' />
                    </div>

                </div>
            ))}
            <div className="flex justify-center mt-20">
                <ButtonNavigation />
            </div>
        </div>
    )
};