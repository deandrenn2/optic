import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { BusinessResponseModel } from './BusinessModel';
export const getBusiness = async (): Promise<MsgResponse<BusinessResponseModel>> => {
   const url = `api/businesses/`;
   const response = await ApiClient.get<MsgResponse<BusinessResponseModel>>(url);
   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al obtener la organización',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const updateBusinessService = async (model: BusinessResponseModel): Promise<MsgResponse<BusinessResponseModel>> => {
   const url = 'api/Businesses';
   const response = await ApiClient.put<MsgResponse<BusinessResponseModel>>(url, model);
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al actualizar la organización',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }
   return response.data;
};

export const updatedBusinessLogo = async (id: number, file: File): Promise<MsgResponse<string >> => {
   const url = `api/businesses/${id}`;
   try {
      const formData = new FormData();
      formData.append("file", file); 
      const response = await ApiClient.post<MsgResponse<string>>(url, formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });

      if (response.status !== 200) {
         return {
            isSuccess: false,
            message: 'Error Actualizar la imagen',
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
         message: 'Error en la solicitud',
         isFailure: true,
         error: {
            code: error.response?.status.toString() || "500",
            message: error.message,
         },
      };
   }
};
