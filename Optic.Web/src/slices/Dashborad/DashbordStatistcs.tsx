import { useEffect, useState } from "react";
import { DashboardResponseModel } from "./DashboardModel";
import { getDashboard } from "./DashboardServices";
import { MoneyFormatter } from "../../shared/components/Numbers/MoneyFormatter";

export const DashboradStatistcs = () => {
    const [dashboarData, setDashboardData] = useState<DashboardResponseModel | undefined>(undefined);
    useEffect(() => {
        const fetchDashaboard = async () => {
            const response = await getDashboard();
            if (response.isSuccess) {
                setDashboardData(response.data);
            }
        };
        fetchDashaboard();
    }, []);

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-white shadow-lg rounded-lg p-4 w-56 text-center border-b-4 border-purple-500 mr-2">
                <p className="text-purple-500 text-ms font-bold ">Total Productos</p>
                <p className="text-blue-500 text-3xl font-bold">{dashboarData?.productCount}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 w-56 text-center border-b-4 border-blue-500 mr-2">
                <p className="text-blue-500 text-ms font-bold">Total Recaudo (Hoy)</p>
                <p className="text-blue-500 text-3xl font-bold"><MoneyFormatter abbreviation={true} amount={dashboarData?.dailyRevenue} /></p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 w-56 text-center border-b-4 border-red-500">
                <p className="text-red-500 text-ms font-bold">Total Clientes</p>
                <p className="text-blue-500 text-3xl font-bold">{dashboarData?.clientCount}</p>
            </div>
        </div>
    )
};