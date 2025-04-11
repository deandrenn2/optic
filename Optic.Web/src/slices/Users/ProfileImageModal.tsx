import { useUserAvatar } from "./useUsers";
import useUserContext from "../../shared/context/useUserContext";

export const ProfileImageModal = ({ onClose }: { onClose: () => void }) => {
    const { setAvatar } = useUserAvatar();
    const { user } = useUserContext();
    const items = [];
    for (let i = 1; i < 21; i++) {
        items.push(i);
    }

    const handleClick = async (idAvatar: number) => {
        await setAvatar.mutateAsync({ id: user?.id, idAvatar: idAvatar });
        onClose();
    }
    return (
        <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Cambiar Perfil</h2>
                <form className="bg-white w-full">
                    <div className="mb-4">
                        <div className="grid grid-cols-4 gap-7 justify-items-center justify-between items-center ">
                            {
                                items.map((item) => (
                                    <img
                                        key={item}
                                        src={`${import.meta.env.BASE_URL}images/avatars/bigSmile-${item}.svg`}
                                        alt="logo"
                                        onClick={() => handleClick(item)}
                                        className="min-w-16 rounded-lg w-20 h-20 cursor-pointer hover:transition-all hover:scale-110"
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400">
                            Cerrar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
};




