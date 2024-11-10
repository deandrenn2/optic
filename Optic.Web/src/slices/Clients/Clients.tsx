import { faCircleMinus, faFileExport, faMagnifyingGlass, faMars, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
faFileExport
export const Clientes = () => {
  return (
      <div className="w-5/6 p-4 ">
       
        <div className="bg-gray-300 p-4 mb-1 rounded-lg border border-grey-500 p-4 mb-4 w-full ">
          <div className="mb-2">
            <div className="relative">
              <div className="inline-flex">
                <input type="text" placeholder="Buscar Cliente" className="p-2 pl-10 border-blue-400 rounded" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-search absolute left-3 top-3 text-gray-400" />
                
                <button
                  className="text-white font-bold border hover:bg-blue-700 p-2 bg-blue-500 px-4 py-2 rounded ">Buscar</button>
              </div>
            </div>
          </div>
                      {/* <!-- TABLA DE CLIENTES --> */}
          <table className=" bg-white rounded shadow w-full">
            <thead>
              <tr>
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Identificación</th>
                <th className="border p-2">Celular</th>
                <th className="border p-2">Dirección</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=" p-2 border-b border-gray-200"> <FontAwesomeIcon icon={faMars} className="text-blue-600 fas fa-mars text-lg mr-8 bg-blue-" />
                  DEIMER ANDRES NOVOA NOVOA</td>
                <td className="border border-gray-300 p-2 text-center">2480293473</td>
                <td className="border border-gray-300 p-2 text-center">3227133105 <br /> 3227133105</td>
                <td className="border border-gray-300 p-2 text-center">NECOCLI - 35 PI 9</td>
                <td className="border border-gray-300 p-2 text-center">deimeryopmail.com</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button className="text-blue-500 mr-10">
                  <FontAwesomeIcon icon={faPlay} />
                  </button>
                  <button className="text-red-500">
                  <FontAwesomeIcon icon={faCircleMinus} className="ml-2" />
                  </button>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 p-2 ">
                <FontAwesomeIcon icon={faMars} className="text-pink-600 fas fa-mars text-lg mr-8 " />
                  MARIA NOVOA NOVOA</td>
                <td className="border border-gray-300 p-2 text-center"></td>
                <td className="border border-gray-300 p-2 text-center"></td>
                <td className="border border-gray-300 p-2 text-center"></td>
                <td className="border border-gray-300 p-2 text-center"></td>
                <td className="border border-gray-300 p-2 text-center"> <button className="text-blue-500 mr-10">
                <FontAwesomeIcon icon={faPlay} />
                </button>
                  <button className="text-red-500">
                  <FontAwesomeIcon icon={faCircleMinus} className="ml-2"/>
                  </button>
                </td>
              </tr>

            </tbody>
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

  )
}
