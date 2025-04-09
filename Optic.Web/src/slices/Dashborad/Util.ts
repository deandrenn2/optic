import { differenceInDays, parseISO } from 'date-fns';

export const getDifferenceDays = (date: string) => {
   const differenceDays = differenceInDays(new Date(), parseISO(date ? date.toString() : new Date().toString()));
   return differenceDays;
};
