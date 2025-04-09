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
   updateDate: any;
   id: number;
   name: string;
   idBrand: number;
   codeNumber: string;
   quantity: number;
   unitPrice: number;
   salePrice: number;
   idSupplier: number;
   image?: string;
   categories: string[];
   stock?: number;
   barCode?: string;
}

export interface ProductPagerModel {
   id: number;
   name: string;
   codeNumber: string;
   quantity: number;
   unitPrice: number;
   salePrice: number;
   stock: number;
   updateDate?: Date;
}

export interface CategoriesModel {
   id?: number;
   name: string;
}

export interface QuantityModel {
   id?: number;
   quantity: number;
   isIncrement: boolean;
}

export interface ProductSearchResponse {
   currentPage: number;
   pageCount: number;
   pageSize: number;
   firstRowOnPage: number;
   lastRowOnPage: number;
   count: number;
   code: number;
   message: string | null;
   error: string | null;
   data: ProductsResponseModel[];  
}
