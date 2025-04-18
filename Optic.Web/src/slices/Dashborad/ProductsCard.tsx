import { formatDistance, parseISO, setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";
import { useProductsPager } from "../Products/useProducts";
import { Link, useLocation } from "react-router-dom";
// Textos de fechas en español
setDefaultOptions({ locale: es });

export const ProductoCard = () => {
    const { products } = useProductsPager();
    const location = useLocation();
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                <h2 className=" font-bold text-gray-500">Productos</h2>
            </div>
            {products?.map((product) => (
                <div key={product.id}>
                    <Link to={`/products/${product.id}`}
                        state={{ fromHome: location.pathname === "/" }}>
                        <div className="space-y-1">
                            <div className="rounded-lg border border-gray-300 p-4 mb-2 hover:border-blue-700  duration-300 hover:bg-yellow-50">
                                <div className="flex justify-between items-center mb-1 cursor-pointer relative  ">
                                    <p className=" font-bold text-gray-500">#{product.codeNumber}</p>
                                    <p className=" font-bold text-purple-500 text-2xl absolute inset-y-5 right-1">{product.quantity}</p>
                                </div>
                                <div className="flex justify-between ">
                                    <p className=" ">{product.name}</p>
                                    <i className="fas fa-play text-gray-500"></i>
                                </div>
                                <p className=" text-gray-500 text-sm">Hace, {formatDistance(new Date(), parseISO(product.updateDate ? product.updateDate.toString() : new Date().toString()))}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};
