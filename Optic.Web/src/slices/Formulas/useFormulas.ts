import { useQuery } from '@tanstack/react-query';
import { getDiagnosis, getTags } from './FormulasServices';

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
