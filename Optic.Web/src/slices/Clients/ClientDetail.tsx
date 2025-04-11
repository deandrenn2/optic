import { Link, useLocation, useParams } from "react-router-dom";
import { ClientForm } from "./ClientForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { ClientStory } from "./ClientStory";
export const ClientDetail = () => {
    const { id } = useParams();
    const  location = useLocation();
    const fronHome = location.state?.fromHome;
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-start mb-4">
                <Link
                    to={fronHome?"/":"/Clientes"}
                    title='Volver al listado de clientes'
                    className="bg-gray-300 hover:bg-gray-300 text-gray-700 hover:text-gray-800 border border-gray-400 hover:border-gray-600 px-4 py-2 rounded font-bold flex items-center transition-all"
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft}
                     className="mr-2" />
                    {fronHome ? "Volver" : "Volver"}
                </Link>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-start gap-4 ">
                <div className="w-full lg:w-1/4 bg-white p-3 rounded-lg shadow">
                    <ClientForm id={Number(id)} />
                </div>
                <div className="w-full lg:w-2/3">
                    <ClientStory />
                </div>
            </div>
        </div>
    );
};


