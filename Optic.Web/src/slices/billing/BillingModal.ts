export interface BillingDocumentModel {    
    id: number;                
    number: number;            
    typeDocument: string;      
    state:  string;
    clientOrSupplier?: string | null;  
    date: string;              
    paymentMethod?: string | null;  
    total: number;  
}
