import { faCircleMinus, faFileExcel, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormulas } from "./useFormulas";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { FormulasCreate } from "./FormulasCreate";
import { useState } from "react";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { Bar } from "../../shared/components/Progress/Bar";
import { MoneyFormatter } from "../../shared/components/Numbers/MoneyFormatter";
import { format } from "date-fns";
import DetailButton from "../../shared/components/Buttons/ButtonDetail";
import Swal from "sweetalert2";
import { getStatusColorInvoice } from "./FormulasUtils";
import { useFileDownload } from "../../shared/components/FilesDowload";
export const Formulas = () => {
    const [visible, setVisible] = useState(false);
    const handleClose = (): void => {
        setVisible(false);
    }
    const { formulas, queryFormulas, deleteFormula } = useFormulas();
    const { descargarArchivo } = useFileDownload();

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar esta formula?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                await deleteFormula.mutateAsync(id);
            }
        })
    };

    const handleDownload = async (id: number) => {
        const urlBlob = `/api/formulas/${id}/report`;
        await descargarArchivo(urlBlob, "Formula_" + id + "_" + new Date().toISOString().split('T')[0] + ".xlsx");
    }

    if (queryFormulas.isLoading)
        return <Bar Title="Cargando formulas..." />;

    return (
        <div> <div className="w-full">
            <div className="flex space-x-4 mb-2">
                <div className="mb-2">
                    <button type='button'
                        onClick={() => setVisible(true)}
                        className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="fa-search top-3 pr-2 font-bold" />
                        Nueva formula
                    </button>
                </div>
                <div className="mb-2">
                    <div className="relative">
                        <div className=" inline-flex">
                            <input type="text"
                                placeholder="Buscar formula"
                                className="p-2 pl-10 border-blue-400 rounded-tl-lg rounded-bl-lg" />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="fas fa-search absolute left-3 top-3 text-gray-400" />
                            <button
                                className="text-white font-bold border hover:bg-blue-700 bg-blue-500 px-4 py-2 rounded-tr-lg rounded-br-lg ">Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Nº Formula</th>
                        <th className="border border-gray-300 p-2">Cliente</th>
                        <th className="border border-gray-300 p-2">Valor Consulta</th>
                        <th className="border border-gray-300 p-2">Fecha</th>
                        <th className="border border-gray-300 p-2">Estado</th>
                        <th className="border border-gray-300 p-2">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {formulas?.map((formula) => (
                        <tr key={formula.id}>
                            <td className="border border-gray-300 p-2 text-center">#{formula.number.toString().padWithZeros(5)}</td>
                            <td className="border border-gray-300 p-2">{formula.clientName}</td>
                            <td className="border border-gray-300 p-2 text-center"><MoneyFormatter amount={formula?.priceConsultation} /></td>
                            <td className="border border-gray-300 p-2 text-center">{format(formula?.date, ' dd/LL/yyyy')}</td>
                            <td className={`border border-gray-300 p-2 text-center font-semibold ${getStatusColorInvoice(formula?.state)}`}>{formula?.state}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <DetailButton url={`/formulas/${formula.id}`} className="text-blue-500 text-2xl hover:text-blue-700 mr-2" />
                                <button onClick={() => handleDownload(formula.id)} className="text-green-500 mr-3  text-2xl"><FontAwesomeIcon icon={faFileExcel} /></button>
                                <button onClick={() => handleDelete(formula.id)} className="text-red-500 text-2xl hover:text-red-700 mr-2"><FontAwesomeIcon icon={faCircleMinus} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            <OffCanvas titlePrincipal='Nueva formula' visible={visible} xClose={handleClose} position={Direction.Right} size="lg" >
                <FormulasCreate />
            </OffCanvas>
        </div>
    )
}

