import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const DetailButton = ({ onDetail }: { onDetail: number }) => {
    return (
        <Link
            to={`/Clientes/${onDetail}`}
            title="Ver detalle"
            className="text-blue-500 mr-10 text-2xl hover:text-blue-700"
        >
            <FontAwesomeIcon icon={faPlay} />
        </Link>
    );
};

export default DetailButton;