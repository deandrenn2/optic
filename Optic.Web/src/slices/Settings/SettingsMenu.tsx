import { faCog, faPerson, faUser, } from "@fortawesome/free-solid-svg-icons";

import { NavVerticalItemModel } from "../../shared/components/Navigation/Model";
import NavVertical from "../../shared/components/Navigation/NavVertical";
import { Outlet } from "react-router-dom";

export const SettingsMenu = () => {

    const navBarImportar: NavVerticalItemModel[] = [
        {
            id: 1,
            name: 'Usuarios',
            description: 'Registro de usuarios',
            url: '/Settings',
            fontIcon: faUser,
            titleSection: 'Usuarios',
            active: true,
        },
        {
            id: 2,
            name: 'Tipos de Identificación',
            description: 'Configuración de tipos de identificación.',
            url: '/Settings/IdentificationTypes',
            titleSection: 'Tipos de Identificación',
            fontIcon: faPerson,
        },
        {
            id: 3,
            name: 'Configuraciones',
            description: 'Configuraciones generales del sistema.',
            url: '/Settings/Config',
            titleSection: 'Configuraciones',
            fontIcon: faCog,
        },
    ];

    return (

        <div className="w-full p-4">
            <div className="grid grid-cols-12 gap-4 w-full">
                <div className="col-start-1 col-end-2">
                    <NavVertical title="Menú de Configuración" items={navBarImportar} />
                </div>
                <div className="col-start-3 col-end-12">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};

