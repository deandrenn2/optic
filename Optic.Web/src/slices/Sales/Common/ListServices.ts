import { sleep } from '../../../shared/components/Utils';

export const listPymentTypes = async (): Promise<string[]> => {
   const paymentTypes = ['Contado', 'Crédito'];
   await sleep(1);
   return paymentTypes;
};
