import { useMutation, useQuery } from "@tanstack/react-query";
import { createFormulaService, deleteFormulaService, getFormulas, updateFormulaService } from "./FormulasServices";
import { toast } from "react-toastify";

 
 const KEY = 'Formula';
 const useFormula = () => {
   const queryFormulas = useQuery({
      queryKey: [`${KEY}`],
      queryFn: getFormulas,
   });

   const createFormula = useMutation({
      mutationFn: createFormulaService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryFormulas.refetch();
            }
         }
      },
   });

   const deleteFormula = useMutation({
      mutationFn: deleteFormulaService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryFormulas.refetch();
            }
         }
      },
   });

   const updateFormula = useMutation({
      mutationFn: updateFormulaService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryFormulas.refetch();
            }
         }
      },
   });

   return {
      queryFormulas,
      formulas: queryFormulas?.data?.data,
      createFormula,
      deleteFormula,
      updateFormula,
   };
};             

export default useFormula;