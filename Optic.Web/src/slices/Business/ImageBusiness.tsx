import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BusinessResponseModel } from "../../routes/Businesses/BusinessModel";
import { uploadBusinessLogo } from "../../routes/Businesses/BusinessServices";
import useUserContext from "../../shared/context/useUserContext";

export const ImageBusiness = ({ business }: { business: BusinessResponseModel | null }) => {
    const defaultLogo = `${import.meta.env.BASE_URL}initials-logo.svg`;
    const {  setBusiness } = useUserContext();
    const [imagePreview, setImagePreview] = useState<string>(
        business?.urlLogo
            ? `${import.meta.env.VITE_API_URL}static/logos/${business.urlLogo}`
            : defaultLogo
    );
    const [isUploading, setIsUploading] = useState<boolean>(false);

    useEffect(() => {
        if (business?.urlLogo) {
            setImagePreview(`${import.meta.env.VITE_API_URL}static/logos/${business.urlLogo}`);
        } else {
            setImagePreview(defaultLogo);
        }
    }, [business?.urlLogo]);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !business?.id) return;

        const tempUrl = URL.createObjectURL(file);
        setImagePreview(tempUrl);
        setIsUploading(true);

        try {
            const response = await uploadBusinessLogo(business.id, file);
            
            if (response.isSuccess && response.data) {
                setImagePreview(`${import.meta.env.VITE_API_URL}static/logos/${response.data}`);
                setBusiness({...business,urlLogo: response.data })
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="relative bottom-40 left-40">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-teal-500 font-bold">Logo</h3>
                <label
                    htmlFor="file-upload"
                    className="block border-2 border-dashed border-gray-500 rounded-lg p-1 cursor-pointer hover:border-blue-500 m-4 w-60 h-30"
                >
                    <div>
                        <img
                            src={imagePreview}
                            className="w-60 h-32 object-cover rounded-lg"
                            onError={(e) => {
                                e.currentTarget.onerror = null; // Previene bucles infinitos
                                e.currentTarget.src = defaultLogo;
                            }}
                        />
                    </div>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUploading}
                />
                <button
                    className="bg-teal-500 text-white px-4 py-3 rounded-md shadow-md hover:bg-teal-400"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    disabled={isUploading}
                >
                    {isUploading ? "Subiendo..." : <FontAwesomeIcon icon={faCamera} />}
                </button>
            </div>
        </div>
    );
};
