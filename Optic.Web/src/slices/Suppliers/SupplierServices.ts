import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { CreateSupplierModel, SuppliersResponseModel } from './SupplierModel';

export const createSupplierService = async (model: CreateSupplierModel): Promise<MsgResponse<CreateSupplierModel>> => {
   const url = 'api/Suppliers';
   const response = await ApiClient.post<MsgResponse<CreateSupplierModel>>(url, model);

   if (response.status !== 201 && response.status !== 200) {
      return {
         isSuccess: false,
         message: 'Error al crear proveedor',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const getSuppliers = async (): Promise<MsgResponse<SuppliersResponseModel[]>> => {
   const url = 'api/Suppliers';
   const response = await ApiClient.get<MsgResponse<SuppliersResponseModel[]>>(url);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener proveedores',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};
