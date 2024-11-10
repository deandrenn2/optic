import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faUser, faUsers, faGear, faTruck, faMoneyCheckDollar, faClipboardCheck } from "@fortawesome/free-solid-svg-icons"
export const Sidebar = () => {
    return (
        <div id="sidebar" className=" bg-white  p-4 bg-gray-100 border-r">
            <nav>
                <ul className="space-y-1">
                    <li className="flex flex-col items-center rounded-lg p-1" >
                        <a href={`/`} className="h-20 w-15 flex flex-col items-center rounded-lg p-4">
                        <FontAwesomeIcon icon={faHouse} className="h-20 w-14 flex flex-col items-center rounded-lg p-1" />
                        <span className="mt-1 font-bold">Inicio</span>
                        </a>
                    </li>
                    <li className="flex flex-col items-center rounded-lg p-1">
                        <a href={`/clients`} className="flex flex-col items-center rounded-lg p-1">
                        <FontAwesomeIcon icon={faUser}  className="h-20 w-14 flex flex-col items-center rounded-lg p-1" />
                        <span className="mt-1 font-bold">Clientes</span>
                        </a>
                    </li>
                    <li className="flex flex-col items-center rounded-lg p-1">
                        <a href={`/Suppliers`} className="flex flex-col items-center rounded-lg p-1">
                        <FontAwesomeIcon icon={faUsers}  className="h-20 w-14 flex flex-col items-center rounded-lg p-1" />
                            <span className="mt-1 font-bold">Proveedores</span>
                        </a>
                    </li>
                    
                    <li className="flex flex-col items-center rounded-lg p-1">
                        <a href={`/`} className="flex flex-col items-center rounded-lg p-1">
                        <FontAwesomeIcon icon={faTruck}  className="h-20 w-14 flex flex-col items-center rounded-lg p-1" />
                            <span className="mt-1 font-bold">Productos</span>
                        </a>
                    </li>

                    <li className="flex flex-col items-center rounded-lg p-1">
                        <a href={`/`} className="flex flex-col items-center rounded-lg p-1">
                        <FontAwesomeIcon icon={faClipboardCheck}   className="h-20 w-14 flex flex-col items-center rounded-lg p-1" />
                            <span className="mt-1 font-bold">Formulas</span>
                        </a>
                    </li>
                    <li className="flex flex-col items-center rounded-lg p-1">
                        <a href={`/proveedores`} className="flex flex-col items-center rounded-lg p-1">
                        <FontAwesomeIcon icon={faMoneyCheckDollar}  className="h-20 w-14 flex flex-col items-center rounded-lg p-1" />
                            <span className="mt-1 font-bold">Facturación</span>
                        </a>
                    </li>
                    <li className="flex flex-col items-center rounded-lg p-1">
                        <a href={`/proveedores`} className="flex flex-col items-center rounded-lg p-1">
                        <FontAwesomeIcon icon={faGear}  className="h-20 w-14 flex flex-col items-center rounded-lg p-1" />
                            <span className="mt-1 font-bold">Configuraciónes</span>
                        </a>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
