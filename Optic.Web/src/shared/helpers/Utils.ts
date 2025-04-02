/**
 * Extiende el prototipo de Number para agregar el método `padWithZeros`.
 *
 * @param digits - La cantidad total de dígitos deseados.
 * @returns El número formateado con ceros a la izquierda.
 */
declare global {
   interface String {
      padWithZeros(digits: number): string;
   }
}

String.prototype.padWithZeros = function (digits: number): string {
   return this.padStart(digits, '0');
};

export const formatterMoney = (valor: number, moneda: string): string => {
   if (valor >= 1e9) {
      return (valor / 1e9).toLocaleString(undefined, { style: 'currency', currency: moneda, maximumFractionDigits: 1 }) + 'B';
   }
   if (valor >= 1e6) {
      return (valor / 1e6).toLocaleString(undefined, { style: 'currency', currency: moneda, maximumFractionDigits: 1 }) + 'M';
   }
   if (valor >= 1e3) {
      return (valor / 1e3).toLocaleString(undefined, { style: 'currency', currency: moneda, maximumFractionDigits: 1 }) + 'K';
   }

   return valor.toLocaleString(undefined, { style: 'currency', currency: moneda, maximumFractionDigits: 1 });
};
