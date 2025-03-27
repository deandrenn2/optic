import { useMutation, useQuery } from '@tanstack/react-query';
import { createClientServices, deleteClientServices, getClients, updateClientServices } from './ClientServices';
import { toast } from 'react-toastify';
const KEY = 'CLIENTS';

const useClient = () => {
   const queryClients = useQuery({
      queryKey: [`${KEY}`],
      queryFn: getClients,
   });

   const createClient = useMutation({
      mutationFn: createClientServices,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryClients.refetch();
            }
         }
      },
   });

   const updateClient = useMutation({
      mutationFn: updateClientServices,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryClients.refetch();
            }
         }
      },
   });

   const deleteClient = useMutation({
      mutationFn: deleteClientServices,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryClients.refetch();
            }
         }
      },
   });

   return {
      clients: queryClients?.data?.data,
      queryClients,
      createClient,
      deleteClient,
      updateClient,
   };
};

export default useClient;
