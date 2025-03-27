import { useMutation, useQuery } from '@tanstack/react-query';
import { createClientServices, deleteClientServices, getClients, getPagerClients, updateClientServices } from './ClientServices';
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

export const useClientPager = (page: number = 1, pageSize: number = 5) => {
   const queryClients = useQuery({
      queryKey: [`${KEY}_pager`, page, pageSize],
      queryFn: () => getPagerClients(page, pageSize),
      refetchOnWindowFocus: false,
   });

   return {
      queryClients,
      clients: queryClients?.data?.data,
   };
};

export default useClient;
