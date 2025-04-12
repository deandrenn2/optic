import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useListSettings } from "../../shared/components/List/useListSettings";
import { faPencil,} from "@fortawesome/free-solid-svg-icons";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { IdentificationForm } from "./IdentificationForm";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { useState } from "react";
import { IdentificationTypeModel } from "../../shared/components/List/ListModels";
export const IdentificationTypes = () => {
    const { identificationTypes, } = useListSettings();
    const [visible, setVisible] = useState(false);
    const [identificationType, setIdentificationType] = useState<IdentificationTypeModel>();

    const handleClose = (): void => {
        setVisible(false);
    }
    const handleIdentificationType = (identificationType: IdentificationTypeModel) => {
        setIdentificationType(identificationType);
        setVisible(true);
    }
   
    return (
        <div>
            <div className="rounded-lg border border-grey-500 mb-4 w-full ">
                <table className=" bg-white rounded shadow w-full">
                    <thead>
                        <tr>
                            <th className="border p-2">Orden</th>
                            <th className="border p-2">Tipo de Identificación</th>
                            <th className="border p-2">Abreviación</th>
                            <th className="border p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {identificationTypes?.map((identification) => (
                            <tr key={identification.id} className="hover:bg-pink-200">
                                <td className="border border-gray-300 p-2 text-center">{identification.orden}</td>
                                <td className="border border-gray-300 p-2 text-center">{identification.name}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <span title={identification?.name} className='text-blue-700 font-bold'>{identification?.abbreviation}</span>
                                </td>
                                <td className="text-center">
                                    <span className="text-center" >
                                        <FontAwesomeIcon icon={faPencil} className="text-blue-500 cursor-pointer hover:text-blue-700 " onClick={() => handleIdentificationType(identification)} />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <OffCanvas titlePrincipal='Actualizar Identificación' visible={visible} xClose={handleClose} position={Direction.Right} >
                <IdentificationForm identificationType={identificationType}/>
            </OffCanvas>
        </div>
    )
}

