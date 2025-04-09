import { MultiValue } from "react-select";
import { useTags } from "./useFormulas";
import CreatableSelect from "react-select/creatable";

export interface Option {
    value: string;
    label: string;
}


export const LenTypeSelect = ({ selectedValue, name, className, xChange, required, isSearchable, isDisabled }: { selectedValue?: Option[], name?: string, className?: string, xChange: (newValue: MultiValue<Option>) => void, required?: boolean, isSearchable?: boolean, isDisabled?: boolean }) => {
    const { tags, queryTags } = useTags();

    const options: readonly Option[] | undefined = tags?.map((item) => ({
        value: item.name,
        label: isSearchable ? `${item.id} - ${item.id}` : (item.name),
    }));



    return (
        <CreatableSelect name={name || 'idCategorie'} className={className}
            value={selectedValue}
            onChange={xChange}
            required={required}
            loadingMessage={() => 'Cargando...'}
            isDisabled={queryTags?.isLoading || isDisabled}
            isLoading={queryTags?.isLoading}
            isClearable
            isMulti={true}
            options={options}
        />
    )
}