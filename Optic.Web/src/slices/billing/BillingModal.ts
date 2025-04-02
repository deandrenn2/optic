
export interface BillingDocumentModel {    
    id: number;                // ID del documento
    number: number;            // Número de la factura
    typeDocument: string;      // Tipo de documento (ej. "Factura", "Recibo")
    state: string;             // Estado del documento (ej. "Pagado", "Pendiente")
    clientOrSupplier: string;  // Cliente o proveedor
    date: string;              // Fecha en formato ISO (YYYY-MM-DDTHH:mm:ssZ)
    paymentMethod: string;     // Método de pago
    total: number;  
        
        
}