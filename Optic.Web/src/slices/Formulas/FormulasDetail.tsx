import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { FormulasUpdate } from "./FormulasUpdate";
export const FormulasDetail = () => {
    const location = useLocation();
    const fromHome = location.state?.fromHome ?? false;
    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-4">
                <Link
                    to={fromHome ? "/" : "/Formulas"}
                    title="Volver al listado de fórmulas"
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold flex items-center"
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft} className="mr-2" />
                    {fromHome ? "Volver a Inicio" : "Volver al listado de fórmulas"}
                </Link>
            </div>
            <div className="w-2/3 bg-white p-4 rounded-lg">
                <FormulasUpdate />
            </div>
        </div>
    );
};
