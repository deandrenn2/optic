import { useEffect, useState } from "react";
import { useListBrands } from "../../shared/components/List/useListSettings";
import { useQueryClient } from "@tanstack/react-query";
import { BrandModel } from "../../shared/components/List/ListModels";
export const BrandsForm = ({ model, set }: { model: BrandModel | undefined, set: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { brands, updateBrands } = useListBrands();
    const [brand, setBrand] = useState("");
    const queryClient = useQueryClient();

    useEffect(
        () => {
            if (model) {
                setBrand(model.name)
            }
        }, [model]
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBrand(value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (model) {
            //Actualizar
            if (brands) {
                const KEY = 'LIST_SETTINGS';
                const updateBrans = brands?.map(x =>
                    x.id === model.id ? { id: model.id, name: brand } : x
                );
                const newSettings = { ...brands, brands: updateBrans };
                const res = await updateBrands.mutateAsync(newSettings);
                if (res.isSuccess)
                    queryClient.setQueryData([KEY], newSettings);
            }
        } else {
            //Crear
            if (brands) {
                const KEY = 'LIST_SETTINGS';
                const count = brands ? brands.length + 1 : 1;
                const brandsData = brands ?? [];
                const updateBrans = [...brandsData, { id: count, name: brand }]
                const newSettings = { ...brandsData, brands: updateBrans };
                const res = await updateBrands.mutateAsync(newSettings);
                if (res.isSuccess) {
                    queryClient.setQueryData([KEY], newSettings);
                    set(false);
                }
            }
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-full">
                <input
                    required
                    name="name"
                    value={brand}
                    onChange={handleChange}
                    placeholder="Marca"
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold mt-2">
                        {updateBrands.isPending ? "Guardando..." : model ? "Actualizar Marca" : "Crear Marca"}
                    </button>
                </div>
            </form>
        </div>
    );
};
