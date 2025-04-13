import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { PurchaseUpdate } from "./PurchaseUpdate";
import { usePurchase } from "./usePurchases";
import { useFileDownload } from "../../shared/components/FilesDowload";
export const PurchaseDetail = () => {
    const { id } = useParams();
    const { purchase } = usePurchase(id);
    const { descargarArchivo } = useFileDownload();
    const location = useLocation();
    const fronHome = location.state?.fromHome;
    const handleDownload = async (id: number) => {
        const urlBlob = `/api/purchases/${id}/report`;
        await descargarArchivo(urlBlob, "Compra_" + id + "_" + new Date().toISOString().split('T')[0] + ".xlsx");
    }

    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-4">
                <Link to={fronHome? "/":"/Billing"} 
                title='Volver' className="bg-gray-300 hover:bg-gray-300 text-gray-700 hover:text-gray-800 border border-gray-400 hover:border-gray-600 px-4 py-2 rounded font-bold flex items-center transition-all">

                    <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        className="fa-search top-3 pr-2 font-bold"
                    />{fronHome ? "Volver" : "Volver"}
                </Link>
                <h2 className="text-2xl font-semibold p-2">Compra #{purchase?.number?.toString().padWithZeros(5)}</h2>
                <button onClick={() => handleDownload(Number(id))} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-4 transition-all"> <FontAwesomeIcon className="text-white text-xl" icon={faFileExcel} /> Decargar </button>
            </div>
            <div className="w-2/3 bg-white p-4 rounded-lg">
                <PurchaseUpdate />
            </div>

        </div>
    );
};