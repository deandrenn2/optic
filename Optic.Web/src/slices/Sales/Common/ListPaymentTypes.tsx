import { useEffect, useState } from "react";
import { listPymentTypes } from "./ListServices";

export const ListPaymentTypes = ({ selectedValue, name, className, xChange, required }: { selectedValue?: string, name?: string, className?: string, xChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, required?: boolean }) => {
    const [paymentTypes, setPaymentTypes] = useState<string[]>([]);


    useEffect(() => {
        getPaymentTypes();
    }, [selectedValue]);

    const getPaymentTypes = async () => {
        const res = await listPymentTypes();
        setPaymentTypes(res);
    }


    return <select
        name={name || 'idBrand'}
        className={className || 'w-auto border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'}
        value={selectedValue}
        onChange={xChange}
        required={required}
    >
        <option value="">Seleccione</option>
        {paymentTypes?.map((x) => (
            <option value={x} key={x}>{x}</option>
        ))}
    </select>
};  