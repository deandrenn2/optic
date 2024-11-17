import { useMutation, useQuery } from '@tanstack/react-query';
import { createClientServices, getClients } from './ClientServices';
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
            }
         }
      },
   });

   return {
      clients: queryClients?.data?.data,
      queryClients,
      createClient,
   };
};

export default useClient;
