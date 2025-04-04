import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createPurchaseService, getPurchase, getPurchases, updatePurchaseService, updateStatePurchaseService } from './PurchaseServices';

const KEY = 'Purchases';

export const usePurchases = () => {
   const queryPurchases = useQuery({
      queryKey: [KEY],
      queryFn: getPurchases,
   });

   return {
      queryPurchases,
      purchases: queryPurchases.data?.data,
   };
};

export const usePurchaseMutation = () => {
   const queryClient = useQueryClient();
   const createPurchase = useMutation({
      mutationFn: createPurchaseService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            if (data?.message) {
               toast.info(data.message);
            }
            if (data?.error) {
               toast.info(data.error.message);
            }
         } else {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: [`${KEY}`] });
         }
      },
   });

   const updatePurchase = useMutation({
      mutationFn: updatePurchaseService,
      onSuccess: (data) => {
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

   const updateStatePurchase = useMutation({
      mutationFn: updateStatePurchaseService,
      onSuccess: (data) => {
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
            }
         }
      },
   });

   return {
      createPurchase,
      updatePurchase,
      updateStatePurchase,
   };
};

export const usePurchase = (id: string | undefined) => {
   const queryPurchase = useQuery({
      queryKey: [`${KEY}`, id],
      queryFn: () => getPurchase(id != undefined ? parseInt(id) : 0),
      enabled: id !== undefined,
   });

   return {
      queryPurchase,
      purchase: queryPurchase.data?.data,
   };
};
