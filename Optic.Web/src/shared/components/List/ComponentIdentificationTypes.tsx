import { useListSettings } from "./useListSettings"

export const ComponentIdentificationTypes = ({ selectedValue, name, className, xChange, required }: { selectedValue: string, name?: string, className?: string, xChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, required?: boolean }) => {
    const { identificationTypes, queryIdentificationTypes } = useListSettings();

    return (
        <select
            name={name || 'idIdentificationType'}
            className={className || 'w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'}
            value={selectedValue}
            onChange={xChange}
            required={required}
        >
            <option value="">Seleccione</option>
            {queryIdentificationTypes?.isLoading && <option>Cargando...</option>}

            {queryIdentificationTypes?.isError && <option>Error</option>}
            {identificationTypes?.map((x) => (
                <option value={x.id} key={x.id}>{x.name}</option>
            ))}
        </select>
    )
}
