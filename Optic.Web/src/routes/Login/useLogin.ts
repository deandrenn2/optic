import { useMutation, useQuery } from '@tanstack/react-query';
import { createBusinessServices, createUserServices, getUsers, loginUser } from './LoginServices';
import { toast } from 'react-toastify';

const KEY = 'LOGIN';

export const useLogin = () => {
   const queryUsers = useQuery({
      queryKey: [`${KEY}_USER`],
      queryFn: getUsers,
   });

   const logginn = useMutation({
      mutationFn: loginUser,
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
      users: queryUsers?.data?.data,
      queryUsers,
      logginn,
      createUser,
      createBusiness,
   };
};
