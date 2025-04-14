
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirstData, useLogin } from './useLogin';
import useUserContext from '../../shared/context/useUserContext';
import { useBusiness } from '../Businesses/useBusiness';

export const Login = () => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();
   const { setToken, setBusiness, setUser, isAuthenticated, setIsAuthenticated } = useUserContext();
   const { hasFirstUser, hasFirstBusiness } = useFirstData();
   const { getUserMutation, logginn } = useLogin();
   const { getBusinessMutation } = useBusiness();
   const [isFetching, setIsFetching] = useState(false);

   useEffect(() => {
      if (isAuthenticated) {
         navigate('/');
      }
   }, [isAuthenticated, navigate]);

   const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      setIsFetching(true);
      event.preventDefault();
      const resLogin = await logginn.mutateAsync({ email, password });

      if (!resLogin.isSuccess) {
         setIsFetching(false);
         return;
      }
      if (resLogin.data) {
         setToken(resLogin?.data);

         const iduserCode = resLogin?.data?.claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
            != undefined && !!resLogin?.data ?
            resLogin?.data?.claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
            : "";

         const resUser = await getUserMutation.mutateAsync(Number(iduserCode));
         if (resUser.isSuccess) {
            setIsAuthenticated(true);
            if (resUser.data) {
               setUser(resUser.data);
            }
         }
         const resBusiness = await getBusinessMutation.mutateAsync();
         if (resBusiness.isSuccess) {
            if (resBusiness.data)
               setBusiness(resBusiness.data);
         }
      }
      setIsFetching(false);
   }



   useEffect(() => {
      if (!hasFirstUser) {
         navigate('/Create/User');
         return;
      }

      if (!hasFirstBusiness) {
         navigate('/Create/Business');
         return;
      }
   }, [hasFirstUser, navigate, hasFirstBusiness]);

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
                  className="block text-gray-600 text-sm font-bold mb-2"
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
                  className="block text-gray-600 text-sm font-bold mb-2"
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
                     type={showPassword ? "text" : "password"}
                     id="password"
                     required
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full px-10 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Contraseña"
                  />
                  <button
                     type="button"
                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                     onClick={() => setShowPassword(!showPassword)}>
                     <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
               </div>
            </div>
            <button
               type="submit"
               className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
            >
               {
                  (isFetching) &&
                  <div role="status" className='absolute top-0 left-1 p-2 flex items-center justify-center text-gray-300'>
                     <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                     </svg>
                     <span className="sr-only">Loading...</span>
                  </div>

               }

               Ingresar
            </button>

            <div className="text-sm text-center text-blue-600 hover:text-blue-800">
               <span>
                  <a href="./PasswordRecover">Olvidaste la contraseña</a>
               </span>
            </div>
         </form>
      </div>
   );
};
