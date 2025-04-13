import { useEffect, useState } from "react";
import { IdentificationTypeModel } from "../../shared/components/List/ListModels"
import { useListSettings } from "../../shared/components/List/useListSettings";
export const IdentificationForm = ({ identificationType }: { identificationType: IdentificationTypeModel | undefined, }) => {
   const { updateIdentificationType } = useListSettings();
   const [form, setForm] = useState({
      id: 0,
      orden: 0,
      name: "",
      abbreviation: "",
   });
   useEffect(() => {
      if (identificationType) {
         setForm({
            id: identificationType.id,
            orden: identificationType.orden,
            name: identificationType.name,
            abbreviation: identificationType.abbreviation,
         });
      }
   }, [identificationType]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prevValues) => ({
         ...prevValues,
         [name]: value,
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await updateIdentificationType.mutateAsync(form);
   };

   return (
      <>
         <form onSubmit={handleSubmit}>
            <div className="mt-2">
               <div>
                  <label
                     htmlFor="orden"
                     className="block text-gray-600 text-sm font-bold mb-2">
                     Orden
                  </label>
                  <div className="relative">
                     <input
                        name="orden"
                        value={form?.orden}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Orden"
                     />
                  </div>
               </div>
               <div>
                  <label
                     className="block text-gray-600 text-sm font-bold mb-2">
                     Tipo de Identificación
                  </label>
                  <div className="relative">
                     <input
                        name="name"
                        value={form?.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tipo de identificacion"
                     />
                  </div>
               </div>
               <div>
                  <label
                     className="block text-gray-600 text-sm font-bold mb-2">
                     Abreviación
                  </label>
                  <div className="relative">
                     <input
                        name="abbreviation"
                        value={form?.abbreviation}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Abreviacion"
                     />
                  </div>
               </div>
               <div className="mt-4">
                  {identificationType &&
                     (
                        <button type="submit" disabled={updateIdentificationType.isPending} className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                           {updateIdentificationType.isPending ? "Actualizando..." : "Actualizar Identificación"}
                        </button>
                     )}
               </div>
            </div>
         </form>
      </>
   )
};

