import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { QuantitykModel } from "../../../slices/Products/QuantitykModel";
export const QuantitykButton = ({}: { id: number, onStock: any }) => {
    const [ isOpen, setIsOpen ] = useState(false);
    
    return (
        <div>
         <button onClick={() => setIsOpen(true)} className="text-pink-500 text-2xl hover:text-pink-700">
        <FontAwesomeIcon icon={faCircleMinus} className="ml-2" />
        </button>
        {isOpen && <QuantitykModel onClose={() => setIsOpen(false)} />}
        </div>
        
    );
};