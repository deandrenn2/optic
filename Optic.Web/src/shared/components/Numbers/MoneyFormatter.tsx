export const MoneyFormatter = ({ amount }: { amount: number }) => {
    // Configuración para formato de dinero
    const formatter = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
    });

    return <span>{formatter.format(amount)}</span>;
}