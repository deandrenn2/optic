import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

interface DetailButtonProps {
  url: string;
  state?: any;
  className?: string;
}

const DetailButton = ({ url, state, className }: DetailButtonProps) => {
  return (
    <Link
      to={url}
      state={state}
      className={className || "text-blue-500 text-2xl hover:text-blue-700 mr-2"}
    >
      <FontAwesomeIcon icon={faPlay} />
    </Link>
  );
};

export default DetailButton;