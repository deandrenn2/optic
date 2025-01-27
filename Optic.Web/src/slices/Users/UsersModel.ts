export interface UsersModel {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   securePharse: string;
}

export interface UsersResponseModel {
   id: number;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   securePharse: string;
}

export interface UsersAvatarModel {
   id: number | undefined;
   idAvatar: number;
}

