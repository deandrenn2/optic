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

