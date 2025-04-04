import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
const DetailButton = ({ url, className }: { url: string, className?: string }) => {
    return (
        <Link
            to={url}
            className={className || "text-blue-500 text-2xl hover:text-blue-700 mr-2"}>
        <FontAwesomeIcon icon={faPlay} />
        </Link>
    );
};
export default DetailButton;