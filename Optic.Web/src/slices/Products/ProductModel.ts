export interface ProductModel {
   id?: number;
   name: string;
   idBrand: number;
   codeNumber: string;
   barCode: string;
   quantity: number;
   unitPrice: number;
   salePrice: number;
   stock: number;
   image: string;
}
export interface ProductResponseModel {
   id: number;
   name: string;
   idBrand: number;
   codeNumber: string;
   barCode: string;
   quantity: number;
   unitPrice: number;
   salePrice: number;
   stock: number;
   image: string;
}