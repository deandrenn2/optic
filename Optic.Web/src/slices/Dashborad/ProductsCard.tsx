import { formatDistance, parseISO, setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";
import { useProductsPager } from "../Products/useProducts";
import { useLocation, Link } from "react-router-dom";

// Textos de fechas en español
setDefaultOptions({ locale: es });

export const ProductoCard = () => {
    const { products } = useProductsPager();
    const location = useLocation();
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                <h2 className="text-lg font-bold">Productos</h2>
            </div>
            {products?.map((product) => (
                <div key={product.id} className="relative">
                    <Link
                        to={`/products/${product.id}`}
                        state={{ fromHome: location.pathname === "/" }} 
                        className="block rounded-lg border border-gray-400 p-4 mb-2 cursor-pointer hover:bg-gray-100"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-bold text-purple-500">#{product.codeNumber || "###"}</p>
                            <p className="text-2xl font-bold text-purple-500">{product.quantity}</p>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-sm font-bold">{product.name}</p>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Hace {formatDistance(new Date(), parseISO(product.updateDate ? product.updateDate.toString() : new Date().toString()))}
                        </p>
                    </Link>
                </div>
            ))}
        </div>
    );
};
