export interface PurchaseDetailModel {
    idProduct: number;
    quantity: number;
    unitPrice: number; // Costo unitario del producto
    totalCost: number; // Costo total por producto (unitCost * quantity)
 }
 
 export interface PurchaseResponseModel {
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
    idSupplier?: number | null;
    date: Date;
    paymentType: string;
    products: PurchaseDetailModel[];
    totalAmount: number;

 }