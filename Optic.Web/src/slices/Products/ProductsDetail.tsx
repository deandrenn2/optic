import { Link, useLocation, useParams } from "react-router-dom";
import { ProductForm } from "./ProductsForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

export const ProductsDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const fromHome = location.state?.fromHome; // Detectamos si venimos desde Home

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-start mb-4">
                <Link
                    to={fromHome ? "/" : "/Products"}
                    title="Volver al listado de productos"
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold flex items-center"
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft} className="mr-2" />
                    {fromHome ? "Volver a Inicio" : "Volver al listado de productos"}
                </Link>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-start gap-4">
                <div className="w-full lg:w-1/4 bg-white p-3 rounded-lg shadow">
                    <ProductForm id={Number(id)} />
                </div>
            </div>
        </div>
    );
};
