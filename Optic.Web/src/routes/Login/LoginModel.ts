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