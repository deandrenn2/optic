import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { UsersAvatarModel, UsersModel, UsersResponseModel } from './UsersModel';

export const createUserService = async (model: UsersModel): Promise<MsgResponse<UsersModel>> => {
   const url = 'api/users';
   const response = await ApiClient.post<MsgResponse<UsersModel>>(url, model);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al crear usuario',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }
   return response.data;
};

export const getUsers = async (): Promise<MsgResponse<UsersResponseModel[]>> => {
   const url = 'api/users';
   const response = await ApiClient.get<MsgResponse<UsersResponseModel[]>>(url);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener usuarios',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const setAvatarService = async (avatar: UsersAvatarModel): Promise<MsgResponse<UsersModel>> => {
   const url = `api/users/avatar`;
   const response = await ApiClient.post<MsgResponse<UsersModel>>(url, avatar);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al actualizar avatar',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};
