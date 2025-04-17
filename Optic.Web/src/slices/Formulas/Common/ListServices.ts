import { sleep } from '../../../shared/components/Utils';

export const getStatusInvoice = async (status?: string): Promise<string[]> => {
   const statusInvoice: string[] = ['Borrador', 'Pagada', 'Devolución', 'Crédito'];
   let result: string[] = [];

   if (status === 'Borrador') {
      result = statusInvoice.filter((item) => item !== 'Borrador');
   }

   if (status === 'Pagada') {
      result = statusInvoice.filter((item) => item === 'Anulada');
   }

   if (status === 'Devolución') {
      result = statusInvoice.filter((item) => item === 'Anulada');
   }

   if (status === 'Anulada') {
      result = statusInvoice.filter((item) => item === 'Devolución');
   }

   if (status === 'Crédito') {
      result = statusInvoice.filter((item) => item === 'Anulada' || item === 'Pagada' || item === 'Devolución');
   }

   await sleep(1);

   return result;
};
