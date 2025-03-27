export interface CreateClientModel {
   id?: number;
   firstName: string;
   lastName: string;
   sex: number;
   identificationTypeId: number;
   identificationNumber: string;
   email: string;
   address: string;
   cellPhoneNumber: string;
   phoneNumber: string;
}

export interface ClientsResponseModel {
   id: number;
   firstName: string;
   lastName: string;
   sex: number;
   identificationTypeId: number;
   identificationNumber: string;
   email: string;
   address: string;
   cellPhoneNumber: string;
   phoneNumber: string;
}

export interface ClientPagerModel {
   id: number;
   fullName: string;
   firstName: string;
   lastName: string;
   identificationType: string;
   identificationAbbreviation: string;
   identificationNumber: string;
   sex: number;
   updateDate?: Date;
}
