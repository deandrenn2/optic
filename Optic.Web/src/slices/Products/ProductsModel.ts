export interface ProductosModel {
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
export interface CreateProductModel {
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