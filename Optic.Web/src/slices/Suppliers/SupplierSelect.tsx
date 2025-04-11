import { useSupplier } from "./useSupplier"

export const SupplierSelect = ({ selectedValue, name, className, xChange, required, disabled }:
    { selectedValue: string, name?: string, className?: string, xChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, required?: boolean, disabled?: boolean }) => {
    const { suppliers, querySuppliers } = useSupplier();
    return (

        <select
            name={name || 'idSupplier'}
            className={className || 'w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'}
            value={selectedValue}
            onChange={xChange}
            required={required}
            disabled={disabled}
        >
            <option value="">Seleccione</option>
            {querySuppliers?.isLoading && <option>Cargando...</option>}

            {querySuppliers?.isError && <option>Error</option>}
            {suppliers?.map((x) => (
                <option value={x.id} key={x.id}>{x.name}</option>
            ))}
        </select>

    )
}