import { ApiClient } from '../../helpers/ApiClient';
import { MsgResponse } from '../../model';
import { BrandModel, IdentificationTypeModel, SettingsSystemModel } from './ListModels';

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

export const updateSettingService = async (settings: SettingsSystemModel): Promise<MsgResponse<SettingsSystemModel>> => {
   const url = 'api/settings';
   const response = await ApiClient.put<MsgResponse<SettingsSystemModel>>(url, settings);
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al actualizar Marca',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }
   return response.data;
};

export const updateBrandsService = async (brands: BrandModel[]): Promise<MsgResponse<BrandModel[]>> => {
   const url = 'api/settings/brands';
   const response = await ApiClient.put<MsgResponse<BrandModel[]>>(url, brands);
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al actualizar Marca',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }
   return response.data;
};

export const getListBrands = async (): Promise<MsgResponse<BrandModel[]>> => {
   const url = 'api/settings/brands';
   const response = await ApiClient.get<MsgResponse<BrandModel[]>>(url);
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener lista de marcas',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }
   return response.data;
};
