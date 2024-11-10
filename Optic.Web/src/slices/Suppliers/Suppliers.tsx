export const Suppliers = () => {
    return (
    
    
        <div className="w-5/6 p-4">
             {/* <!-- TABLA DE PROVEEDORES --> */}
            <div className="bg-gray-300 p-4 mb-1 rounded-lg border border-grey-500 mb-4  ">
                <div className="mb-2">
                    <div className="relative">
                        <div className="inline-flex">
                            <input type="text" placeholder="Buscar Proveedor" className="p-2 pl-10 border-blue-400 rounded"/>
                            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            <button
                                className="font-bold border p-2 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white ">Buscar</button>
                        </div>
                    </div>

                </div>
                <table id="tablaProveedores" className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Proveedores </th>
                            <th className="border border-gray-300 p-2">Nit</th>
                            <th className="border border-gray-300 p-2">Celular</th>
                            <th className="border border-gray-300 p-2">Dirección</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2 text-center">OPTICOL</td>
                            <td className="border border-gray-300 p-2 text-center">2480293473</td>
                            <td className="border border-gray-300 p-2 text-center">3227133105 <br /> </td>
                            <td className="border border-gray-300 p-2 text-center">KR 11# 79 - 35 PI 9</td>
                            <td className="border border-gray-300 p-2 text-center">opticolyopmail.com</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button className="text-blue-500 mr-10">
                                    <i className="fas fa-play"></i>
                                </button>
                                <button id="eliminarusuario" className="text-red-500">
                                    <i className="fas fa-minus-circle ml-2"></i>
                                </button>
                            </td>
                        </tr>
                    
                        <tr>
                            <td className="border border-gray-300 p-2 text-center">OPTICAS COLOMBIA</td>
                            <td className="border border-gray-300 p-2 text-center">480293473</td>
                            <td className="border border-gray-300 p-2 text-center">2480293473</td>
                            <td className="border border-gray-300 p-2 text-center">Medellin</td>
                            <td className="border border-gray-300 p-2 text-center">opticolombia@yopmail.com</td>
                            <td className="border border-gray-300 p-2 text-center"> 
                                <button className="text-blue-500 mr-10">
                                    <i className="fas fa-play"></i>
                                </button>
                                <button id="eliminarusuario" className="text-red-500">
                                    <i className="fas fa-minus-circle ml-2"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody id="listaProveedores"></tbody>
                </table>
                <div className="mt-4 flex justify-center">
                    <nav className="inline-flex rounded-md shadow">
                        <a href="#" className="px-4 py-2 bg-white hover:bg-blue-500  border border-gray-300">1</a>
                        <a href="#" className="px-4 py-2 bg-white hover:bg-blue-500  border border-gray-300">2</a>
                        <a href="#" className="px-4 py-2 bg-white hover:bg-blue-500 border border-gray-300">3</a>
                    </nav>
                </div>

            </div>
        </div>
                              

)}