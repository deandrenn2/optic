import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'  
import './index.css'
import App from './App.tsx'
import { Home } from './slices/Home/Home.tsx'
import { Clientes } from './slices/Clients/Clients.tsx'
import { Login } from './routes/Login/Login.tsx'

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
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
