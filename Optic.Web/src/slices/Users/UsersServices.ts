import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { UsersAvatarModel, UsersModel, UsersProfileModel, UsersResponseModel, UsersUpdatePasswordModel } from './UsersModel';

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
export const updateUserService = async (model: UsersProfileModel): Promise<MsgResponse<UsersProfileModel>> => {
   const url = `api/users`;
   const response = await ApiClient.put<MsgResponse<UsersProfileModel>>(url, model);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al actualizar usuario',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const updateUserPasswordService = async (model: UsersUpdatePasswordModel): Promise<MsgResponse<UsersModel>> => {
   const url = `api/users/password`;
   const response = await ApiClient.put<MsgResponse<UsersModel>>(url, model);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al actualizar contraseña',
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
