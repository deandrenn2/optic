export interface FormulaListModel {
   id: number;
   idBusiness: number;
   idClient?: number;
   clientName?: string;
   description: string;
   date: Date;
   priceLens?: number;
   number: number;
   state: string;
   priceConsultation?: number;
   sumTotal?: number;
}

export interface FormulaModel {
   idBusiness: number;
   idClient?: number;
   clientName?: string;
   idInvoice: number;
   number?: number;
   description: string;
   date: Date;
   tags: string[];
   diagnosis: DiagnosisModel[];
   products: InvoiceDetailModel[];
   state: string;
   priceLens: number;
   priceConsultation?: number;
   sumTotal?: number; // Optional because it is calculated
}

export interface FormulaPagerModel {
   id: number;
   codeNumber: number;
   fullName: string;
   firstName: string;
   lastName: string;
   sumTotal: number;
   updateDate?: Date;
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
   stateChange?: number;
}

export interface InvoiceDetailModel {
   description?: string;
   productName?: string;
   price: number;
   quantity: number;
   idProduct: number;
   idInvoice?: number;
}

export interface CreateFormulasModel {
   id?: number;
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

export interface UpdateFormulasModel {
   id?: number;
   idBusiness: number;
   idClient?: number;
   idInvoice: number;
   description: string;
   date: Date;
   state: string;

   tags: string[];
   diagnosis: DiagnosisModel[];
   products: InvoiceDetailModel[];

   priceLens?: number;
   priceConsultation?: number;
   sumTotal?: number;
   sumTotalProducts?: number;
}

export interface UpdateStateFormula {
   id: number;
   state: string;
}
