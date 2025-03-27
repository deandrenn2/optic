export interface UsersModel {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   securePharse: string;
}

export interface UsersResponseModel {
   id?: number;
   firstName: string;
   lastName: string;
   email: string;
   password?: string;
   securePharse?: string;
}

export interface UsersAvatarModel {
   id: number | undefined;
   idAvatar: number;
}

export interface UsersProfileModel {
   id: number;
   firstName: string;
   lastName: string;
   email: string;
  }

  export interface UsersUpdatePasswordModel {
   id: number; 
   email: string;
   password: string;
} 

export interface passwordRecoverModel {
   id?: number;
   email: string;
   securePharse: string;
}
