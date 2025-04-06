import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ButtonSave = () => {
    return (
        <button type="submit" className="mr-2 bg-teal-500 text-white px-4 py-3 rounded-md shadow-md flex items-center hover:bg-teal-400">
            <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />Guardar
        </button>
    );
};
export default ButtonSave;