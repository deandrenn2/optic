export interface PurchaseDetailModel {
   idProduct: number;
   productName?: string;
   quantity: number;
   unitPrice: number; // Costo unitario del producto
   totalCost: number; // Costo total por producto (unitCost * quantity)
}

export interface PurchaseResponseModel {
   total: any;
   payments: any;
   id: number;
   idBusiness: number;
   idSupplier?: number;
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
   totalAmount: number;
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
   id: number,
   amount: number,
   date: string;
}

 export interface PaymentsPurchaseCreateModel{
   purchaseId: number, 
   amount: number,
 }