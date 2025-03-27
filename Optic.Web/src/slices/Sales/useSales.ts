import { useMutation, useQuery } from '@tanstack/react-query';
import { createSaleService, getSales } from './SalesServices';
import { toast } from 'react-toastify';

const KEY = 'Sales';

export const useSales = () => {
   const querySales = useQuery({
      queryKey: [`${KEY}`],
      queryFn: getSales,
   });

   const createSale = useMutation({
      mutationFn: createSaleService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               querySales.refetch();
            }
         }
      },
   });

   return {
      querySales,
      sales: querySales.data?.data,
      createSale,
   };
};
