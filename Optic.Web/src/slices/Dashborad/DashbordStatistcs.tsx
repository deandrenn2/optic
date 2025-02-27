export const DashboradStatistcs = () => {

    return (
        <div className="flex items-center justify-center  ">
            <div className="bg-white shadow-lg rounded-lg p-4 w-56 text-center border-b-4 border-purple-500 mr-2">
                <p className="text-purple-500 text-ms font-bold ">Total Productos</p>
                <p className="text-blue-500 text-3xl font-bold">243</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 w-56 text-center border-b-4 border-blue-500 mr-2">
                <p className="text-blue-500 text-ms font-bold">Promedio Recaudo (Hoy)</p>
                <p className="text-blue-500 text-3xl font-bold">$200K</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 w-56 text-center border-b-4 border-red-500">
                <p className="text-red-500 text-ms font-bold">Total de Clientes</p>
                <p className="text-blue-500 text-3xl font-bold">243</p>
            </div>
        </div>
    )
};