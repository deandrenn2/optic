import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faLock } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { loginUser } from './LoginServices';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './useLogin';

export const Login = () => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [hasError, setHasError] = useState<string>('');
   const navigate = useNavigate();
   const { users, queryUsers } = useLogin();

   function handleLogin(event: React.FormEvent<HTMLFormElement>): void {
      event.preventDefault();
      loginUser({ email, password })
         .then((response) => {
            console.log(response);
            if (!response.isSuccess) {
               if (response.error) {
                  setHasError(response.error.message);
               }
            }

            if (response.data) {
               sessionStorage.setItem('token', JSON.stringify(response?.data));
            }
            navigate('/');
         })
         .catch((error) => {
            console.log(error.response.data.error.message);
            setHasError(error.response.data.error.message);
         });
   }

   useEffect(() => {
      if (queryUsers?.data) {
         if (users && users.length === 0) {
            navigate('/createUser');
         }
      }
   }, [queryUsers?.data, users, navigate]);

   return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
         <form
            onSubmit={handleLogin}
            className="bg-white p-9 rounded-lg shadow-md w-full max-w-md mx-4 grid gap-6"
         >
            <h2 className="text-6xl font-bold mb-4 text-center">
               <span>
                  OP<span className="text-blue-500">Tic</span>
               </span>
            </h2>

            <div>
               <label
                  htmlFor="email"
                  className="block text-gray-400 text-sm font-bold mb-2"
               >
                  Usuario
               </label>
               <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                     <div className="absolute top-1 left-1 bg-white rounded-full p-2 flex items-center justify-center text-gray-300">
                        <FontAwesomeIcon icon={faEnvelopeOpen} />
                     </div>
                  </span>
                  <input
                     type="email"
                     id="email"
                     required
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full px-10 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Correo electrónico"
                  />
               </div>
            </div>

            <div>
               <label
                  htmlFor="password"
                  className="block text-gray-400 text-sm font-bold mb-2"
               >
                  Contraseña
               </label>
               <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                     <div className="absolute top-1 left-1 bg-white rounded-full p-2 flex items-center justify-center text-gray-300">
                        <FontAwesomeIcon icon={faLock} />
                     </div>
                  </span>
                  <input
                     type="password"
                     id="password"
                     required
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full px-10 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Contraseña"
                  />
               </div>
            </div>

            <div className="">
               <div className="flex items-center">
                  <input
                     type="checkbox"
                     id="remember"
                     className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  <label
                     htmlFor="remember"
                     className="ml-2 text-sm"
                  >
                     Recordar Sesión
                  </label>
               </div>
               <div className="text-sm text-center pt-2 text-red-600 hover:text-blue-500">
                  <span>
                     <a href="">{hasError && hasError}</a>
                  </span>
               </div>
            </div>

            <button
               type="submit"
               className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               Ingresar
            </button>

            <div className="text-sm text-gray-600 hover:text-blue-500">
               <span>
                  <a href="">Olvidaste la contraseña</a>
               </span>
            </div>
         </form>
      </div>
   );
};
