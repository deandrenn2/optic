import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { CreateSaleModel,  SalesPaymerModel, SalesResponseModel, UpdateSaleModel, UpdateStateSale } from './SalesModel';

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



 
export const SalesCreatePaymer = async (
   id: number,
   model: { amount: number; date: string }
): Promise<MsgResponse<number>> => {
   const url = `/api/sales/${id}/payments`;

   try {
      const response = await ApiClient.post<MsgResponse<number>>(url, model);

      if (response.status !== 201 && response.status !== 200) {
         return {
            isSuccess: false,
            message: "Error al crear el abono",
            isFailure: true,
            error: {
               code: response.status.toString(),
               message: response.statusText,
            },
         };
      }

      return response.data;
   } catch (error: any) {
      return {
         isSuccess: false,
         message: "Error en la solicitud al servidor",
         isFailure: true,
         error: {
            code: error.response?.status?.toString() || "500",
            message: error.response?.statusText || "Error desconocido",
         },
      };
   }
};


 export const getSalePaymentsService = async (Id: number): Promise<MsgResponse<SalesPaymerModel[]>> => {
   const url = `api/sales/${Id}/payments`;

   try {
       const response = await ApiClient.get<MsgResponse<SalesPaymerModel[]>>(url);

       if (response.status === 200 && response.data?.isSuccess) {
           return response.data;
       } else {
           return {
               isSuccess: true, // lo tratamos como éxito
               data: [],        // simplemente no hay pagos
               message: "Sin pagos registrados",
               isFailure: false
           };
       }
   } catch (error) {
       console.error("Error al obtener los pagos:", error);
       return {
           isSuccess: false,
           isFailure: true,
           message: "Error inesperado al obtener pagos",
           error: {
               code: "Payments.FetchError",
               message: error instanceof Error ? error.message : "Unknown error",
           }
       };
   }
};




