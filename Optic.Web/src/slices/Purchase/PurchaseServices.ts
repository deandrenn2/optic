import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { CreatePurchaseModel, PurchaseResponseModel, UpdatePurchaseModel, UpdateStatePurchase } from './PurchaseModel';

export const getPurchases = async (): Promise<MsgResponse<PurchaseResponseModel[]>> => {
   const url = 'api/purchases';
   const response = await ApiClient.get<MsgResponse<PurchaseResponseModel[]>>(url);
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener las compras',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const getPurchase = async (id: number): Promise<MsgResponse<PurchaseResponseModel>> => {
   const url = `api/purchases/${id}`;
   const response = await ApiClient.get<MsgResponse<PurchaseResponseModel>>(url);
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener la compra',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const createPurchaseService = async (model: CreatePurchaseModel): Promise<MsgResponse<number>> => {
   const url = 'api/purchases';
   const response = await ApiClient.post<MsgResponse<number>>(url, model);

   if (response.status !== 201 && response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al crear la compra',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const updatePurchaseService = async (model: UpdatePurchaseModel): Promise<MsgResponse<number>> => {
   const url = 'api/purchases';
   const response = await ApiClient.put<MsgResponse<number>>(url, model);

   if (response.status !== 201 && response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al actualizar la compra',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const updateStatePurchaseService = async (model: UpdateStatePurchase): Promise<MsgResponse<number>> => {
   const url = 'api/purchases';
   const response = await ApiClient.put<MsgResponse<number>>(url, model);

   if (response.status !== 201 && response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al actualizar la compra',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};
