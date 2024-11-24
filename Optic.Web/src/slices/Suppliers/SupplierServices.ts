import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { CreateClientModel } from '../Clients/ClientModel';
import { SupplierModel, SuppliersResponseModel } from './SupplierModel';

export const createSupplierService = async (model: SupplierModel): Promise<MsgResponse<SupplierModel>> => {
   const url = 'api/Suppliers';
   const response = await ApiClient.post<MsgResponse<SupplierModel>>(url, model);

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

export const deleteSupplierService = async (id: number): Promise<MsgResponse<CreateClientModel>> => {
   const url = `api/Suppliers/${id}`;
   const response = await ApiClient.delete<MsgResponse<CreateClientModel>>(url);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al eliminar proveedor',
         isFailure: true,
         error: {
            code: response.status.toString(),
            message: response.statusText,
         },
      };
   }

   return response.data;
};

export const updateSupplierService = async (model: SupplierModel): Promise<MsgResponse<SupplierModel>> => {
   const url = 'api/Suppliers';
   const response = await ApiClient.put<MsgResponse<SupplierModel>>(url, model);

   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al actualizar proveedor',
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
