import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'  
import './index.css'
import App from './App.tsx'
import { Home } from './slices/Home/Home.tsx'
import { Clientes } from './slices/Clients/Clients.tsx'
import { Suppliers } from './slices/Suppliers/Suppliers.tsx'
import { Login } from './routes/Login/Login.tsx'
import { Products } from './slices/Products/Products.tsx'

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
        path: 'Clients',
        element: <Clientes />,
      },
      {
        path: 'Suppliers',
        element: <Suppliers />,
      },
      {
        path: 'Products',
        element: <Products/>,
      },
    

    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
