import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { UsersEdit } from "./UsersEdit";

export const SettingsDetail = () => {
    const { id } = useParams();
    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-4">
                <Link to={"/Settings/Users"} title='Volver al listado de usuarios' className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                    <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        className="fa-search top-3 pr-2 font-bold"
                    />Volver al listado de usuarios</Link>
            </div>
            <div className="w-1/4 bg-white p-4 rounded-lg">
                <UsersEdit id={Number(id)} />
            </div>
        </div>
    )
};