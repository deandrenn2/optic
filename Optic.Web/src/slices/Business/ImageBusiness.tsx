import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
export const ImageBusiness = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const habdleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className=" relative bottom-40 left-40">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3>Logo</h3>
                <label
                    htmlFor="file-upload"
                    className="block border-2 border-dashed border-gray-500 rounded-lg p-1 cursor-pointer hover:border-blue-500 m-4 w-60 h-30"
                >
                    <div className="">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Previsualización"
                                className="w-60 h-40 object-cover rounded-lg" />
                        ) : (
                            <>
                                <p className="text-gray-600 text-sm">o haz clic para seleccionar</p>
                            </>
                        )}
                    </div>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={habdleImageChange} />
                <button className=" bg-teal-500 text-white px-4 py-3 rounded-md shadow-md mr-4 hover:bg-teal-400 ">
                    <FontAwesomeIcon icon={faCamera} />
                </button>
            </div>
        </div>
    )
}