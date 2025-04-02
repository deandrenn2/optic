import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { CreateSaleModel, SalesResponseModel, UpdateSaleModel, UpdateStateSale } from './SalesModel';

export const getSales = async (): Promise<MsgResponse<SalesResponseModel[]>> => {
   const url = 'api/sales';
   const response = await ApiClient.get<MsgResponse<SalesResponseModel[]>>(url);
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener las facturas',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const getSale = async (id: number): Promise<MsgResponse<SalesResponseModel>> => {
   const url = `api/sales/${id}`;
   const response = await ApiClient.get<MsgResponse<SalesResponseModel>>(url);
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener la factura',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const createSaleService = async (model: CreateSaleModel): Promise<MsgResponse<number>> => {
   const url = 'api/sales';
   const response = await ApiClient.post<MsgResponse<number>>(url, model);

   if (response.status !== 201 && response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al crear la factura',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const updateSaleService = async (model: UpdateSaleModel): Promise<MsgResponse<number>> => {
   const url = 'api/sales';
   const response = await ApiClient.put<MsgResponse<number>>(url, model);

   if (response.status !== 201 && response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al actualizar la factura',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const updateStateSaleService = async (model: UpdateStateSale): Promise<MsgResponse<number>> => {
   const url = 'api/sales';
   const response = await ApiClient.put<MsgResponse<number>>(url, model);

   if (response.status !== 201 && response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al actualizar la factura',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};
