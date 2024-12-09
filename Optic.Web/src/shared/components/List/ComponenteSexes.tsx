import { useListSettings } from "./useListSettings"

export const ComponenteSexes = ({ selectedValue, name, className, xChange, required }: { selectedValue: string, name?: string, className?: string, xChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, required?: boolean }) => {
    const { settings, querySettings } = useListSettings();

    return (
        <select
            name={name || 'idSex'}
            className={className || 'w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
            value={selectedValue}
            onChange={xChange}
            required={required}
        >
            <option value="">Seleccione</option>
            {querySettings?.isLoading && <option>Cargando...</option>}

            {querySettings?.isError && <option>Error</option>}
            {settings?.sex?.map((x) => (
                <option value={x.id} key={x.id}>{x.name}</option>
            ))}
        </select>
    )
}
