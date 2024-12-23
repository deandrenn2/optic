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
