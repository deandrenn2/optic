import { useListBrands } from "./useListSettings"

export const ComponentBrands = ({ selectedValue, name, className, xChange, required }: { selectedValue: string, name?: string, className?: string, xChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, required?: boolean }) => {
    const { brands, queryBrands } = useListBrands();

    return (
        <select
            name={name || 'idBrand'}
            className={className || 'border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'}
            value={selectedValue}
            onChange={xChange}
            required={required}
        >
            <option value="">Seleccione</option>
            {queryBrands?.isLoading && <option>Cargando...</option>}

            {queryBrands?.isError && <option>Error</option>}
            {brands?.map((x) => (
                <option value={x.id} key={x.id}>{x.name}</option>
            ))}
        </select>
    )
}
