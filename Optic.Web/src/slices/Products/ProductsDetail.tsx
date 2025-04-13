import { Link, useLocation, useParams } from "react-router-dom";
import { ProductForm } from "./ProductsForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
export const ProductsDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const fromHome = location.state?.fromHome;
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-start mb-4">
                <Link
                    to={fromHome ? "/" : "/Products"}
                    title="Volver al listado de productos"
                    className="bg-gray-300 hover:bg-gray-300 text-gray-700 hover:text-gray-800 border border-gray-400 hover:border-gray-600 px-4 py-2 rounded font-bold flex items-center transition-all"
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft} className="mr-2" />
                    {fromHome ? "Volver" : "Volver"}
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
