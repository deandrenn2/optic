import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
export const DeleteButton = ({ id, onDelete }: { id: number; onDelete: any }) => {
  return (
    <button
        className="text-red-500 text-2xl hover:text-red-700"
      onClick={(e) => onDelete(e, id)}
    >
      <FontAwesomeIcon icon={faCircleMinus} className="ml-2" />
    </button>
  );
};

export default DeleteButton;