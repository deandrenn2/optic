import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const DetailButton = ({ url }: { url: string }) => {
    return (
        <Link
            to={url}
            title="Ver detalle"
            className="text-blue-500 mr-10 text-2xl hover:text-blue-700"
        >
            <FontAwesomeIcon icon={faPlay} />
        </Link>
    );
};

export default DetailButton;