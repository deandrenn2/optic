import { useState } from "react";
import useUserContext from "../../shared/context/useUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export const Business = () => {
    const [hasError] = useState<string>('');
    const { business } = useUserContext();

    return (
        <div className="w-full flex justify-center items-center">
            <form
                className=" bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-5 grid gap-2">
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
                            value={business?.companyName}
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
                            value={business?.abbreviation}
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
                            value={business?.nit}
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
                            value={business?.city}
                            required
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
                            required
                            name="address"
                            value={business?.address}
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
                            value={business?.cellPhoneNumber}
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
                            value={business?.phoneNumber}
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Telefóno"
                        />
                    </div>
                </div>

                <div>
                    <div className="text-sm text-center pt-2 text-red-600 hover:text-blue-500">
                        <span>
                            <a href="">{hasError && hasError}</a>
                        </span>
                    </div>
                </div>
                <div className=" flex justify-start">
                    <button type="submit" className=" bg-teal-500 text-white px-4 py-3 rounded-md shadow-md flex items-center hover:bg-teal-400">
                        <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

