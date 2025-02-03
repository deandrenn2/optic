
import { useState } from "react";
import { useListSettings } from "../../shared/components/List/useListSettings";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { BrandsForm } from "./BrandsForm";
import ButtonDetail from "../../shared/components/Buttons/ButtonDetail";
export const Brands = () => {
    const { settings } = useListSettings();
    const [visible, setVisible] = useState(false);
        
    function handleClose(): void  {
            setVisible(false);
        }
     
    return (
        <div>
           <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold" onClick={() => setVisible(true)}>
                Crear Marca
           </button>
            <table className="min-w-full bg-white border border-gray-300 mt-2">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Marcas</th>
                    </tr>
                </thead>
                <tbody>
                    {settings?.brands?.map((brand) => (
                        <tr key={brand.id}>
                            <td className="border border-gray-300 p-2 text-center">{brand.name}</td>
                            <td className="border border-gray-300 p-2 text-center"> 
                                <ButtonDetail url={`/Settings/Brands/${brand.id}`}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <OffCanvas titlePrincipal='Crear Marcas' visible={visible} xClose={handleClose} position={Direction.Right} >
                 <BrandsForm />
            </OffCanvas>
        </div>
    )
}