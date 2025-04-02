import { InvoiceDetailModel } from '../Formulas/FomulasModel';

export interface SalesResponseModel {
   id: number;
   number: number;
   idBusiness: number;
   idClient?: number;
   clientName?: string;
   state: string;
   date: Date;
   paymentType: string;
   sumTotal: number;
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

export interface UpdateSaleModel {
   id: number;
   number: number;
   idBusiness: number;
   idClient?: number;
   state: string;
   date: Date;
   paymentType: string;
   sumTotal: number;
   products: InvoiceDetailModel[];
}

export interface UpdateStateSale {
   id: number;
   state: string;
}
