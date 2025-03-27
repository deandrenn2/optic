import { useMutation, useQuery } from "@tanstack/react-query";
import { updatePassword } from "../../routes/Login/LoginServices";
import { toast } from "react-toastify";
const KEY = 'Users';


const useUsers = () => {
    
    const queryUsers = useQuery({
        queryKey: [KEY],
        
    });

    const updateUsersPassword = useMutation({
        mutationFn: updatePassword,
        onSuccess: (data) => {
            if (!data.isSuccess) {
                alert(data.message);
                alert(data.error);
            } else {
                if (data.isSuccess) {
                    toast.success(data.message);
                    queryUsers.refetch();
                }
            }
        },
    });     

    return { updateUsersPassword };
};

export default useUsers;

