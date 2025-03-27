import { formatDistance, parseISO } from "date-fns";
import { useFormulasPager } from "../Formulas/useFormulas";

export const FormulasCard = () => {
    const { formulas } = useFormulasPager();
    return (
        <div className="bg-white rounded-lg shadow p-4 ">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                <h2 className="text-gray-500 font-bold">Formulas</h2>
            </div>
            {formulas?.map((formula) => (
                <div key={formula.id}>
                    <div className="space-y-1">
                        <div className="rounded-lg border border-gray-400 p-4 mb-2">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-bold text-gray-500">#{formula.codeNumber.toString().padWithZeros(5)}</p>
                                <p className=" text-sm font-bold text-purple-500">{formula.sumTotal}</p>
                            </div>
                            <div className="flex justify-between ">
                                <p className="text-sm font-bold">{formula.fullName}</p>
                                <i className="fas fa-play text-gray-500"></i>
                            </div>
                            <p className=" text-gray-500 text-sm">Hace, {formatDistance(new Date(), parseISO(formula.updateDate ? formula.updateDate.toString() : new Date().toString()))}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};  