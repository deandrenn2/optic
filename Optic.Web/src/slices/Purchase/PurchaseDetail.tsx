import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { PurchaseUpdate } from "./PurchaseUpdate";
export const PurchaseDetail = () => {
        
    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-4">
                <Link to={"/Billing"} title='Volver al listado de formulas' className="bg-gray-300 hover:bg-gray-300 text-gray-700 hover:text-gray-800 border border-gray-400 hover:border-gray-600 px-4 py-2 rounded font-bold flex items-center transition-all">
                    <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        className="fa-search top-3 pr-2 font-bold"
                    />Volver al listado
                </Link>
                <h2 className="text-2xl font-semibold p-2"></h2>
            </div>
            <div className="w-2/3 bg-white p-4 rounded-lg">
                <PurchaseUpdate />
            </div>

        </div>
    );
};