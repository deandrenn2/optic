import { useMutation, useQuery } from '@tanstack/react-query';
import { getIdentificationTypes, getSettings, updateIdentificationTypeService, updateSettingService } from './ListServices';
import { toast } from 'react-toastify';
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

   const updateIdentificationType = useMutation({
      mutationFn: updateIdentificationTypeService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryIdentificationTypes.refetch();
            }
         }
      },
   });

   const updateSettings = useMutation({
      mutationFn: updateSettingService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            if (data.message) toast.info(data.message);
            if (data.error) toast.info(data.error.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               querySettings.refetch();
            }
         }
      },
   });

   return {
      settings: querySettings?.data?.data,
      identificationTypes: queryIdentificationTypes?.data?.data,
      querySettings,
      queryIdentificationTypes,
      updateIdentificationType,
      updateSettings,
   };
};
