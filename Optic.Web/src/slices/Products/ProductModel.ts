export interface ProductModel {
   name: string;
   idBrand: number;
   codeNumber: string;
   barCode: string;
   quantity: number;
   unitPrice: number;
   salePrice: number;
   stock: number;
   idSupplier: number;
   image: string;
   categories: string[];
}
export interface ProductsResponseModel {
   id: number;
   name: string;
   idBrand: number;
   codeNumber: string;
   barCode: string;
   quantity: number;
   unitPrice: number;
   salePrice: number;
   idSupplier: number;
   stock: number;
   image: string;
   categories: string[];
}

export interface CategoriesModel {
   id?: number;
   name: string;
}
