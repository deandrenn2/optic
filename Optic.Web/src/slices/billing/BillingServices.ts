import { ApiClient } from '../../shared/helpers/ApiClient';
import { MsgResponse } from '../../shared/model';
import { BillingDocumentModel } from './BillingModal';
export const getDocuments = async (
   number?: number,
   status?: string,
   type?: string,
   clientId?: number,
   supplierId?: number,
   from?: string,
   to?: string,
) => {
   const url = `api/billing/documents`;
   const params = new URLSearchParams();

   if (number) params.append('number', number.toString());
   if (status) params.append('status', status);
   if (type) params.append('type', type);
   if (clientId) params.append('clientId', clientId.toString());
   if (supplierId) params.append('supplierId', supplierId.toString());
   if (from) params.append('from', from);
   if (to) params.append('to', to);

   const response = await ApiClient.get<MsgResponse<BillingDocumentModel[]>>(url, { params });
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener documentos',
         isFailure: true,
         data: [],
      };
   }
   return response.data;
};

export const getDocumentsPurchase = async (
   pageIndex: number,
   pageSize: number,
   number?: number,
   status?: string,
   type?: string,
   supplierId?: number,
   from?: string,
   to?: string,
) => {
   const url = `api/billing/documents/purchases`;
   const params = new URLSearchParams();

   if (pageIndex) params.append('pageIndex', pageIndex.toString());
   if (pageSize) params.append('pageSize', pageSize.toString());
   if (number) params.append('number', number.toString());
   if (status) params.append('status', status);
   if (type) params.append('type', type);
   if (supplierId) params.append('supplierId', supplierId.toString());
   if (from) params.append('from', from);
   if (to) params.append('to', to);

   const response = await ApiClient.get<MsgResponse<BillingDocumentModel[]>>(url, { params });
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener documentos',
         isFailure: true,
         data: [],
      };
   }
   return response.data;
};

export const getDocumentsInvoice = async (
   pageIndex: number,
   pageSize: number,
   number?: number,
   status?: string,
   type?: string,
   clientId?: number,
   from?: string,
   to?: string,
) => {
   const url = `api/billing/documents/invoices`;
   const params = new URLSearchParams();

   if (pageIndex) params.append('pageIndex', pageIndex.toString());
   if (pageSize) params.append('pageSize', pageSize.toString());
   if (number) params.append('number', number.toString());
   if (status) params.append('status', status);
   if (type) params.append('type', type);
   if (clientId) params.append('clientId', clientId.toString());
   if (from) params.append('from', from);
   if (to) params.append('to', to);

   const response = await ApiClient.get<MsgResponse<BillingDocumentModel[]>>(url, { params });
   if (response.status !== 200 && response.status !== 201) {
      return {
         isSuccess: false,
         message: 'Error al obtener documentos',
         isFailure: true,
         data: [],
      };
   }
   return response.data;
};
