import { InvoiceDetailModel } from '../Formulas/FomulasModel';

export interface SalesResponseModel {
   id: number;
   idBusiness: number;
   idClient?: number;
   clientName: string;
   state: string;
   date: Date;
   idInvoice: number;
   paymentType: string;
   products: InvoiceDetailModel[];
}

export interface CreateSaleModel {
   id?: number;
   idBusiness: number;
   idClient?: number | null;
   date: Date;
   paymentType: string;
   products: InvoiceDetailModel[];
   sumTotal: number;
}
