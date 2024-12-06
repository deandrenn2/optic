import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createUserService, getUsers } from "./UsersServices";
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

   return {
      queryUsers,
      users: queryUsers?.data?.data,
      createUser,
      updateUsers,
   };
};              
export default useUsers;