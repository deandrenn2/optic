import { useMutation, useQuery } from '@tanstack/react-query';
import { createBrandsService, getBrands, getIdentificationTypes, getSettings,  updateBrandsService,   updateIdentificationTypeService } from './ListServices';
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
   return {
      settings: querySettings?.data?.data,
      identificationTypes: queryIdentificationTypes?.data?.data,
      querySettings,
      queryIdentificationTypes,
      updateIdentificationType,
   };
};

export const useBrands =() => {
   const queryBrands = useQuery({
      queryKey: [`BRANDS`],
      queryFn: getBrands,
      refetchOnWindowFocus: false,
   });


const createBrand = useMutation({
      mutationFn: createBrandsService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryBrands.refetch();
            }
         }
      },
   });

      const updateBrand = useMutation({
         mutationFn: updateBrandsService,
         onSuccess: (data) => {
            if (!data.isSuccess) {
               toast.info(data.message);
            } else {
               if (data.isSuccess) {
                  toast.success(data.message);
                  queryBrands.refetch();
               }
            }
         },
      });

      return {
         updateBrand,
         createBrand,
         queryBrands,
      };
   };

  
