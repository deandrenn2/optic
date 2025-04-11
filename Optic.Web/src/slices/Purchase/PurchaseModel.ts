export interface PurchaseDetailModel {
   idProduct: number;
   productName?: string;
   quantity: number;
   price: number;
   priceSale: number;
   totalCost: number;
}

export interface PurchaseResponseModel {
   id: number;
   number: number;
   idBusiness: number;
   supplierId?: number;
   supplierName: string;
   state: string;
   date: Date;
   paymentType: string;
   products: PurchaseDetailModel[];
   totalAmount: number; // Suma total de la compra
}

export interface CreatePurchaseModel {
   id?: number;
   idBusiness: number;
   supplierId?: number | null;
   date: Date;
   paymentType: string;
   products: PurchaseDetailModel[];
   sumTotal: number;
}

export interface UpdatePurchaseModel {
   id: number;
   idBusiness: number;
   supplierId?: number | null;
   date: Date;
   paymentType: string;
   products: PurchaseDetailModel[];
   totalAmount: number;
   state: string;
}

export interface UpdateStatePurchase {
   id: number;
   state: string;
}

export interface paymentsPurchaseModel {
   id: number;
   amount: number;
   date: string;
}

export interface PaymentsPurchaseCreateModel {
   purchaseId: number;
   amount: number;
}
