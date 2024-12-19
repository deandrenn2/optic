import { useCategories } from "./useProducts";
import Select, { ActionMeta, SingleValue } from "react-select";

export const CategoriesSelect = ({ selectedValue, name, className, xChange, required }: { selectedValue?: string, name?: string, className?: string, xChange: (newValue: SingleValue<string>, actionMeta: ActionMeta<string>) => void, required?: boolean }) => {
    const { categories, queryCategories } = useCategories();

    return (
        <Select name={name || 'idCategorie'} className={className}
            value={selectedValue}
            onChange={xChange}
            required={required}
            loadingMessage={() => 'Cargando...'}
            isDisabled={queryCategories?.isLoading}
            isLoading={queryCategories?.isLoading}
            options={categories?.map((x) => (x.name))}

        />

    )
}