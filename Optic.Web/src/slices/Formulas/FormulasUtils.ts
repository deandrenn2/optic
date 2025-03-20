export const getStatusColorInvoice = (status: string) => {
   let color = '';
   switch (status) {
      case 'Borrador':
         color = 'text-gray-600';
         break;
      case 'Pagada':
         color = 'text-green-500';
         break;
      case 'Devolución':
         color = 'text-yellow-500';
         break;
      case 'Crédito':
         color = 'text-blue-500';
         break;
      case 'Anulada':
         color = 'text-red-500';
         break;
      default:
         color = 'text-gray-600';
         break;
   }
   return color;
};
