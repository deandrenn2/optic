import { useState } from "react";
import { useListSettings } from "../../shared/components/List/useListSettings";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { BrandsForm } from "./BrandsForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { BrandModel, } from "../../shared/components/List/ListModels";
export const Brands = () => {
    const { settings } = useListSettings();
    const [visible, setVisible] = useState(false);
    const [selectedBran, setSelectedBran] = useState<BrandModel>();

    function handleClose(): void {
        setVisible(false);
    }

    const handleSetting = (brand: BrandModel) => {
        setSelectedBran(brand);
        setVisible(true);
    }

    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold" onClick={() => {
                setSelectedBran(undefined);
                setVisible(true)
            }
            }>
                Crear Marca
            </button>
            <table className="min-w-full bg-white border border-gray-300 mt-2">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Marca</th>
                    </tr>
                </thead>
                <tbody>
                    {settings?.brands?.map((brand) => (
                        <tr key={brand.id} className="hover:bg-pink-50">
                            <td className="border border-gray-300 p-2 text-center m-9">
                                <span className="m-2">
                                    {brand.name}
                                </span>
                                <FontAwesomeIcon icon={faPencil} className="text-blue-500 cursor-pointer hover:text-blue-700 absolute right-90 " onClick={() => handleSetting(brand)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <OffCanvas titlePrincipal={selectedBran ? 'Actualizar Marca' : ' Crear Marca'} visible={visible} xClose={handleClose} position={Direction.Right} >
                <BrandsForm model={selectedBran} set={setVisible} />
            </OffCanvas>
        </div>
    )
}
