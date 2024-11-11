import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'  
import './index.css'
import App from './App.tsx'
import { Home } from './slices/Home/Home.tsx'
import { Clientes } from './slices/Clients/Clients.tsx'
import { Login } from './routes/Login/Login.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { UserCreate } from './routes/Login/UserCreate.tsx'
import { BusinessCreate } from './routes/Businesses/BusinessCreate.tsx'

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
        path: 'clientes',
        element: <Clientes  />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'createUser',
    element: <UserCreate />,
  },
  {
    path: 'createBusiness',
    element: <BusinessCreate />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
