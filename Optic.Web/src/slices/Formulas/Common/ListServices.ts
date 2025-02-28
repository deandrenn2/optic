import { sleep } from '../../../shared/components/Utils';

export const getStatusInvoice = async (status?: string): Promise<string[]> => {
   const statusInvoice: string[] = ['Borrador', 'Anulada', 'Pagada', 'Devolución', 'Crédito'];
   let result: string[] = [];

   if (status === 'Borrador') {
      result = statusInvoice.filter((item) => item !== 'Borrador');
   }

   await sleep(1);

   return result;
};
