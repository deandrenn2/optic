import { useEffect, useState } from "react";
import { getStatusInvoice } from "./ListServices";
export const ListStatus = ({ selectedValue, name, className, xChange, required, status }: { selectedValue?: string, name?: string, className?: string, xChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, required?: boolean, status: string }) => {
    const [listStatus, setStatus] = useState<string[]>([]);

    const getStatus = async () => {
        const resStatus = await getStatusInvoice(status);
        setStatus(resStatus);
    }

    useEffect(() => {
        getStatus();
    }, [status]);


    return <select
        name={name || 'idBrand'}
        className={className || 'w-auto border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'}
        value={selectedValue}
        onChange={xChange}
        required={required}
    >
        <option value="">Seleccione</option>
        {listStatus?.map((x) => (
            <option value={x} key={x}>{x}</option>
        ))}
    </select>
};
