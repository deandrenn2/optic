
import { useBrands, useListSettings } from "../../shared/components/List/useListSettings";
export const BrandsForm = ({ id }: { id?: number }) => {
    const { settings } = useListSettings();
    const { updateBrand, createBrand } = useBrands();

    return (
        <div>
            <form>
                <input
                    name="name"
                    placeholder="Marcas"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-2">
                    <button
                        type="submit"
                        disabled={id ? updateBrand.isPending : createBrand.isPending}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"
                    >
                        {id ? (updateBrand.isPending ? "Actualizando..." : "Actualizar Marca") : (createBrand.isPending ? "Creando..." : "Crear Marca")}
                    </button>
                </div>
            </form>
        </div>
    );
};
