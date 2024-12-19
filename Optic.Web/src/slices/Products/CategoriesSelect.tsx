import { useCategories } from "./useProducts";
import Select, { ActionMeta, SingleValue } from "react-select";

export const CategoriesSelect = ({ selectedValue, name, className, xChange, required }: { selectedValue?: string, name?: string, className?: string, xChange: (newValue: SingleValue<string>, actionMeta: ActionMeta<string>) => void, required?: boolean }) => {
    const { categories, queryCategories } = useCategories();

    return (
        <Select name={name || 'idCategories'} className={className}
            value={selectedValue}
            onChange={xChange}
            required={required}
            loadingMessage={() => 'Cargando...'}
            isDisabled={queryCategories?.isLoading}
            isLoading={queryCategories?.isLoading}
            options={categories?.map((x) => (x.name))}

        />
        // <select
        //     name={name || 'idCategories'}
        //     className={className || 'w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'}
        //     value={selectedValue}
        //     onChange={xChange}
        //     required={required}
        // >
        //     <option value="">Seleccione</option>
        //     {queryCategories?.isLoading && <option>Cargando...</option>}

        //     {queryCategories?.isError && <option>Error</option>}
        //     {categories?.map((x) => (
        //         <option value={x.id} key={x.id}>{x.name}</option>
        //     ))}
        // </select>

    )
}