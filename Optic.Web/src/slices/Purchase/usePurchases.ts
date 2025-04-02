import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createPurchaseService, getPurchases } from './PurchaseServices';

const KEY = 'Purchases';

export const usePurchases = () => {
   const queryPurchases = useQuery({
      queryKey: [KEY],
      queryFn: getPurchases,
   });

   const createPurchase = useMutation({
      mutationFn: createPurchaseService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            toast.success(data.message);
            queryPurchases.refetch();
         }
      },
   });

   return {
      queryPurchases,
      purchases: queryPurchases.data?.data,
      createPurchase,
   };
};