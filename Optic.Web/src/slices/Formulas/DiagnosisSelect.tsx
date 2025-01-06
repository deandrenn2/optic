import Select, { SingleValue } from "react-select";
import { useDiagnosis } from "./useFormulas";


export interface Option {
    value?: string;
    label?: string;
}

export const DiagnosisSelect = ({ selectedValue, name, className, xChange, required, isSearchable }: { selectedValue?: Option[], name?: string, className?: string, xChange: (newValue: SingleValue<Option>) => void, required?: boolean, isSearchable?: boolean }) => {
    const { diagnosis, queryDiagnosis } = useDiagnosis();

    const options: readonly Option[] | undefined = diagnosis?.map((item) => ({
        value: item?.id?.toString(),
        label: isSearchable ? `${item.name}` : (item.name),
    }));



    return (
        <Select name={name || 'idClient'} className={className}
            value={selectedValue}
            onChange={xChange}
            required={required}
            loadingMessage={() => 'Cargando...'}
            isDisabled={queryDiagnosis?.isLoading}
            isLoading={queryDiagnosis?.isLoading}
            isClearable
            options={options}
        />
    )
}
