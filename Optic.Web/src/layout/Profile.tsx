import { faEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useUserContext from "../shared/context/useUserContext";
import { Link } from "react-router-dom";

export const Profile = () => {
    const { user, setToken, setIsAuthenticated } = useUserContext();

    const handleLogout = () => {
        setToken(null);
        setIsAuthenticated(false);
        window.location.reload();
    }
    return (
        <div className="absolute top-20 right-2 text-black-500 bg-opacity-50">
            <div className="max-w-sm mx-auto bg-gray-800 rounded-b-lg overflow-hidden shadow-lg">
                <div className="p-4">
                    <div className="flex justify-between items-center">

                        <button className="absolute right-9">
                            <i className="fas fa-pen text-white"></i>
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <img
                            src={`${import.meta.env.BASE_URL}images/avatars/bigSmile-${user?.idAvatar}.svg`}
                            alt="logo"
                            className="min-w-16 rounded-full w-20 h-20"
                        />
                    </div>
                </div>
                <div className="px-4 text-center">
                    <h3 className="text-white font-semibold">
                        {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-white text-xs">{user?.email}</p>
                </div>
                <div className="flex align-middle justify-center p-4 space-x-1">

                    <div onClick={handleLogout} className="flex items-center space-x-2 mt-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
                        <i className="fas fa-sign-out-alt text-gray-400"></i>
                        <FontAwesomeIcon icon={faSignOutAlt} className="text-white" />
                        <button className="text-gray-400 "> Salir</button>
                    </div>

                    <div className="flex items-center space-x-2 mt-2  hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
                         <Link 
                              to="/Users/Edit"
                                className="flex items-center space-x-2 mt-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
                             <i className="fas fa-sign-out-alt text-gray-400"></i>
                             <FontAwesomeIcon icon={faEdit} className="text-white" />
                             <span className="text-gray-400">Editar</span>
                         </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}