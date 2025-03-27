import { formatDistance, parseISO } from "date-fns";
import { useProductsStockPager } from "../Products/useProducts";
import PagerComponent from "../../shared/components/Grid/PagerComponent";
import { useState } from "react";

export const ProductsStockCard = () => {
    const { products, count } = useProductsStockPager();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    return (
        <div className="bg-white rounded-lg shadow p-4 ">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                <h2 className="text-lg font-bold">Stock de Productos</h2>
            </div>
            {products?.map((product) => (
                <div key={product.id}>
                    <div className="space-y-1">
                        <div className="rounded-lg border border-red-500 p-4 mb-4 ">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-bold">#{product.codeNumber.toString().padWithZeros(5)}</p>
                                <p className=" text-sm font-bold text-purple-500">{product.quantity}</p>
                            </div>
                            <div className="flex justify-between ">
                                <p className="text-sm font-bold">{product.name}</p>
                                <i className="fas fa-play text-gray-500"></i>
                            </div>
                            <p className=" text-gray-500 text-sm">Hace, {formatDistance(new Date(), parseISO(product.updateDate ? product.updateDate.toString() : new Date().toString()))}</p>
                        </div>
                    </div>
                </div>
            ))}
            <PagerComponent pageCurrent={page} totalPages={products?.length ?? 0} pageSize={pageSize} xChange={(value) => setPage(parseInt(value))} xChangePageSize={(value) => setPageSize(parseInt(value))} itemsCount={count} />
        </div>
    )
}