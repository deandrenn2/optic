export interface CreateSupplierModel {
   name: string;
   nit: string;
   address: string;
   email: string;
   cellPhoneNumber: string;
   phoneNumber: string;
}

export interface SuppliersResponseModel {
   firstName: ReactNode;
   lastName: ReactNode;
   id: number;
   name: string;
   nit: string;
   address: string;
   cellPhoneNumber: string;
   phoneNumber: string;
   email: string;
}
