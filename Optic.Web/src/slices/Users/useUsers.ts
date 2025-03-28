import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createUserService, getUsers, passwordRecoverService, setAvatarService, updateUserPasswordService, updateUserService } from './UsersServices';
import useUserContext from '../../shared/context/useUserContext';
const KEY = 'Users';
export const useUsers = () => {
   const queryUsers = useQuery({
      queryKey: [KEY],
      queryFn: getUsers,
   });

   const createUser = useMutation({
      mutationFn: createUserService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryUsers.refetch();
            }
         }
      },
   });

   const updateUsers = useMutation({
      mutationFn: updateUserService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryUsers.refetch();
            }
         }
      },
   });

   const updateUsersProfiles = useMutation({
      mutationFn: updateUserService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryUsers.refetch();
            }
         }
      },
   });

   const updateUsersPassword = useMutation({
      mutationFn: updateUserPasswordService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryUsers.refetch();
            }
         }
      },
   });

   const Passwordrecover = useMutation({
      mutationFn: passwordRecoverService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryUsers.refetch();
            }
         }
      },
   });

   return {
      queryUsers,
      users: queryUsers?.data?.data,
      createUser,
      updateUsers,
      updateUsersProfiles,
      updateUsersPassword,
      Passwordrecover,
   };
};

export const useUserAvatar = () => {
   const { user, setUser } = useUserContext();
   const setAvatar = useMutation({
      mutationFn: setAvatarService,
      onSuccess: (data, request) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               const userAvatar = { ...user, idAvatar: request.idAvatar };
               setUser(userAvatar);
            }
         }
      },
   });

   return {
      setAvatar,
   };
};

export default useUsers;
