export interface MsgResponse<T> {
   isSuccess?: boolean;
   message: string;
   isFailure?: boolean;
   data?: T;
   error?: {
      code: string;
      message: string;
   };
}

export interface Option {
   value?: string;
   label?: string;
}
