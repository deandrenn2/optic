import { formatDistance, parseISO } from "date-fns";
import PagerComponent from "../../shared/components/Grid/PagerComponent";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useBillingPurchase } from "../Billing/useBilling";
import { MoneyFormatter } from "../../shared/components/Numbers/MoneyFormatter";
import { getDifferenceDays } from "./Util";
export const PurchasePaymentsCard = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const { billing, count, pager } = useBillingPurchase(page, pageSize);
    const location = useLocation();
    return (
        <div className="bg-white rounded-lg shadow p-4 ">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-pink-500 rounded-full mr-2"></div>
                <h2 className="text-lg font-bold">
                    Cuentas Por Pagar</h2>
            </div>
            {billing?.map((bill) => (
                <Link to={`/Purchases/${bill.id}`}
                    state={{ fromHome: location.pathname === "/" }} key={bill.id}>
                    <div >
                        <div className="space-y-1">
                            <div className="rounded-lg border border-gray-500 p-4 mb-2 hover:border-blue-700  hover:bg-yellow-50 transition-colors duration-3000 ">
                                <div className="relative flex justify-between items-center mb-2">
                                    <p className=" font-bold ">#{bill.number.toString().padWithZeros(5)}</p>
                                    <p className={` text-1xl font-bold ${getDifferenceDays(bill.date) > 30 ? 'text-red-500' : 'text-blue-500'} absolute inset-y-5 right-1`}><MoneyFormatter amount={bill.total} /></p>
                                </div>
                                <div className="flex justify-between ">
                                    <p className="">{bill.clientOrSupplier}</p>
                                    <i className="fas fa-play text-gray-500"></i>
                                </div>
                                <p className=" text-gray-500 text-sm">Hace, {formatDistance(new Date(), parseISO(bill.date ? bill.date.toString() : new Date().toString()))}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
            <PagerComponent pageCurrent={page} totalPages={pager?.pageCount ?? 0} pageSize={pageSize} xChange={(value) => setPage(value)} xChangePageSize={(value) => setPageSize(value)} itemsCount={count} />
        </div>
    )
}