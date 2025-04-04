import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
export const ButtonDelete = ({ id, onDelete }: { id: number; onDelete: any }) => {
  return (
    <button className="text-red-500 text-2xl hover:text-red-700 mr-2"
      onClick={(e) => onDelete(e, id)}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
};
export default ButtonDelete;


