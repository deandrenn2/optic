import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
 export const ButtonStockAdd = ({onClick}: {onClick: () => void}) => {
     return (
         <button onClick={onClick} className="text-blue-500 text-2xl hover:text-blue-700 mr-2">
             <FontAwesomeIcon icon={faCirclePlus} />
         </button>
     )
 }