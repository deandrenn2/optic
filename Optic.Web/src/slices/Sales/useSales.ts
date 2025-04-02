import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createSaleService, getSale, getSales, updateSaleService, updateStateSaleService } from './SalesServices';
import { toast } from 'react-toastify';

const KEY = 'Sales';

export const useSales = () => {
   const querySales = useQuery({
      queryKey: [`${KEY}`],
      queryFn: getSales,
   });

   return {
      querySales,
      sales: querySales.data?.data,
   };
};

export const useSalesMutation = () => {
   const queryClient = useQueryClient();
   const createSale = useMutation({
      mutationFn: createSaleService,
      onSuccess: (data) => {
         console.log(data);
         if (!data.isSuccess) {
            if (data?.message) {
               toast.info(data.message);
            }
            if (data?.error) {
               toast.info(data.error.message);
            }
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryClient.invalidateQueries({ queryKey: [`${KEY}`] });
            }
         }
      },
   });

   const updateSale = useMutation({
      mutationFn: updateSaleService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryClient.invalidateQueries({ queryKey: [`${KEY}`] });
            }
         }
      },
   });

   const updateStateSale = useMutation({
      mutationFn: updateStateSaleService,
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
      createSale,
      updateSale,
      updateStateSale,
   };
};

export const useSale = (id: string | undefined) => {
   const querySale = useQuery({
      queryKey: [`${KEY}`, id],
      queryFn: () => getSale(id != undefined ? parseInt(id) : 0),
      enabled: id !== undefined,
   });

   return {
      querySale,
      sale: querySale.data?.data,
   };
};
