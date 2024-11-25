import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { ProductForm } from "./ProductsForm";


export const ProductsDetail = () => {
    useParams();
    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-4">
                <Link to={"/Products"} title='Volver al listado de productos' className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                    <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        className="fa-search top-3 pr-2 font-bold"
                    />Volver al listado de productos</Link>
            </div>
            <div className="w-1/4 bg-white p-4 rounded-lg">
                <ProductForm />
            </div>
            
        </div>
    );
};