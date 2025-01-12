export const MoneyFormatter = ({ amount }: { amount: number | undefined }) => {
    // Configuración para formato de dinero
    if (!amount)
        return <span>0.00</span>;

    const formatter = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
    });

    return <span>{formatter.format(amount)}</span>;
}