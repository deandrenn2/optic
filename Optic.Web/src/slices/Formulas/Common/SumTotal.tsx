import { MoneyFormatter } from "../../../shared/components/Numbers/MoneyFormatter";
import { CreateFormulasModel, UpdateFormulasModel } from "../FomulasModel";

export const SumTotal = ({ formula, sumTotalProducts }: { formula: UpdateFormulasModel | CreateFormulasModel, sumTotalProducts: number }) => {

    const getTotalSumaTotal = () => {
        let total = 0;
        total = sumTotalProducts;

        if (formula.priceLens)
            total += formula.priceLens;

        if (formula.priceConsultation)
            total += formula.priceConsultation;

        return total;
    }

    return <div className="mb-4 text-right">
        <p>Consulta: <MoneyFormatter amount={formula.priceConsultation} /></p>
        <p>Lente: <MoneyFormatter amount={formula.priceLens} /></p>
        <p>Productos: <MoneyFormatter amount={sumTotalProducts} /></p>
        <p className="font-bold">Total: <MoneyFormatter amount={getTotalSumaTotal()} /></p>
    </div>;
};