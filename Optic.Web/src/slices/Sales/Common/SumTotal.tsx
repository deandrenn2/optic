import { MoneyFormatter } from "../../../shared/components/Numbers/MoneyFormatter";

export const SumTotal = ({ sumTotalProducts }: { sumTotalProducts: number }) => {

    const getTotalSumaTotal = () => {
        let total = 0;
        total = sumTotalProducts;
        return total;
    }

    return <div className="mb-4 text-right">
        <p>Productos: <MoneyFormatter amount={sumTotalProducts} /></p>
        <p className="font-bold">Total: <MoneyFormatter amount={getTotalSumaTotal()} /></p>
    </div>;
};