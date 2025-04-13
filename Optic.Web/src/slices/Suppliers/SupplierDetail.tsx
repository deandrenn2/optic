import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useParams } from "react-router-dom"
import { SuppliersForm } from "./SuppliersForm"

export const SupplierDetail = () => {
    const { id } = useParams();
    return (
        <div className="w-full">
            <div className="w-full flex justify-start mb-4">
                <Link to={"/Suppliers"} title='Volver'
                 className="bg-gray-300 hover:bg-gray-300 text-gray-700 hover:text-gray-800 border border-gray-400 hover:border-gray-600 px-4 py-2 rounded font-bold flex items-center transition-all">
                    <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        className="mr-2"
                    />Volver</Link>
            </div>
            <div className="w-1/4 bg-white p-4 rounded-lg">
                <SuppliersForm id={Number(id)} />
            </div>
        </div>
    )
}