import { useRef, useState } from "react";
import { CreateClientModel } from "./ClientModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import useClient from "./useClient";

export const ClientForm = () => {
   const [client, setClient] = useState<CreateClientModel>({
      firstName: '',
      lastName: '',
      sex: 0,
      identificationTypeId: 0,
      identificationNumber: '',
      email: '',
      address: '',
      cellPhoneNumber: '',
      phoneNumber: '',
   });
   const form = useRef<HTMLFormElement>(null);

   const { createClient } = useClient();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setClient({ ...client, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await createClient.mutateAsync(client);
      if (res.isSuccess) {
         form.current?.reset();
      }
   };

   return (
      <form ref={form} className="flex flex-col" onSubmit={handleSubmit}>
         <div className="mt-4">
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre
               </label>
               <input
                  required
                  type="text"
                  onChange={(e) => handleChange(e)}
                  name="firstName"
                  placeholder="Nombre"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2">
                  Apellido
               </label>
               <input
                  type="text"
                  required
                  onChange={(e) => handleChange(e)}
                  name="lastName"
                  placeholder="Apellido"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
            </div>

            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2">
                  Sexo
               </label>
               <select
                  name="sex"
                  required
                  onChange={(e) => handleChange(e)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               >
                  <option value="">Seleccione</option>
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
               </select>
            </div>

            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tipo de Identificación
               </label>
               <select
                  name="identificationTypeId"
                  onChange={(e) => handleChange(e)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               >
                  <option value="">Seleccione</option>
                  <option value="1">DNI</option>
                  <option value="2">Pasaporte</option>
               </select>
            </div>

            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2">
                  Identificación
               </label>
               <input
                  type="text"
                  required
                  onChange={(e) => handleChange(e)}
                  name="identificationNumber"
                  placeholder="Identificación"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2">
                  Celular
               </label>
               <input
                  type="text"
                  required
                  onChange={(e) => handleChange(e)}
                  name="cellPhoneNumber"
                  placeholder="Celular"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
               </label>
               <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  name="email"
                  placeholder="Email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
            </div>

            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2">
                  Dirección
               </label>
               <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  name="address"
                  placeholder="Dirección"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
            </div>


         </div>
         <div className="mt-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
               Crear cliente
            </button>
            <button type="reset" className="bg-gray-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">
               <FontAwesomeIcon icon={faEraser} />
            </button>
         </div>
      </form>
   )
}
