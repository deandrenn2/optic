import { ApiClient } from "../../shared/helpers/ApiClient";
import { MsgResponse } from "../../shared/model";
import { LoginModel, TokenModel } from "./LoginModel";

export const loginUser = async (model: LoginModel): Promise<MsgResponse<TokenModel>> => {
    const url = "api/login";
  const response = await ApiClient.post<MsgResponse<TokenModel>>(url, model);
  if (response.status !== 200) {
    return {
      isSuccess: false,
      message: "Error al ingresar",
      isFailure: true,
      error: {
        code: response.status.toString(),
        message: response.statusText,
      },
    };
  }

  return response.data;
};