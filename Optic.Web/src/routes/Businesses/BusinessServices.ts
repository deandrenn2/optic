import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { BusinessResponseModel } from './BusinessModel';
;

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