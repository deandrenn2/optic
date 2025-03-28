import { useState } from "react";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { CardClient, } from "../Dashborad/ClientCard";
import { DashboradStatistcs } from "../Dashborad/DashbordStatistcs";
import { FormulasCard } from "../Dashborad/FormulasCard";
import { ProductoCard } from "../Dashborad/ProductsCard";
import { ProductsStockCard } from "../Dashborad/ProductsStockCard";
import { SalesCreate } from "../Sales/SalesCreate";
export const Home = () => {

   const [visibleButtonSales, setVisibleButtonSales] = useState(false);
   const handleClose = (): void => {
      setVisibleButtonSales(false);
   }
   return (
      <>
         {/* <!-- Cards Section --> */}
         <div className="p-4 border border-grey-500 ">
            <div>
               <DashboradStatistcs />
               <div className="container mx-auto">
                  <div className="m-2">
                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" >
                        Nueva Formula
                     </button>
                     <button className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded" onClick={() => setVisibleButtonSales(true)}>
                        Nueva venta
                     </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {/* <!-- Formulas Section --> */}
                     <div className="bg-white rounded-lg shadow p-4 ">
                        <div className="flex items-center mb-4">
                           <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>

                           <h2 className="text-lg font-bold">Facturas por Cobrar</h2>
                        </div>
                        <div className="space-y-1">
                           <div className="rounded-lg border border-red-500 p-4 mb-4 ">
                              <div className="flex justify-between items-center mb-2">
                                 <p className="font-bold">#00024</p>
                                 <p className=" font-bold text-red-500">Valor: $200.000</p>
                              </div>

                              <div className="flex justify-between ">
                                 <p className="text-sm font-bold">DEIMER ANDRÉS NÚÑEZ NOVOA</p>
                                 <i className="fas fa-play text-red-500"></i>
                              </div>
                              <p className=" text-gray-500">Fecha:24/03/2024</p>
                           </div>
                           <div className="rounded-lg border border-grey-500 p-4 mb-4">
                              <div className="flex justify-between items-center mb-2">
                                 <p className="text-sm font-bold">#00024</p>
                                 <p className="text-sm font-bold text-red-500">Valor: $200.000</p>
                              </div>
                              <div className=" flex justify-between">
                                 <p className="text-sm font-bold">JAMES ZÚÑIGA ZÚÑIGA</p>
                                 <i className="fas fa-play text-gray-500"></i>
                              </div>
                              <p className=" text-gray-500">Fecha:24/03/2024</p>
                           </div>
                        </div>
                     </div>

                     {/* <!-- Cuentas Por Pagar --> */}
                     <div className="bg-white rounded-lg shadow p-4 ">
                        <div className="flex items-center mb-4">
                           <div className="w-4 h-4 bg-pink-500 rounded-full mr-2"></div>
                           <h2 className="text-lg font-bold">Cuentas Por Pagar</h2>
                        </div>
                        <div className="space-y-1">
                           <div className="rounded-lg border border-red-500 p-4 mb-4 ">
                              <div className="flex justify-between items-center mb-2">
                                 <p className="font-bold">#00024</p>
                                 <p className="font-bold text-red-500">Valor: $200.000</p>
                              </div>
                              <div className="flex justify-between ">
                                 <p className="font-bold">Optic</p>
                                 <i className="fas fa-play text-red-500"></i>
                              </div>
                              <p className=" text-gray-500">Fecha:24/03/2024</p>
                           </div>
                           <div className="rounded-lg border border-grey-600 p-4 mb-4">
                              <div className="flex justify-between items-center mb-2">
                                 <p className="text-sm font-bold">#00024</p>
                                 <p className="text-sm font-bold text-blue-600">Valor: $200.000</p>
                              </div>
                              <div className=" flex justify-between">
                                 <p className="text-sm font-bold">OPTICAS COLOMBIA S.A.S.</p>
                                 <i className="fas fa-play text-gray-500"></i>
                              </div>
                              <p className=" text-gray-500">Fecha:24/03/2024</p>
                           </div>
                        </div>
                     </div>
                     {/* <!-- Products Stock --> */}
                     <ProductsStockCard />
                  </div>
               </div>
            </div>

            {/* <!-- Formulas Section --> */}
            <div className="container mx-auto p-4">
               <h1 className="text-center text-2xl font-semibold text-gray-600">Acceso rápido</h1>
               <p className="text-center text-sm text-gray-500 mb-6">Muestra el Top 5 de los elementos editados recientemente</p>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* <!-- Formulas card --> */}
                  <FormulasCard />
                  {/* <!-- Clients card --> */}
                  <CardClient />

                  {/* <!-- Productos Section --> */}
                  <ProductoCard />
               </div>
            </div>
            <OffCanvas titlePrincipal='Nueva venta' visible={visibleButtonSales} xClose={handleClose} position={Direction.Right} size="lg" >
               <SalesCreate />
            </OffCanvas>
         </div>
      </>
   );
};
