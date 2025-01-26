import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { CreateFormulasModel, DiagnosisModel, TagModel } from '../Formulas/FomulasModel';

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

export const createFormulasService = async (formula: CreateFormulasModel): Promise<MsgResponse<CreateFormulasModel>> => {
   const url = 'api/formulas';
   const response = await ApiClient.post<MsgResponse<CreateFormulasModel>>(url, formula);

   if (response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al crear formula',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const getFormulas = async (): Promise<MsgResponse<CreateFormulasModel[]>> => {
   const url = 'api/formulas';
   const response = await ApiClient.get<MsgResponse<CreateFormulasModel[]>>(url);

   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al obtener formulas',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};
