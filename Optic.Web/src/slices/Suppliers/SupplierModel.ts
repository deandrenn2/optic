export interface SupplierModel {
   name: string;
   nit: string;
   address: string;
   email: string;
   cellPhoneNumber: string;
   phoneNumber: string;
}

export interface SuppliersResponseModel {
   id: number;
   name: string;
   nit: string;
   address: string;
   cellPhoneNumber: string;
   phoneNumber: string;
   email: string;
}
