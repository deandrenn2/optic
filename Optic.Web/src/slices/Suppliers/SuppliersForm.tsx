import { useRef, useState } from "react";
import { CreateSupplierModel } from "./SupplierModel";
import { useSupplier } from "./useSupplier";
import { ButtonReset } from "../../shared/components/Buttons/ButtonReset";

export const SuppliersForm = () => {
    const [form, setForm] = useState<CreateSupplierModel>({
        name: '',
        nit: '',
        address: '',
        email: '',
        cellPhoneNumber: '',
        phoneNumber: ''
    });

    const { createSupplier } = useSupplier();

    const formRef = useRef<HTMLFormElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await createSupplier.mutateAsync(form);
        if (res.isSuccess) {
            formRef.current?.reset();
        }

    }

    return (

        <form className="flex flex-col" onSubmit={handleSubmit} ref={formRef} >
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nit
                </label>
                <input
                    required
                    type="text"
                    name="nit"
                    value={form.nit}
                    onChange={handleChange}
                    placeholder="Nit"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Celular
                </label>
                <input
                    type="text"
                    required
                    name="cellPhoneNumber"
                    value={form.cellPhoneNumber}
                    onChange={handleChange}
                    placeholder="Celular"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Dirección
                </label>
                <input
                    type="text"
                    required
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Dirección"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Télefono
                </label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="Télefono"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                    {createSupplier.isPending ? "Creando..." : "Crear Proveedor"}
                </button>
                <ButtonReset />
            </div>
        </form>
    )
}