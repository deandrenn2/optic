import { useMutation, useQuery } from '@tanstack/react-query';
import {
   createFormulasService,
   deleteFormulaService,
   getDiagnosis,
   getFormula,
   getFormulas,
   getTags,
   updateFormulaService,
   updateStateFormulaServices,
} from './FormulasServices';
import { toast } from 'react-toastify';

const KEY = 'Formula';
export const useTags = () => {
   const queryTags = useQuery({
      queryKey: [`${KEY}_Tags`],
      queryFn: getTags,
   });

   return {
      queryTags,
      tags: queryTags.data?.data,
   };
};

export const useDiagnosis = () => {
   const queryDiagnosis = useQuery({
      queryKey: [`${KEY}_Diagnosis`],
      queryFn: getDiagnosis,
   });

   return {
      queryDiagnosis,
      diagnosis: queryDiagnosis.data?.data,
   };
};

export const useFormulas = () => {
   const queryFormulas = useQuery({
      queryKey: [`${KEY}_Formulas`],
      queryFn: getFormulas,
   });

   const createFormula = useMutation({
      mutationFn: createFormulasService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.error?.message);
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

   return {
      queryFormulas,
      formulas: queryFormulas.data?.data,
      createFormula,
      deleteFormula,
   };
};

export const useFormula = (id: string | undefined) => {
   const queryFormula = useQuery({
      queryKey: [`${KEY}_Formula`, id],
      queryFn: () => getFormula(id != undefined ? parseInt(id) : 0),
      enabled: id !== undefined,
   });

   return {
      queryFormula,
      formula: queryFormula.data?.data,
   };
};

/* Mutations*/

export const useFormulaMutation = () => {
   const updateFormula = useMutation({
      mutationFn: updateFormulaService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.error?.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
            }
         }
      },
   });

   const updateStateFormula = useMutation({
      mutationFn: updateStateFormulaServices,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.error?.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
            }
         }
      },
   });

   return {
      updateFormula,
      updateStateFormula,
   };
};
