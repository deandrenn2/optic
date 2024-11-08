import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
export const Sidebar = () => {
    return (
        <div id="sidebar" className="w-1/6 bg-white h-screen p-4 bg-gray-100 border-r">
            <nav>
                <ul className="space-y-1">
                    <li className="flex flex-col items-center rounded-lg p-1">
                        <a href={`/contacts/1`} className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faHouse} className=" h-20 w-15 flex flex-col items-center rounded-lg p-1" />
                        <span className="text-center font-bold h-10 mt-">Inicio</span>
                        </a>
                    </li>

                    <li className="flex flex-col items-center rounded-lg p-1 ml-">
                        <a href={`/contacts/1`} className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faUser}  className=" h-20 w-15 flex flex-col items-center rounded-lg p-1" />
                        <span className="text-center font-bold h-10 mt-">Clientes</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
