import { faEraser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ButtonReset = () => {  
    return (
        <button type="reset" className="bg-gray-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">
            <FontAwesomeIcon icon={faEraser} />
        </button>
    )
}