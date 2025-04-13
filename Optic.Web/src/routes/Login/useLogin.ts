import { useMutation, useQuery } from '@tanstack/react-query';
import { createBusinessServices, createUserServices, getFirstBusiness, getFirstData, getFirstUser, getUser, loginUser } from './LoginServices';
import { toast } from 'react-toastify';

const KEY = 'LOGIN';

export const useLogin = () => {
   const logginn = useMutation({
      mutationFn: loginUser,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            if (data?.message) {
               toast.error(data.message, {
                  position: 'bottom-center',
               });
            }
            if (data?.error) {
               toast.error(data.error.message, {
                  position: 'bottom-center',
               });
            }
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
            }
         }
      },
   });

   const getUserMutation = useMutation({
      mutationFn: getUser,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         }
      },
   });

   const createUser = useMutation({
      mutationFn: createUserServices,
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

   const createBusiness = useMutation({
      mutationFn: createBusinessServices,
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
      logginn,
      createUser,
      createBusiness,
      getUserMutation,
   };
};

export const useFirstData = () => {
   const queryFirstData = useQuery({
      queryKey: [`${KEY}_FIRST_DATA`],
      queryFn: getFirstData,
      refetchOnWindowFocus: false,
   });

   const queryFirstUser = useQuery({
      queryKey: [`${KEY}_FIRST_USER`],
      queryFn: getFirstUser,
      refetchOnWindowFocus: false,
   });

   const queryFirstBusiness = useQuery({
      queryKey: [`${KEY}_FIRST_BUSINESS`],
      queryFn: getFirstBusiness,
      refetchOnWindowFocus: false,
   });

   return {
      hasFirstData: queryFirstData?.data?.data,
      queryFirstData,
      hasFirstUser: queryFirstUser?.data?.data,
      queryFirstUser,
      hasFirstBusiness: queryFirstBusiness?.data?.data,
      queryFirstBusiness,
   };
};
