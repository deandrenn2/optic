import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { ClientsResponseModel, CreateClientModel } from './ClientModel';

export const getClients = async (): Promise<MsgResponse<ClientsResponseModel>> => {
   const url = `api/clients`;
   const response = await ApiClient.get<MsgResponse<ClientsResponseModel>>(url);
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

export const createClientServices = async (model: CreateClientModel): Promise<MsgResponse<CreateClientModel>> => {
   const url = 'api/clients';
   const response = await ApiClient.post<MsgResponse<CreateClientModel>>(url, model);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al crear el cliente',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};
