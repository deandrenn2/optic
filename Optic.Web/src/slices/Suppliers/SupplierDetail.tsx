import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useParams } from "react-router-dom"
import { SuppliersForm } from "./SuppliersForm"

export const SupplierDetail = () => {
    const { id } = useParams();
    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-4">
                <Link to={"/Suppliers"} title='Volver' className="">
                    <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        className="fa-search top-3 pr-2 font-bold"
                    />Volver</Link>
            </div>
            <div className="w-1/4 bg-white p-4 rounded-lg">
                <SuppliersForm id={Number(id)} />
            </div>
        </div>
    )
}