import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { FormulasUpdate } from "./FormulasUpdate";
import { useFileDownload } from "../../shared/components/FilesDowload";
import { useFormula } from "./useFormulas";
export const FormulasDetail = () => {
    const location = useLocation();
    const fromHome = location.state?.fromHome ?? false;
    const { id } = useParams();
    const { formula } = useFormula(id);
    const { descargarArchivo } = useFileDownload();

    const handleDownload = async (id: number) => {
        const urlBlob = `/api/formulas/${id}/report`;
        await descargarArchivo(urlBlob, "Formula_" + id + "_" + new Date().toISOString().split('T')[0] + ".xlsx");
    }

    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-4">
                <Link
                    to={fromHome ? '/' : location.state?.from === '' ? '/clientsStory' : location.state?.from ?? "/Formulas"}
                    title="Volver"
                    className="bg-gray-300 hover:bg-gray-300 text-gray-700 hover:text-gray-800 border border-gray-400 hover:border-gray-600 px-4 py-2 rounded font-bold flex items-center transition-all"
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft} className="mr-2" />
                     Volver{}
                </Link>
                <h2 className="text-2xl font-semibold p-2">Formula #{formula?.number?.toString().padWithZeros(5)}</h2>
                <button onClick={() => handleDownload(Number(id))} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-4 transition-all"> <FontAwesomeIcon className="text-white text-xl" icon={faFileExcel} /> Decargar </button>
            </div>
            <div className="w-2/3 bg-white p-4 rounded-lg">
                <FormulasUpdate />
            </div>
        </div>
    );
};
