import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const ButtonStock = ({onClick}: {onClick:()=>void}) => {
    return (
        <button onClick={onClick}  className="text-pink-500 text-2xl hover:text-pink-700 mr-2">
        <FontAwesomeIcon icon={faCircleMinus}/>
        </button>
    );
};