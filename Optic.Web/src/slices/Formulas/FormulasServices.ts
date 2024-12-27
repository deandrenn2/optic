import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { DiagnosisModel, TagModel } from '../Formulas/FomulasModel';

export const getTags = async (): Promise<MsgResponse<TagModel[]>> => {
   const url = 'api/tags';
   const response = await ApiClient.get<MsgResponse<TagModel[]>>(url);

   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al obtener tags',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const getDiagnosis = async (): Promise<MsgResponse<DiagnosisModel[]>> => {
   const url = 'api/diagnosis';
   const response = await ApiClient.get<MsgResponse<DiagnosisModel[]>>(url);

   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al obtener tags',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};
