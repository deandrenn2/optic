
import {IdentificationTypeModel } from "../../shared/components/List/ListModels";
   export const IdentificationForm = ({ identificationType }: { identificationType: IdentificationTypeModel | undefined }) => {      
   return (
      <>
         <form >
            <div className="mt-2">
               <div>
                  <label
                     htmlFor="namesTxt"
                     className="block text-gray-600 text-sm font-bold mb-2">
                        Orden
                  </label>
                  <div className="relative">
                     <input
                        value={identificationType?.orden}  
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                  </div>
               </div>

               <div className="mt-2">
                  <label
                     htmlFor="namesTxt"
                     className="block text-gray-600 text-sm font-bold mb-2">
                     Tipo de Identificación
                  </label>
                  <div className="relative">
                     <input
                        name="Tipo de Identificación"
                        value={identificationType?.name}
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tipo de Identificación"
                     />
                  </div>
               </div>
               <div>
                  <label
                     htmlFor="namesTxt"
                     className="block text-gray-600 text-sm font-bold mb-2">
                     Abreviacion
                  </label>
                  <div className="relative">
                     <input
                        value={identificationType?.abbreviation}
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Abreviacion"
                     />
                  </div>
               </div>
               <button className=" mt-2  bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">Actulizar</button>
            </div>
            
         </form>
      </>
   )
}