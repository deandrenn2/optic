interface MoneyFormatterProps {
    amount?: number;
    abbreviation?: boolean;
    decimals?: number;
}

export const MoneyFormatter = ({ amount = 0, abbreviation = false, decimals = 0 }: MoneyFormatterProps) => {
    const formatNumber = (value: number) => {
        if (value >= 1e9) return `${(value / 1e9).toFixed(decimals)}B`;
        if (value >= 1e6) return `${(value / 1e6).toFixed(decimals)}M`;
        if (value >= 1e3) return `${(value / 1e3).toFixed(decimals)}K`;
        return value.toFixed(decimals);
    };

    const formatter = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

    return <span>{abbreviation ? `$${formatNumber(amount)}` : formatter.format(amount)}</span>;
};