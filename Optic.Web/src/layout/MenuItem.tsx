import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

export const MenuItem = ({ path, icon, text }: { path: string, icon: IconDefinition, text: string }) => {
    return (
        <li className="block pb-2">
            <NavLink
                to={path}
                className={({ isActive, isPending }) =>
                    isPending ? "h-20 w-15 flex flex-col items-center rounded-lg p-2 bg-gray-200 text-gray-700" :
                        isActive ? "h-20 w-15 flex flex-col items-center rounded-lg p-2 bg-red-200 text-red-400" : "h-20 w-15 flex flex-col items-center rounded-lg p-2 bg-gray-200 text-gray-700"
                }
            >
                <FontAwesomeIcon
                    icon={icon}
                    className="h-7 w-14 flex flex-col items-center rounded-lg p-1"
                />
                <span className="mt-1 font-semibold text-gray-900">{text}</span>
            </NavLink>
        </li>
    )
}
