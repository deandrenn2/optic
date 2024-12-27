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
   id: number;
   name: string;
   description: string;
   value: string;
}
