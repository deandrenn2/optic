import { useEffect, useRef, useState } from "react";
import { UsersModel, UsersResponseModel } from "./UsersModel";
import { useUsers } from "./useUsers";

export const UsersForm = ({ id }: { id?: number }) => {
    const [form, setForm] = useState<UsersModel | UsersResponseModel>({
        id: id,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        securePharse: '',
    });

    const { createUser, updateUsers, users } = useUsers();
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (id) {
            const user = users?.find((user) => user.id === id);
            if (user) {
                setForm(user);
            }
        }
    }, [id, users]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (id) {
            await updateUsers.mutateAsync(form);
        } else {
            const res = await createUser.mutateAsync(form);
            if (res.isSuccess) {
                setForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    securePharse: '',
                });
                formRef.current?.reset();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="  ">
            <div>
                <label
                    htmlFor="namesTxt"
                    className="block text-gray-600 text-sm font-bold mb-2">
                    Nombres
                </label>
                <div className="relative">
                    <input
                        id="namesTxt"
                        name="firstName"
                        value={form?.firstName}
                        onChange={(e) => handleChange(e)}
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombres"
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor="lastNameTxt"
                    className="block text-gray-600 text-sm font-bold mb-2"
                >
                    Apellidos
                </label>
                <div className="relative">
                    <input
                        id="lastNameTxt"
                        name="lastName"
                        value={form?.lastName}
                        onChange={(e) => handleChange(e)}
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Apellidos"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-gray-600 text-sm font-bold mb-2"
                >
                    Email
                </label>
                <div className="relative">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form?.email}
                        onChange={(e) => handleChange(e)}
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Correo electrónico"
                    />
                </div>
            </div>
            <div className="mt-4">
                {id &&
                    (
                        <button type="submit" disabled={updateUsers.isPending} className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                            {updateUsers.isPending ? "Actualizar Usuarios" : "Actualizar Usuario"}
                        </button>
                    )}
            </div>
        </form>
    );
}