import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { Home } from './slices/Home/Home.tsx';
import { Clients } from './slices/Clients/Clients.tsx';
import { Login } from './routes/Login/Login.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserCreate } from './routes/Login/UserCreate.tsx';
import { BusinessCreate } from './routes/Login/BusinessCreate.tsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ClientDetail } from './slices/Clients/ClientDetail.tsx';
import { Products } from './slices/Products/Products.tsx';
import { Suppliers } from './slices/Suppliers/Suppliers.tsx';
import { Formulas } from './slices/Formulas/Formulas.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: 'Clientes',
            element: <Clients />,
         },
         {
            path: 'Clientes/:id',
            element: <ClientDetail />,
         },
         {
            path: 'Products',
            element: <Products />,
         },
         {
            path: 'Suppliers',
            element: <Suppliers />,
         },
         {
            path: 'Formulas',
            element: <Formulas />,
         },
      ],
   },
   {
      path: 'Login',
      element: <Login />,
   },
   {
      path: '/Create/User',
      element: <UserCreate />,
   },
   {
      path: '/Create/Business',
      element: <BusinessCreate />,
   },
]);

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router} />
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer
         position="top-right"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
      />
   </StrictMode>,
);
