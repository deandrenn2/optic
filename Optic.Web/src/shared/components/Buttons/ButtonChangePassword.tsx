import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const ButtonChangePassword = ({ onClick, className }: { onClick: () => void, className?: string }) => {
    return (
        <button
            onClick={onClick}
            title="Cambiar contraseña"
            className={className || "text-blue-500 text-2xl hover:text-blue-700"}
        >
            <FontAwesomeIcon icon={faLock} />
        </button>
    );
};

export default ButtonChangePassword;

