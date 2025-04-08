import { useQuery } from '@tanstack/react-query';
import { getDocuments, getDocumentsInvoice, getDocumentsPurchase } from './BillingServices';

export const useBilling = (number?: number, status?: string, type?: string, clientId?: number, supplierId?: number, from?: string, to?: string) => {
   const queryBilling = useQuery({
      queryKey: [`BILLING`, number, status, type, clientId, supplierId, from, to],
      queryFn: () => getDocuments(number, status, type, clientId, supplierId, from, to),
      refetchOnWindowFocus: false,
   });

   return {
      queryBilling,
      billing: queryBilling?.data?.data,
   };
};

export const useBillingInvoice = (
   pageIndex: number,
   pageSize: number,
   number?: number,
   status?: string,
   type?: string,
   clientId?: number,
   from?: string,
   to?: string,
) => {
   const queryBilling = useQuery({
      queryKey: [`BILLING_INVOICE`, pageIndex, pageSize, number, status, type, clientId, from, to],
      queryFn: () => getDocumentsInvoice(pageIndex, pageSize, number, status, type, clientId, from, to),
      refetchOnWindowFocus: false,
   });

   return {
      queryBilling,
      billing: queryBilling?.data?.data,
      count: queryBilling?.data?.count,
      pager: queryBilling?.data,
   };
};

export const useBillingPurchase = (
   pageIndex: number,
   pageSize: number,
   number?: number,
   status?: string,
   type?: string,
   clientId?: number,
   from?: string,
   to?: string,
) => {
   const queryBilling = useQuery({
      queryKey: [`BILLING_PURCHASE`, pageIndex, pageSize, number, status, type, clientId, from, to],
      queryFn: () => getDocumentsPurchase(pageIndex, pageSize, number, status, type, clientId, from, to),
      refetchOnWindowFocus: false,
   });

   return {
      queryBilling,
      billing: queryBilling?.data?.data,
      count: queryBilling?.data?.count,
      pager: queryBilling?.data,
   };
};
