import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { PurchaseUpdate } from "./PurchaseUpdate";

export const PurchaseDetail = () => {
    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-4">
                <Link to={"/Billing"} title='Volver al listado de formulas' className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                    <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        className="fa-search top-3 pr-2 font-bold"
                    />Volver al listado
                </Link>
            </div>
            <div className="w-2/3 bg-white p-4 rounded-lg">
                <PurchaseUpdate />
            </div>

        </div>
    );
};