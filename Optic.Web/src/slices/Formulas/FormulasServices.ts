import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { FormulaModel, } from '../Formulas/FomulasModel';

 export const createFormulaService = async (model: FormulaModel): Promise<MsgResponse<any>> => {
   const url = 'api/formulas';
   const response = await ApiClient.post<MsgResponse<any>>(url, model);

   if (response.status !== 200 && response.status !== 201) {
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

export const updateFormulaService = async (model: FormulaModel): Promise<MsgResponse<any>> => {
   const url = 'api/formulas';
   const response = await ApiClient.put<MsgResponse<any>>(url, model);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al actualizar formula',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const deleteFormulaService = async (id: number): Promise<MsgResponse<any>> => {
   const url = `api/formulas/${id}`;
   const response = await ApiClient.delete<MsgResponse<any>>(url);

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

export const getFormulas = async (): Promise<MsgResponse<any>> => {
   const url = 'api/formulas';
   const response = await ApiClient.get<MsgResponse<any>>(url);

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

