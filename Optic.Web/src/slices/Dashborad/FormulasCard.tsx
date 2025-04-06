import { formatDistance, parseISO } from "date-fns";
import { useFormulasPager } from "../Formulas/useFormulas";
import { Link, useLocation } from "react-router-dom";
import { MoneyFormatter } from "../../shared/components/Numbers/MoneyFormatter";

export const FormulasCard = () => {
    const { formulas } = useFormulasPager();
    const location = useLocation();
    return (
        <div className="bg-white rounded-lg shadow p-4 cursor-pointer ">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                <h2 className="text-gray-500 font-bold">Fórmulas</h2>
            </div>
            {formulas?.map((formula) => (
                <Link
                    key={formula.id}
                    to={`/Formulas/${formula.id}`}
                    state={{ fromHome: location.pathname === "/" }}
                    className="block"
                >
                    <div className="rounded-lg border border-gray-300 p-4 mb-2 hover:border-blue-700 transition-colors duration-300 hover:bg-gray-200">
                        <div className="flex justify-between items-center mb-1">
                            <p className=" font-bold text-gray-500">
                                #{formula.codeNumber.toString().padStart(5, "0")}
                            </p>
                        </div>
                        <div className="flex justify-between items-center relative mb-1">
                            <p>{formula.fullName}</p>
                            <i className="fas fa-play text-gray-500"></i>
                            <p className="absolute inset-50 right-0 font-bold text-1xl text-blue-500">
                                <MoneyFormatter amount={formula.sumTotal} />
                            </p>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Hace{" "}
                            {formatDistance(
                                new Date(),
                                parseISO(formula.updateDate ? formula.updateDate.toString() : new Date().toString())
                            )}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};
