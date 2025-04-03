export interface MsgResponse<T> {
   isSuccess?: boolean;
   message: string;
   isFailure?: boolean;
   data?: T;
   error?: {
      code: string;
      message: string;
   };
   count?: number;
   pageSize?: number;
   pageCount?: number;
}

export interface Option {
   value?: string;
   label?: string;
}
