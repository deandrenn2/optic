import { useCategories } from "./useProducts";
import Select, { MultiValue } from "react-select";

export interface Option {
    value: string;
    label: string;
}


export const CategoriesSelect = ({ selectedValue, name, className, xChange, required, isSearchable }: { selectedValue?: Option[], name?: string, className?: string, xChange: (newValue: MultiValue<Option>) => void, required?: boolean, isSearchable?: boolean }) => {
    const { categories, queryCategories } = useCategories();

    const options: readonly Option[] | undefined = categories?.map((item) => ({
        value: item.name,
        label: isSearchable ? `${item.id} - ${item.id}` : (item.name),
    }));


    if (options)
        return (
            <Select name={name || 'idCategorie'} className={className}
                value={selectedValue}
                onChange={xChange}
                required={required}
                loadingMessage={() => 'Cargando...'}
                isDisabled={queryCategories?.isLoading}
                isLoading={queryCategories?.isLoading}
                isClearable
                isMulti={true}
                options={options}
            />
        )
}