import { useEffect, useState } from "react";
import useUserContext from "../../shared/context/useUserContext";
import { useBusiness } from "../../routes/Businesses/useBusiness";
export const Business = () => {
    const [hasError] = useState<string>('');
    const { business } = useUserContext();
    const { updateBusiness } = useBusiness();
    const [form, setForm] = useState({
        id: 0, 
        companyName: "",
        abbreviation: "",
        nit: "",
        city: "",
        address: "",
        cellPhoneNumber: "",
        phoneNumber: "",
    });
    useEffect(() => {
        if (business) {
            setForm({
                id: 0,
                companyName: business.companyName,
                abbreviation: business.abbreviation,
                nit: business.nit,
                
                city: business.city,
                address: business.address,
                cellPhoneNumber: business.cellPhoneNumber,
                phoneNumber: business.phoneNumber,
            });
        }
    }, [business]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBusiness.mutateAsync(form);
        console.log("Formulario actualizado:", form);
    };

    return (
        <div className="w-full flex justify-center items-center">
            <form onSubmit={handleSubmit} className=" bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-5 grid gap-2">
                <div className="relative flex items-center justify-center">
                    <div className="shrink-0 ">
                        <img
                            src={`${import.meta.env.BASE_URL}initials-logo.svg`}
                            alt="logo"
                            className="h-full w-16 rounded-lg"
                        />
                    </div>
                </div>
                <h2 className="text-3xl font-bold mb-2 text-center">
                    <span>{business?.companyName}</span>
                </h2>
                <div>
                    <label
                        htmlFor="comapanyNameTxt"
                        className="block text-gray-600 text-sm font-bold mb-2"
                    >
                        Nombre
                    </label>
                    <div className="relative">
                        <input
                            id="comapanyNameTxt"
                            name="companyName"
                            value={form?.companyName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nombre"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="comapanyNameTxt"
                        className="block text-gray-600 text-sm font-bold mb-2"
                    >
                        Abreviatura
                    </label>
                    <div className="relative">
                        <input
                            id="abbreviationTxt"
                            name="abbreviation"
                            value={form?.abbreviation}
                            onChange={handleInputChange}
                            required
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Abreviatura"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="nitTxt"
                        className="block text-gray-600 text-sm font-bold mb-2"
                    >
                        NIT
                    </label>
                    <div className="relative">
                        <input
                            id="nitTxt"
                            name="nit"
                            value={form?.nit}
                            onChange={handleInputChange}
                            required
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nit"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="cityTxt"
                        className="block text-gray-600 text-sm font-bold mb-2"
                    >
                        Ciudad
                    </label>
                    <div className="relative">
                        <input
                            id="cityTxt"
                            name="city"
                            value={form?.city}
                            onChange={handleInputChange}
                           
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ciudad"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="addressTxt"
                        className="block text-gray-600 text-sm font-bold mb-2"
                    >
                        Dirección
                    </label>
                    <div className="relative">
                        <input
                            id="addressTxt"
                            name="address"
                            value={form?.address}
                            onChange={handleInputChange}
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Dirección"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="cellPhoneNumberTxt"
                        className="block text-gray-600 text-sm font-bold mb-2"
                    >
                        Linea celular
                    </label>
                    <div className="relative">
                        <input
                            id="cellPhoneNumberTxt"
                            name="cellPhoneNumber"
                            required
                            value={form?.cellPhoneNumber}
                            onChange={handleInputChange}
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Linea celular"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="phoneNumberTxt"
                        className="block text-gray-600 text-sm font-bold mb-2"
                    >
                        Telefóno
                    </label>
                    <div className="relative">
                        <input
                            id="phoneNumberTxt"
                            name="phoneNumber"
                            value={form?.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Telefóno"
                        />
                    </div>
                </div>
                <div>
                    <div className="text-sm text-center  text-red-600 hover:text-blue-500">
                        <span>
                            <a href="">{hasError && hasError}</a>
                        </span>
                    </div>
                </div>
                <div className="mt-4">                
                    <button type="submit" disabled={updateBusiness.isPending} className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                        {updateBusiness.isPending ? "Actualizando..." : "Actualizar"}
                    </button>
                </div>
            </form>
        </div>
    );
};

