import { useState } from "react";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { CardClient, } from "../Dashborad/ClientCard";
import { DashboradStatistcs } from "../Dashborad/DashbordStatistcs";
import { FormulasCard } from "../Dashborad/FormulasCard";
import { ProductoCard } from "../Dashborad/ProductsCard";
import { ProductsStockCard } from "../Dashborad/ProductsStockCard";
import { SalesCreate } from "../Sales/SalesCreate";

import { FormulasCreate } from "../Formulas/FormulasCreate";
import { InvoicePaymentsCard } from "../Dashborad/InvoicePaymentsCard";
import { PurchasePaymentsCard } from "../Dashborad/PurchasePaymentsCard";
export const Home = () => {
   const [visible, setVisible] = useState(false);
   const handleClick = () => {
      setVisible(true)
   }

   const [visibleButtonSales, setVisibleButtonSales] = useState(false);
   const handleCloseSales = (): void => {
      setVisibleButtonSales(false);
   }

   const handleClose = (): void => {
      setVisible(false)
   }

   return (
      <div>
         {/* <!-- Cards Section --> */}
         <div className="p-4 border border-grey-500 ">
            <div>
               <DashboradStatistcs />
               <div className="container mx-auto">
                  <OffCanvas titlePrincipal='Nueva formula' visible={visible} xClose={handleClose} position={Direction.Right} size="lg" >
                     <FormulasCreate />
                  </OffCanvas>
                  <div className="m-2">
                     <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" >
                        Nueva Formula
                     </button>
                     <button className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded" onClick={() => setVisibleButtonSales(true)}>
                        Nueva venta
                     </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {/* <!-- Formulas Section --> */}
                     <InvoicePaymentsCard />

                     {/* <!-- Cuentas Por Pagar --> */}
                     <PurchasePaymentsCard />
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
            <OffCanvas titlePrincipal='Nueva venta' visible={visibleButtonSales} xClose={handleCloseSales} position={Direction.Right} size="lg" >
               <SalesCreate xChange={handleCloseSales} />
            </OffCanvas>
         </div>
      </div>

   );
};
