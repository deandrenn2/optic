import { useEffect, useRef, useState } from "react";
import { SupplierModel, SuppliersResponseModel } from "./SupplierModel";
import { useSupplier } from "./useSupplier";
import { ButtonReset } from "../../shared/components/Buttons/ButtonReset";

export const SuppliersForm = ({ id }: { id?: number }) => {
    const [form, setForm] = useState<SupplierModel | SuppliersResponseModel>({
        id: id,
        name: '',
        nit: '',
        address: '',
        email: '',
        cellPhoneNumber: '',
        phoneNumber: ''
    });

    const { createSupplier, suppliers, updateSupplier } = useSupplier();

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (id) {
            const supplier = suppliers?.find((supplier) => supplier.id === id);
            if (supplier) {
                setForm(supplier);
            }
        }
    }, [id, suppliers]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (id) {
            await updateSupplier.mutateAsync(form);
        } else {
            const res = await createSupplier.mutateAsync(form);
            if (res.isSuccess) {
                setForm({
                    name: '',
                    nit: '',
                    address: '',
                    email: '',
                    cellPhoneNumber: '',
                    phoneNumber: ''
                });
                formRef.current?.reset();
            }
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
                    className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                    className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                    className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                    className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                {id &&
                    <button disabled={updateSupplier.isPending} className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                        {updateSupplier.isPending ? "Actualizando..." : "Actualizar Proveedor"}
                    </button>
                }
                {
                    !id &&
                    <>
                        <button disabled={updateSupplier.isPending} className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                            {createSupplier.isPending ? "Creando..." : "Crear Proveedor"}
                        </button>
                        <ButtonReset />
                    </>
                }

            </div>
        </form>
    )
}