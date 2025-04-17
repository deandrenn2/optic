import React, { useState } from 'react';
import { CreateUserModel } from './LoginModel';
import { useFirstData, useLogin } from './useLogin';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const UserCreate = () => {
   const navigate = useNavigate();
   const { queryFirstUser } = useFirstData();
   const [user, setUser] = useState<CreateUserModel>({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      securePharse: '',
   });

   const { createUser } = useLogin();

   const [confirmPassword, setConfirmPassword] = useState<string>('');

   const handleCreate = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      if (user.password !== confirmPassword) {
         toast.error('Las contraseñas no coinciden');
         return;
      }
      const res = await createUser.mutateAsync(user);

      if (!res.isSuccess) {
         toast.error(res.message);
         return;
      } else {
         queryFirstUser.refetch();
         navigate('/Create/Business');
      }
   };

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target;
      event.preventDefault();
      setUser({ ...user, [name]: value });
   };

   return (
      <div className="flex justify-center min-h-screen items-center">
         <form
            onSubmit={handleCreate}
            className="bg-white p-9 rounded-lg shadow-md w-full max-w-md mx-4 grid gap-6  my-5"
         >
            <h2 className="text-3xl font-bold mb-1 text-center">
               <span>Crear usuario Admin</span>
            </h2>
            <div>
               <label
                  htmlFor="namesTxt"
                  className="block text-gray-600 text-sm font-bold mb-2"
               >
                  Nombres
               </label>
               <div className="relative">
                  <input
                     id="namesTxt"
                     name="firstName"
                     value={user?.firstName}
                     onChange={(e) => handleChange(e)}
                     required
                     className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Nombres"
                  />
               </div>
            </div>
            <div>
               <label
                  htmlFor="lastNameTxt"
                  className="block text-gray-600 text-sm font-bold mb-2"
               >
                  Apellidos
               </label>
               <div className="relative">
                  <input
                     id="lastNameTxt"
                     name="lastName"
                     value={user?.lastName}
                     onChange={(e) => handleChange(e)}
                     required
                     className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Apellidos"
                  />
               </div>
            </div>

            <div>
               <label
                  htmlFor="email"
                  className="block text-gray-600 text-sm font-bold mb-2"
               >
                  Email
               </label>
               <div className="relative">
                  <input
                     type="email"
                     id="email"
                     name="email"
                     value={user?.email}
                     onChange={(e) => handleChange(e)}
                     required
                     className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Correo electrónico"
                  />
               </div>
            </div>

            <div>
               <label
                  htmlFor="password"
                  className="block text-gray-600 text-sm font-bold mb-2"
               >
                  Contraseña
               </label>
               <div className="relative">
                  <input
                     type="password"
                     id="password"
                     required
                     name="password"
                     value={user?.password}
                     onChange={(e) => handleChange(e)}
                     className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Contraseña"
                  />
               </div>
            </div>
            <div>
               <label
                  htmlFor="confirmPasswordTxt"
                  className="block text-gray-600 text-sm font-bold mb-2"
               >
                  Confirmar Contraseña
               </label>
               <div className="relative">
                  <input
                     type="password"
                     id="confirmPasswordTxt"
                     required
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Contraseña"
                  />
               </div>
            </div>
            <div>
               <label
                  htmlFor="securePharseTxt"
                  className="block text-gray-600 text-sm font-bold mb-2"
               >
                  Frase segura
               </label>
               <div className="relative">
                  <input
                     id="securePharseTxt"
                     name="securePharse"
                     value={user?.securePharse}
                     onChange={(e) => handleChange(e)}
                     maxLength={150}
                     required
                     className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Frase egura"
                  />
               </div>
            </div>
            <button
               type="submit"
               className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               Crear Usuario
            </button>
         </form>
      </div>
   );
};
