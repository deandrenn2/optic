
import { useLogin } from "../../routes/Login/useLogin";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { useState } from "react";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { SettingsForm } from "./UsersCreate";
import DetailButton from "../../shared/components/Buttons/ButtonDetail";
import { Bar } from "../../shared/components/Progress/Bar";

export const Users = () => {
    const [visible, setVisible, ] = useState(false);

    const { users, queryUsers } = useLogin();

    function handleClose(): void {
        setVisible(false);
    }

    if (queryUsers.isLoading)
        return <Bar Title="Cargando..." />;

    return (
        <div>
            <div className="flex space-x-4 mb-2">
                <div className="mb-2">
                    <button type='button' onClick={() => setVisible(true)} className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">Nuevo Usuario</button>
                </div>
            </div>
                     {/* <!-- TABLA DE USUARIO --> */}
            <div className="rounded-lg border border-grey-500 mb-4 w-full ">
                <table className=" bg-white rounded shadow w-full">
                    <thead>
                        <tr>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user.id}>
                                <td className="border border-gray-300 p-2 text-center">{user.firstName + ' ' + user.lastName}</td>
                                <td className="border border-gray-300 p-2 text-center">{user.email}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <DetailButton url={`/Settings/Users/${user.id}`} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <OffCanvas titlePrincipal='Registro de Usuario' visible={visible} xClose={handleClose} position={Direction.Right} >
                <SettingsForm />
            </OffCanvas>
        </div>

    )
};

