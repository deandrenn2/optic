import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createSaleService, getSale, getSalePaymentsService, getSales, SalesCreatePaymer, SalesDeletePaymer, updateSaleService, updateStateSaleService } from './SalesServices';
import { toast } from 'react-toastify';
import { SalesCreatePaymerModel } from './SalesModel';

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




export const usePayments = (invoiceId: number) => {
  const query = useQuery({
    queryKey: [KEY, invoiceId],
    queryFn: () => getSalePaymentsService(invoiceId),
    enabled: !!invoiceId,
  });

  return {
    query,
    payments: query.data?.data ?? [],
  };
};

export const useCreatePayment = (invoiceId: number) => {
  const queryClient = useQueryClient();

  const createPayment = useMutation({
    mutationFn: (model: SalesCreatePaymerModel) =>
      SalesCreatePaymer(invoiceId, model),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message || "Abono registrado");
        queryClient.invalidateQueries({ queryKey: [KEY, invoiceId] });
      } else {
        toast.error(data.message || "No se pudo registrar el abono");
      }
    },
    onError: () => {
      toast.error("Error inesperado al crear el abono");
    },
  });

  return { createPayment };
};

export const useDeletePayment = (invoiceId: number) => {
  const queryClient = useQueryClient();

  const deletePayment = useMutation({
    mutationFn: (paymentId: number) => SalesDeletePaymer(paymentId),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message || "Abono eliminado");
        queryClient.invalidateQueries({ queryKey: [KEY, invoiceId] });
      } else {
        toast.error(data.message || "No se pudo eliminar el abono");
      }
    },
    onError: () => {
      toast.error("Error inesperado al eliminar el abono");
    },
  });

  return { deletePayment };
};
