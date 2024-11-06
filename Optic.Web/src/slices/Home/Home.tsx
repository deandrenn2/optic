export const Home = () => {
  return (
    <>
    {/* <!-- Cards Section --> */}
               <div className="bg-gray-300 p-4 mb-1 rounded-lg border border-grey-500 p-4 mb-4  ">
                   <div>
                       <div className="container mx-auto p-4">
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
                                   <div className="flex justify-center mt-20">
                                       <div className="mt-20">
                                           <button className="px-2 py-1 border rounded">
                                               {"<<<"} </button>
                                                   <button className="px-2 py-1 border rounded">1</button>
                                                   <button className="px-2 py-1 border rounded">2</button>
                                                   <button className="px-2 py-1 border rounded">3</button>
                                                   <button className="px-2 py-1 border rounded"> {">>>"} </button>
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
                                   <div className="flex justify-center mt-20">
                                       <div className="mt-20">
                                           <button className="px-2 py-1 border rounded">
                                               {"<<<"} </button>
                                                   <button className="px-2 py-1 border rounded">1</button>
                                                   <button className="px-2 py-1 border rounded">2</button>
                                                   <button className="px-2 py-1 border rounded">3</button>
                                                 <button className="px-2 py-1 border rounded"> {">>>"} </button>
                                       </div>
                                   </div>
                               </div>
                               {/* <!-- Productos en Stock --> */}

                               <div className="bg-white rounded-lg shadow p-4 ">
                                   <div className="flex items-center mb-4">
                                       <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                                       <h2 className="text-lg font-bold">Productos en Stock</h2>
                                   </div>
                                   <div className="space-y-1">
                                       <div className="rounded-lg border border-red-500 p-4 mb-4 ">
                                           <div className="flex justify-between items-center mb-2">
                                               <p className="font-bold">#00050</p>
                                               <p className=" text-sm font-bold text-purple-500 ">10</p>
                                           </div>
                                           <div className="flex justify-between ">
                                               <p className="text-sm font-bold">Lentes UV</p>
                                               <i className="fas fa-play text-gray-500"></i>
                                           </div>
                                           <p className=" text-gray-500">Fecha:24/03/2024</p>
                                       </div>
                                       <div className="rounded-lg border border-grey-500 p-4 mb-4">
                                           <div className="flex justify-between items-center mb-2">
                                               <p className="text-sm font-bold">#00024</p>
                                               <p className="text-sm font-bold text-purple-500">10</p>
                                           </div>
                                           <div className=" flex justify-between">
                                               <p className="text-sm font-bold">Monturas Roja</p>
                                               <i className="fas fa-play text-gray-500"></i>
                                           </div>
                                           <p className=" text-gray-500">Fecha:24/03/2024</p>
                                       </div>
                                   </div>
                                   <div className="flex justify-center mt-20">
                                       <div className="mt-20">
                                           <button className="px-2 py-1 border rounded">
                                               {"<<<"} </button>
                                                   <button className="px-2 py-1 border rounded">1</button>
                                                   <button className="px-2 py-1 border rounded">2</button>
                                                   <button className="px-2 py-1 border rounded">3</button>
                                                   <button className="px-2 py-1 border rounded"> {">>>"} </button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   {/* <!-- Formulas Section --> */}
                   <div className="container mx-auto p-4">
                       <h1 className="text-center text-2xl font-semibold text-gray-600">Acceso rápido</h1>
                       <p className="text-center text-sm text-gray-500 mb-6">Muestra el Top 5 de los elementos editados
                           recientemente</p>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                           <div className="bg-white rounded-lg shadow p-4 ">
                               <div className="flex items-center mb-4">
                                   <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                   <h2 className="text-lg font-bold">Formulas</h2>
                               </div>
                               <div className="space-y-1">
                                   <div className="rounded-lg border border-grey-500 p-4 mb-4 ">
                                       <div className="flex justify-between items-center mb-2">
                                           <p className="font-bold">#00024</p>
                                           <p className=" font-bold text-blue-500">Valor: $200.000</p>
                                       </div>
                                       <div className="flex justify-between ">
                                           <p className="text-sm font-bold">DEIMER ANDRÉS NÚÑEZ NOVOA</p>
                                           <i className="fas fa-play text-gray-500"></i>
                                       </div>
                                       <p className=" text-gray-500">Fecha:24/03/2024</p>
                                   </div>
                                   <div className="rounded-lg border border-grey-500 p-4 mb-4">
                                       <div className="flex justify-between items-center mb-2">
                                           <p className="text-sm font-bold">#00024</p>
                                           <p className="text-sm font-bold text-blue-500">Valor: $200.000</p>
                                       </div>
                                       <div className=" flex justify-between">
                                           <p className="text-sm font-bold">JAMES ZÚÑIGA ZÚÑIGA</p>
                                           <i className="fas fa-play text-gray-500"></i>
                                       </div>
                                       <p className=" text-gray-500">Fecha:24/03/2024</p>
                                   </div>
                               </div>

                               <div className="flex justify-center mt-20">
                                   <div className="mt-20">
                                       <button className="px-2 py-1 border rounded" >
                                           {"<<<"} </button>
                                               <button className="px-2 py-1 border rounded">1</button>
                                               <button className="px-2 py-1 border rounded">2</button>
                                               <button className="px-2 py-1 border rounded">3</button>
                                               <button className="px-2 py-1 border rounded">  {">>>"} </button>
                                   </div>
                               </div>
                           </div>
                           {/* <!-- Clientes Section --> */}
                           <div className="bg-white rounded-lg shadow p-4 ">
                               <div className="flex items-center mb-4">
                                   <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                   <h2 className="text-gray-500 font-bold">Clientes</h2>
                               </div>
                               <div className="space-y-1">
                                   <div className="border rounded-lg p-4 flex justify-between items-center">
                                       <div>
                                           <p className="text-sm font-semibold text-gray-600">ARLEY TORDECILLA</p>
                                           <p className="text-sm text-gray-600">CC. 11111111110</p>
                                       </div>
                                       <i className="fas fa-mars text-gray-400"></i>
                                       <i className="fas fa-play text-gray-500"></i>
                                   </div>
                                   <div className="border rounded-lg p-4 flex justify-between items-center">
                                       <div>
                                           <p className="text-sm font-semibold text-gray-600">DEIMER ANDRÉS NÚÑEZ NOVOA</p>
                                           <p className="text-sm text-gray-600">CC. 1030904780</p>
                                       </div>
                                       <i className="fas fa-mars text-gray-400"></i>
                                       <i className="fas fa-play text-gray-500"></i>
                                   </div>
                                   <div className="border rounded-lg p-4 flex justify-between items-center">
                                       <div>
                                           <p className="text-sm font-semibold text-gray-600">MARIA VERTEL VERTEL</p>
                                           <p className="text-sm text-gray-600">T.I. 5687898985</p>
                                       </div>
                                       <i className="fas fa-venus text-gray-400"></i>
                                       <i className="fas fa-play text-gray-500"></i>
                                   </div>
                               </div>
                               <div className="flex justify-center mt-20">
                                   <div className="mt-20">
                                       <button className="px-2 py-1 border rounded">
                                           {"<<<"} </button>
                                               <button className="px-2 py-1 border rounded">1</button>
                                               <button className="px-2 py-1 border rounded">2</button>
                                               <button className="px-2 py-1 border rounded">3</button>
                                               <button className="px-2 py-1 border rounded"> {">>>"} </button>
                                   </div>
                               </div>
                           </div>
                           {/* <!-- Productos Section --> */}
                           <div className="bg-white rounded-lg shadow p-4 ">
                               <div className="flex items-center mb-4">
                                   <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>

                                   <h2 className="text-lg font-bold">Productos</h2>
                               </div>
                               <div className="space-y-1">

                                   <div className="rounded-lg border border-grey-500 p-4 mb-4 ">
                                       <div className="flex justify-between items-center mb-2">
                                           <p className="font-bold">#00050</p>
                                           <p className=" text-sm font-bold text-purple-500">10</p>
                                       </div>

                                       <div className="flex justify-between ">
                                           <p className="text-sm font-bold">Lentes UV</p>
                                           <i className="fas fa-play text-gray-500"></i>
                                       </div>
                                       <p className=" text-gray-500">Fecha:24/03/2024</p>
                                   </div>

                                   <div className="rounded-lg border border-grey-500 p-4 mb-4">
                                       <div className="flex justify-between items-center mb-2">
                                           <p className="text-sm font-bold">#00024</p>
                                           <p className="text-sm font-bold text-purple-500">10</p>
                                       </div>

                                       <div className=" flex justify-between">
                                           <p className="text-sm font-bold">Monturas Roja</p>
                                           <i className="fas fa-play text-gray-500"></i>
                                       </div>
                                       <p className=" text-gray-500">Fecha:24/03/2024</p>
                                   </div>
                               </div>

                               <div className="flex justify-center mt-20">
                                   <div className="mt-20">
                                       <button className="px-2 py-1 border rounded"/>
                                           <button className="px-2 py-1 border rounded">
                                               {"<<<"} <button className="px-2 py-1 border rounded"/>1
                                           </button>
                                           <button className="px-2 py-1 border rounded">2</button>
                                           <button className="px-2 py-1 border rounded">3</button>
                                           <button className="px-2 py-1 border rounded"> {">>>"}  </button>
                                   </div>
                               </div>
                           </div>

                       </div>
                   </div>
               </div>
   </>
  )
}
