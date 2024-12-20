import ButtonNavigation from "../../shared/components/Buttons/ButtonNavigation";
import { useProducts } from "../Products/useProducts";
export const ProductoCard = () => {
    const { products } = useProducts();
    return (
        <div className="bg-white rounded-lg shadow p-4 ">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                <h2 className="text-lg font-bold">Productos</h2>
            </div>
            {products?.map((product) => (
                <div key={product.id}>
                    <div className="space-y-1">
                        <div className="rounded-lg border border-grey-500 p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-bold text-plurple-500">#00050</p>
                                <p className=" text-sm font-bold text-purple-500">{product.quantity}</p>
                            </div>

                            <div className="flex justify-between ">
                                <p className="text-sm font-bold">{product.name}</p>
                                <i className="fas fa-play text-gray-500"></i>
                            </div>
                            <p className=" text-gray-500">Fecha:24/03/2024</p>
                        </div>
                    </div>
                    <div className="rounded-lg border border-grey-500 p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-bold text-plurple-500">#00050</p>
                            <p className=" text-sm font-bold text-purple-500">{product.quantity}</p>
                        </div>

                        <div className="flex justify-between ">
                            <p className="text-sm font-bold">{product.name}</p>
                            <i className="fas fa-play text-gray-500"></i>
                        </div>
                        <p className=" text-gray-500">Fecha:24/03/2024</p>
                    </div>
                </div>
            ))}
            <div className="flex justify-center mt-20">
                <ButtonNavigation />
            </div>
        </div>

    )
}