import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { passwordRecoverModel } from '../../slices/Users/UsersModel';
import { CreateBusinessModel, CreateUserModel, LoginModel, TokenModel, UserResponseModel } from './LoginModel';

export const loginUser = async (model: LoginModel): Promise<MsgResponse<TokenModel>> => {
   const url = 'api/login';
   const response = await ApiClient.post<MsgResponse<TokenModel>>(url, model);
   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al ingresar',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

//#region  Usuarios
export const getUsers = async (): Promise<MsgResponse<UserResponseModel[]>> => {
   const url = 'api/users';
   const response = await ApiClient.get<MsgResponse<UserResponseModel[]>>(url);
   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al obtener los usuarios',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const getUser = async (id: number | undefined): Promise<MsgResponse<UserResponseModel>> => {
   const url = `api/users/${id}`;
   const response = await ApiClient.get<MsgResponse<UserResponseModel>>(url);
   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al obtener el usuario',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

//#endregion

export const createUserServices = async (model: CreateUserModel): Promise<MsgResponse<CreateUserModel>> => {
   const url = 'api/users';
   const response = await ApiClient.post<MsgResponse<CreateUserModel>>(url, model);
   if (response.status !== 200) {
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

export const createBusinessServices = async (model: CreateBusinessModel): Promise<MsgResponse<CreateBusinessModel>> => {
   const url = 'api/businesses';
   const response = await ApiClient.post<MsgResponse<CreateBusinessModel>>(url, model);
   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al crear la organización',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const PasswordRecover = async (model: passwordRecoverModel): Promise<MsgResponse<passwordRecoverModel>> => {
   const url = 'api/users/SecurePhrase';
   const response = await ApiClient.post<MsgResponse<passwordRecoverModel>>(url, model);
   if (response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Frase no valida',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};
