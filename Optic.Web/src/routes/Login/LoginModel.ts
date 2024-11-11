export interface LoginModel {
  email: string;
  password: string;
}

export interface TokenModel {
      token: string;
      expires: string;
      claims: {
          sub: string;
          jti: string;
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
      };
  
}

export interface UserResponseModel {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface CreateUserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  securePharse: string;
}