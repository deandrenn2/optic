import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { CreateFormulasModel, DiagnosisModel, FormulaListModel, FormulaModel, TagModel } from '../Formulas/FomulasModel';

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

export const createFormulasService = async (formula: CreateFormulasModel): Promise<MsgResponse<number>> => {
   const url = 'api/formulas';
   const response = await ApiClient.post<MsgResponse<number>>(url, formula);

   if (response.status !== 201 && response.status !== 200) {
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

export const getFormulas = async (): Promise<MsgResponse<FormulaListModel[]>> => {
   const url = 'api/formulas';
   const response = await ApiClient.get<MsgResponse<FormulaListModel[]>>(url);

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

export const getFormula = async (id: number): Promise<MsgResponse<FormulaModel>> => {
   const url = `api/formulas/${id}`;
   const response = await ApiClient.get<MsgResponse<FormulaModel>>(url);

   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al obtener formula',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const deleteFormulaService = async (id: number): Promise<MsgResponse<number>> => {
   const url = `api/formulas/${id}`;
   const response = await ApiClient.delete<MsgResponse<number>>(url);

   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al eliminar formula',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};
