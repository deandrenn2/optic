import { useState } from "react";
import useUserContext from "../../shared/context/useUserContext";
import { useBusiness } from "../../routes/Businesses/useBusiness";
import { ImageBusiness } from "./ImageBusiness";
export const Business = () => {
    const [hasError, setHasError] = useState<string>('');
    const { business, setBusiness } = useUserContext();
    const { updateBusiness } = useBusiness();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (business)
            setBusiness({
                ...business,
                [name]: value,
            });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (business)
                await updateBusiness.mutateAsync(business);
            setHasError('');
        } catch (error: any) {
            setHasError("");
            console.log(Business);
        }
    };

    return (
        <div className="w-full flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-5 grid gap-2"
            >
                <div className="relative flex items-center justify-center">
                    <div className="shrink-0">
                        <img
                            src={business?.urlLogo ? `${import.meta.env.VITE_API_URL}static/logos/${business.urlLogo}` : `${import.meta.env.BASE_URL}initials-logo.svg`}
                            alt="logo"
                            className="h-full w-20 rounded-lg"
                        />
                    </div>
                </div>

                <h2 className="text-3xl font-bold mb-2 text-center">
                    <span>{business?.companyName}</span>
                </h2>

                <div>
                    <label htmlFor="companyName" className="block text-gray-600 text-sm font-bold mb-2">
                        Nombre
                    </label>
                    <input
                        id="companyName"
                        name="companyName"
                        value={business?.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre"
                    />
                </div>

                <div>
                    <label htmlFor="abbreviation" className="block text-gray-600 text-sm font-bold mb-2">
                        Abreviatura
                    </label>
                    <input
                        id="abbreviation"
                        name="abbreviation"
                        value={business?.abbreviation}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Abreviatura"
                    />
                </div>

                <div>
                    <label htmlFor="nit" className="block text-gray-600 text-sm font-bold mb-2">
                        NIT
                    </label>
                    <input
                        id="nit"
                        name="nit"
                        value={business?.nit}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nit"
                    />
                </div>

                <div>
                    <label htmlFor="city" className="block text-gray-600 text-sm font-bold mb-2">
                        Ciudad
                    </label>
                    <input
                        id="city"
                        name="city"
                        value={business?.city}
                        onChange={handleInputChange}
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ciudad"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-gray-600 text-sm font-bold mb-2">
                        Dirección
                    </label>
                    <input
                        id="address"
                        name="address"
                        value={business?.address}
                        onChange={handleInputChange}
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Dirección"
                    />
                </div>

                <div>
                    <label htmlFor="cellPhoneNumber" className="block text-gray-600 text-sm font-bold mb-2">
                        Línea celular
                    </label>
                    <input
                        id="cellPhoneNumber"
                        name="cellPhoneNumber"
                        value={business?.cellPhoneNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Línea celular"
                    />
                </div>

                <div>
                    <label htmlFor="phoneNumber" className="block text-gray-600 text-sm font-bold mb-2">
                        Teléfono
                    </label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={business?.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Teléfono"
                    />
                </div>
                {hasError && (
                    <div className="text-sm text-center text-red-600 mt-2">
                        {hasError}
                    </div>
                )}
                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={updateBusiness.isPending}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">
                        {updateBusiness.isPending ? "Actualizando..." : "Actualizar"}
                    </button>
                </div>
            </form>
            <ImageBusiness business={business}/>
        </div>
    );
};
