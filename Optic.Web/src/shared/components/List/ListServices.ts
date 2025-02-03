
import { ApiClient } from '../../helpers/ApiClient';
import { MsgResponse } from '../../model';
import { BrandModel,  IdentificationTypeModel, SettingsSystemModel } from './ListModels';

export const getIdentificationTypes = async (): Promise<MsgResponse<IdentificationTypeModel[]>> => {
   const url = 'api/settings/identificationTypes';
   const response = await ApiClient.get<MsgResponse<IdentificationTypeModel[]>>(url);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener tipos de identificación',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const getSettings = async (): Promise<MsgResponse<SettingsSystemModel>> => {
   const url = 'api/settings';
   const response = await ApiClient.get<MsgResponse<SettingsSystemModel>>(url);
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener configuraciones',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};




export const updateIdentificationTypeService = async (identificationType: IdentificationTypeModel): Promise<MsgResponse<IdentificationTypeModel>> => {
   const url = 'api/settings/identificationType';
   const response = await ApiClient.put<MsgResponse<IdentificationTypeModel>>(url, identificationType);
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener tipos de actualizar identificación',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }
   return response.data;
};


export const getBrands = async (): Promise<MsgResponse<BrandModel[]>> => {
   const url = 'api/categories';
   const response = await ApiClient.get<MsgResponse<BrandModel[]>>(url);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener Marcas',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};



export const createBrandsService = async (Brands: BrandModel): Promise<MsgResponse<BrandModel>> => {
   const url = 'api/settings';
   const response = await ApiClient.put<MsgResponse<BrandModel>>(url, Brands);
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al crear  Marca',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }
   return response.data;
};



export const updateBrandsService = async (Brands: BrandModel): Promise<MsgResponse<BrandModel>> => {
   const url = 'api/settings';
   const response = await ApiClient.put<MsgResponse<BrandModel>>(url, Brands);
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener tipos de actualizar Marca',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }
   return response.data;
};