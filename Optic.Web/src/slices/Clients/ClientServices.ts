import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { ClientsResponseModel, ClientStoryResponseModel, CreateClientModel } from './ClientModel';

export const getClients = async (): Promise<MsgResponse<ClientsResponseModel[]>> => {
   const url = `api/clients`;
   const response = await ApiClient.get<MsgResponse<ClientsResponseModel[]>>(url);
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

export const updateClientServices = async (model: CreateClientModel): Promise<MsgResponse<CreateClientModel>> => {
   const url = 'api/clients';
   const response = await ApiClient.put<MsgResponse<CreateClientModel>>(url, model);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al actualizar el cliente',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const deleteClientServices = async (id: number): Promise<MsgResponse<CreateClientModel>> => {
   const url = `api/clients/${id}`;
   const response = await ApiClient.delete<MsgResponse<CreateClientModel>>(url);

   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al eliminar el cliente',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const getClientStories = async (id:number): Promise<MsgResponse<ClientStoryResponseModel[]>> => {
   const url = `api/clients/${id}/formulas`;
   const response = await ApiClient.get<MsgResponse<ClientStoryResponseModel[]>>(url);

   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: "Error al obtener las historias de los clientes",
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }
   return response.data;
};
