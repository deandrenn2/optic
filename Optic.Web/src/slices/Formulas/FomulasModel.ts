export interface FormulaModel {
   id: number;
   Description: string;
   Date: Date;
   State: string;
   PriceLens: number;
}

export interface FormulasResponseModel {
   id: number;
   Description: string;
   Date: Date;
   State: string;
   PriceLens: number;
}

export interface TagModel {
   id: number;
   name: string;
}

export interface DiagnosisModel {
   id?: number;
   name: string;
   value: string;
   description?: string;
}

export interface InvoiceDetailModel {
   description: string;
   price: number;
   quantity: number;
   idProduct: number;
   idInvoice: number;
}

export interface CreateFormulasModel {
   idBusiness: number;
   idClient?: number;
   description: string;
   date: Date;

   tags: string[];
   diagnosis: DiagnosisModel[];
   products: InvoiceDetailModel[];

   priceLens?: number;
   priceConsultation?: number;
   sumTotal?: number; // Note: Computed property
   sumTotalProducts?: number; // Note: Computed property
}
