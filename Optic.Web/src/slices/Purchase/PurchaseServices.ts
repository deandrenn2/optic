import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { CreatePurchaseModel, PaymentsPurchaseCreateModel, paymentsPurchaseModel, PurchaseResponseModel, UpdatePurchaseModel, UpdateStatePurchase } from './PurchaseModel';
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


export const getPaymentsPurchaseService = async (
   id: number
 ): Promise<MsgResponse<paymentsPurchaseModel[]>> => {
   const url = `api/purchases/${id}/payments`;
 
   const response = await ApiClient.get<MsgResponse<{ payments: paymentsPurchaseModel[] }>>(url);
 
   if (response.status === 200 && response.data?.isSuccess) {
     return {
       isSuccess: true,
       isFailure: false,
       message: response.data.message,
       data: response.data.data?.payments ?? [],
     };
   }
 
   return {
     isSuccess: false,
     isFailure: true,
     message: 'Error al obtener los abonos de la compra',
     data: [],
   };
 };
 
 
 

 export const PaymentsPurchaseCreate = async (
   id: number,
   model: PaymentsPurchaseCreateModel
 ): Promise<MsgResponse<number>> => {
   const url = `/api/purchases/${id}/payments`;
   const response = await ApiClient.post<MsgResponse<number>>(url, model);
   const result = response.data;

   if (!result.isSuccess) {
     return {
       isSuccess: false,
       isFailure: true,
       message: result.message || "Error al crear el abono de compra",
       error: {
         code: "VALIDATION",
         message: result.message,
       },
     };
   }
 
   return {
     isSuccess: true,
     isFailure: false,
     message: result.message,
     data: result.data,
   };
 };

 
 
