import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash  } from '@fortawesome/free-solid-svg-icons';
export const ButtonDelete = ({ id, onDelete }: { id: number; onDelete: any }) => {
  return (
    <button
        className="text-red-500 text-2xl hover:text-red-700"
      onClick={(e) => onDelete(e, id)}
    >
      <FontAwesomeIcon icon={faTrash} />
      </button>
  );
};

export default ButtonDelete;


