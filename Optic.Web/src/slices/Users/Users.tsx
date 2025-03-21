import { useLogin } from "../../routes/Login/useLogin";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { useState } from "react";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { UsersForm } from "./UsersForm"; // Formulario de actualización
import { UsersCreateForm } from "./UsersCreate"; // Formulario de creación
import { Bar } from "../../shared/components/Progress/Bar";
import { UsersModel, UsersResponseModel } from "./UsersModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";

export const Users = () => {
    const [visible, setVisible] = useState(false);
    const { users, queryUsers } = useLogin();
    const [selectedUser, setSelectedUser] = useState<UsersResponseModel | null>(null);
    const [seleCreating, setSeleCreating] = useState(false);

    function handleClose(): void {
        setVisible(false);
        setSelectedUser(null);
        setSeleCreating(false);
    }

    function handleEdit(user: UsersModel): void {
        setSelectedUser(user);
        setSeleCreating(false);
        setVisible(true);
    }

    function handleCreate(): void {
        setSelectedUser(null);
        setSeleCreating(true);
        setVisible(true);
    }

    if (queryUsers.isLoading) return <Bar Title="Cargando..." />;

    return (
        <div>
            <div className="flex space-x-4 mb-2">
                <button
                    type="button"
                    onClick={handleCreate}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold flex items-center"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" /> Nuevo Usuario
                </button>
            </div>
            {/* Tabla de Usuarios */}
            <div className="rounded-lg border border-grey-500 mb-4 w-full">
                <table className="bg-white rounded shadow w-full">
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
                                <td className="border border-gray-300 p-2 text-center">
                                    {user.firstName + " " + user.lastName}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    {user.email}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <FontAwesomeIcon
                                        icon={faPencil}className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => handleEdit(user)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <OffCanvas
                titlePrincipal={seleCreating ? "Registrar Usuario" : "Actualizar Usuario"}
                visible={visible}
                xClose={handleClose}
                position={Direction.Right}
            >
              {selectedUser ? <UsersForm id={selectedUser.id} /> : <UsersCreateForm />}
            </OffCanvas>
        </div>
    );
};
