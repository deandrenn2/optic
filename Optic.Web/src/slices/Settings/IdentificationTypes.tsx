import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useListSettings } from "../../shared/components/List/useListSettings";
import { faMagnifyingGlass, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { IdentificationForm } from "./IdentificationForm";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { useState } from "react";
import { IdentificationTypeModel } from "../../shared/components/List/ListModels";
export const IdentificationTypes = () => {
    const { identificationTypes ,  } = useListSettings();
    const [visible,setVisible] = useState(false);
    const [identificationType,setIdentificationType] = useState<IdentificationTypeModel>();
   
    const handleClose = (): void => {
        setVisible(false);
    }
    const handleIdentificationType = (identificationType: IdentificationTypeModel) => {
        setIdentificationType(identificationType);  
        setVisible(true);
    }
    const handleFormSubmit = (updateType: IdentificationTypeModel) => {
        useListSettings().updateIdentificationType.mutateAsync(updateType);
        setVisible(true);
        
    }

    
    return (
        <div>
            <div className="flex space-x-4 mb-4">
                <div className="mb-2">
                    <button type='button' className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"><FontAwesomeIcon icon={faPlus} className="fa-search top-3 pr-2 font-bold" />Nuevo</button>
                </div>
                <div className="mb-2">
                    <div className="relative">
                        <div className="inline-flex">
                            <input
                                type="text"
                                placeholder="Buscar usuario"
                                className="p-2 pl-10 border-blue-400 rounded" />
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="fa-search absolute left-3 top-3 text-gray-400" />
                            <button className="text-white font-bold border hover:bg-blue-700 bg-blue-500 px-4 py-2 rounded ">Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
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
                            <tr key={identification.id}>
                                <td className="border border-gray-300 p-2 text-center">
                                    {identification.orden}</td>

                                <td className="border border-gray-300 p-2 text-center">{identification.name}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <span title={identification?.name} className='text-blue-700 font-bold'>{identification?.abbreviation}</span>
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                <span className="text-center" >
                                    <FontAwesomeIcon icon={faPencil} className="text-blue-500" onClick={() => handleIdentificationType(identification)} />
                                </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <OffCanvas titlePrincipal='Actualizacion Identificación' visible={visible} xClose={handleClose} position={Direction.Right} >
                <IdentificationForm identificationType={identificationType}
                  onSubmit={handleFormSubmit} />
            </OffCanvas>
        </div>
    )
}

