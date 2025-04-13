import { faMagnifyingGlass, faMars, faPlus, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OffCanvas from '../../shared/components/OffCanvas/Index';
import { MouseEvent, useState } from 'react';
import { Direction } from '../../shared/components/OffCanvas/Models';
import { ClientForm } from './ClientForm';
import useClient from './useClient';
import Swal from 'sweetalert2';
import DeleteButton from '../../shared/components/Buttons/ButtonDelete';
import DetailButton from '../../shared/components/Buttons/ButtonDetail';
import { Bar } from '../../shared/components/Progress/Bar';
import { useListSettings } from '../../shared/components/List/useListSettings';
import { ClientStory } from './ClientStory';
export const Clients = () => {
   const [visible, setVisible] = useState(false);
   const { clients, deleteClient, queryClients } = useClient();
   const { identificationTypes } = useListSettings();
   const [searchClients, setSearchClient] = useState('')

   const handleClose = () => {
      setVisible(false);
   };

   const handleClick = () => {
      setVisible(true);
   };

   const handleDelete = async (e: MouseEvent<HTMLButtonElement>, id: number) => {
      e.preventDefault();
      Swal.fire({
         title: '¿Estás seguro de eliminar este cliente?',
         text: 'Esta acción no se puede deshacer',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         confirmButtonText: 'Confirmar',
         cancelButtonText: 'Cancelar',
         preConfirm: async () => {
            await deleteClient.mutateAsync(id);
         }
      })
   }

   if (queryClients.isLoading)
      return <Bar Title="Cargando..." />;

   const filteredClients = clients?.filter(client =>
      `${client.firstName} ${client.lastName} ${client.identificationNumber}`.toLowerCase().includes(searchClients.toLowerCase())
   );

   return (
      <div className="w-full">
         <div className="flex space-x-4 mb-4">
            <div className="mb-2">
               <button type='button' className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"
                  onClick={handleClick}> <FontAwesomeIcon icon={faPlus} className="fa-search top-3 pr-2 font-bold"
                  />Nuevo</button>
            </div>
            <div className="relative inline-flex mb-2">
               <input
                  type="text"
                  value={searchClients}
                  onChange={(e) => setSearchClient(e.target.value)}
                  placeholder="Buscar Cliente"
                  className="p-2 pl-10 rounded-tg shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
               <FontAwesomeIcon icon={faMagnifyingGlass}
                  className="fa-search absolute left-3 top-3 text-gray-400" />
            </div>
         </div>

         {/* <!-- TABLA DE CLIENTES --> */}
         <div className="rounded-lg border border-grey-500 mb-4 w-full ">
            <table className=" bg-white rounded shadow w-full">
               <thead>
                  <tr>
                     <th className="border p-2 text-left">Nombres</th>
                     <th className="border p-2">Identificación</th>
                     <th className="border p-2">Celular</th>
                     <th className="border p-2">Dirección</th>
                     <th className="border p-2">Email</th>
                     <th className="border p-2"></th>
                  </tr>
               </thead>
               <tbody>
                  {filteredClients?.map((client) => (
                     <tr key={client.id} className='hover:bg-red-50'>
                        <td className=" p-2 border-b border-gray-200">
                           {' '}
                           <FontAwesomeIcon
                              icon={client.sex === 1 ? faMars : faVenus}
                              className={client.sex === 1 ? "text-blue-600 fas fa-mars text-lg mr-2" : "text-pink-600 fas fa-mars text-lg mr-2"}
                           />
                           {client.firstName} {client.lastName}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                           <span title={identificationTypes?.find(x => x.id === client.identificationTypeId)?.name} className='text-blue-700 font-bold'>{identificationTypes?.find(x => x.id === client.identificationTypeId)?.abbreviation}</span> -
                           {client.identificationNumber}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">{client.cellPhoneNumber}</td>
                        <td className="border border-gray-300 p-2 text-center">{client.address}</td>
                        <td className="border border-gray-300 p-2 text-center">{client.email}</td>
                        <td className="border border-gray-300 p-2 text-center">
                           <DetailButton url={`/Clientes/${client.id}`} className='text-blue-500 text-2xl hover:text-blue-700 mr-2' {...<ClientStory />} />

                           <DeleteButton id={client.id} onDelete={handleDelete} />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <OffCanvas titlePrincipal='Registro de Cliente' visible={visible} xClose={handleClose} position={Direction.Right}  >
            <ClientForm />
         </OffCanvas>

      </div>
   );
};
