import { useQuery } from '@tanstack/react-query';
import { getIdentificationTypes, getSettings } from './ListServices';
const KEY = 'LIST_SETTINGS';

export const useListSettings = () => {
   const querySettings = useQuery({
      queryKey: [KEY],
      queryFn: getSettings,
      staleTime: Infinity,
   });

   const queryIdentificationTypes = useQuery({
      queryKey: [`${KEY}_IDENTIFICATION_TYPES`],
      queryFn: getIdentificationTypes,
      staleTime: Infinity,
   });

   return {
      settings: querySettings?.data?.data,
      identificationTypes: queryIdentificationTypes?.data?.data,
      querySettings,
      queryIdentificationTypes,
      
   };
};

