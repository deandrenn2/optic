import {  useState } from "react";
import { useListSettings } from "../../shared/components/List/useListSettings";
import { useQueryClient } from "@tanstack/react-query";
import { BrandModel } from "../../shared/components/List/ListModels";

export const BrandsForm = ({ model }: { model?: BrandModel }) => {
    const { settings, updateSettings } = useListSettings();
    console.log(settings);
    const [brand, setBrand] = useState("");
    const queryClient = useQueryClient();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;  
        setBrand(value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(model){
            //Actualizar
        } else{
            //Crear
            if (settings){
                const KEY = 'LIST_SETTINGS';
                const brands = settings.brands;
                const count = brands.length +1;
                const updateBrans = [...brands, {id: count, name: brand }]
                const newSettings = {...settings, brands: updateBrans};

                const res = await updateSettings.mutateAsync(newSettings);

                if (res.isSuccess)
                queryClient.setQueryData([KEY],newSettings);
            }
        }
 
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit} className="w-full">
                <input
                    required
                    name="name"
                    value={model?.name}
                    onChange={handleChange}
                    placeholder="Marcas"
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 font-bold mt-2 border rounded-lg">
                        {updateSettings.isPending ? "Creando..." : "Crear Marca"}
                    </button>
                </div>
            </form>
        </div>
    );
};
