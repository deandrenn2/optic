import { formatDistance, parseISO } from "date-fns";
import { useProductsStockPager } from "../Products/useProducts";
import PagerComponent from "../../shared/components/Grid/PagerComponent";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
export const ProductsStockCard = () => {
    const { products, count, pager } = useProductsStockPager();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const location = useLocation();
    return (
        <div className="bg-white rounded-lg shadow p-4 ">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                <h2 className="text-lg font-bold">Stock de Productos</h2>
            </div>
            {products?.map((product) => (
                <Link to={`/products/${product.id}`}
                    state={{ fromHome: location.pathname === "/" }}>
                    <div key={product.id}>
                        <div className="space-y-1">
                            <div className="rounded-lg border border-gray-500 p-4 mb-2 hover:border-blue-700 transition-colors duration-3000 hover:bg-gray-200">
                                <div className="relative flex justify-between items-center mb-2">
                                    <p className=" font-bold ">#{product.codeNumber.toString().padWithZeros(5)}</p>
                                    <p className=" text-2xl font-bold text-red-500 absolute inset-y-5 right-1">{product.quantity}</p>
                                </div>
                                <div className="flex justify-between ">
                                    <p className="">{product.name}</p>
                                    <i className="fas fa-play text-gray-500"></i>
                                </div>
                                <p className=" text-gray-500 text-sm">Hace, {formatDistance(new Date(), parseISO(product.updateDate ? product.updateDate.toString() : new Date().toString()))}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
            <PagerComponent pageCurrent={page} totalPages={pager?.pageCount ?? 0} pageSize={pager?.pageSize} xChange={(value) => setPage(parseInt(value))} xChangePageSize={(value) => setPageSize(parseInt(value))} itemsCount={count} />
        </div>
    )
}