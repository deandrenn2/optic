import { ApiClient } from "../../shared/helpers/ApiClient";
import { MsgResponse } from "../../shared/model";
import { BillingDocumentModel } from "./BillingModal";
export const getDocuments = async (
    number?: number, 
    status?: string,
    type?: string,
    clientOrSupplierID?: number,
    clientOrSupplierType?: string,
    from?: string,
    to?: string
) => { 
    try {
        const response = await ApiClient.get<MsgResponse<BillingDocumentModel[]>>(
            "api/billing/documents",
            { 
                params: {  number, status, type,  clientOrSupplierID, clientOrSupplierType, from, to 
                } 
            }
        );
        return {
            ...response.data,
            data: response.data?.data ?? []
        };
    } catch (error) {
        console.error("Error al obtener documentos:", error);
        return {
            isSuccess: false,
            message: "Error al obtener documentos",
            isFailure: true,
            data: [] 
        };
    }
};
