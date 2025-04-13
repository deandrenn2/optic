import OffCanvas from "../../shared/components/OffCanvas/Index";
import { useState } from "react";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { UsersForm } from "./UsersForm";
import { UsersCreateForm } from "./UsersCreate";
import { Bar } from "../../shared/components/Progress/Bar";
import ButtonChangePassword from "../../shared/components/Buttons/ButtonChangePassword";
import DetailPasswordModel from "./DetailChangePassword";
import { UsersResponseModel } from "./UsersModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { UserResponseModel } from "../../routes/Login/LoginModel";
import useUsers from "./useUsers";
export const Users = () => {
    const [visible, setVisible,] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UsersResponseModel | UserResponseModel | null>(null);
    const { users, queryUsers } = useUsers();
    const [seleCreating, setSeleCreating] = useState(false);
    const [showPasswordModel, setShowPasswordModel] = useState(false);
    function handleClose(): void {
        setVisible(false);
        setSelectedUser(null);
        setSeleCreating(false);
        setShowPasswordModel(false);
    }
    const handleEdit = (user: UserResponseModel): void => {
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
                            <tr key={user.id} className="hover:bg-pink-200">
                                <td className="border border-gray-300 p-2 text-center">
                                    {user.firstName + " " + user.lastName}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    {user.email}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <FontAwesomeIcon
                                        icon={faPencil} className="text-blue-500 hover:text-blue-700 cursor-pointer text-2xl mr-4" onClick={() => handleEdit(user)} />
                                    {/* Pasamos la función para abrir el modal con el usuario seleccionado */}
                                    <ButtonChangePassword onClick={() => {
                                        setSelectedUser(user)
                                        setShowPasswordModel(true);
                                    }}
                                    />
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
            {/* MODAL */}
            {showPasswordModel && selectedUser &&
                (<DetailPasswordModel user={selectedUser} onClose={handleClose} />)}
        </div>
    )
};