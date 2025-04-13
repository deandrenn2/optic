import { useMutation, useQuery } from '@tanstack/react-query';
import { getBusiness, updateBusinessService } from './BusinessServices';
import { toast } from 'react-toastify';
const KEY = 'BUSINESS';
export const useBusiness = () => {
   const queryBusiness = useQuery({
      queryKey: [`${KEY}`],
      queryFn: getBusiness,
      refetchOnWindowFocus: false,
   });

   const updateBusiness = useMutation({
      mutationFn: updateBusinessService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryBusiness.refetch();
            }
         }
      },
   });

   const getBusinessMutation = useMutation({
      mutationFn: getBusiness,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         }
      },
   });

   return {
      business: queryBusiness?.data?.data,
      queryBusiness,
      updateBusiness,
      getBusinessMutation,
   };
};
