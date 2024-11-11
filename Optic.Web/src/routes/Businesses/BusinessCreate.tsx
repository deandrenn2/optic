import React from 'react'

export const BusinessCreate = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <h2 className="text-3xl font-bold mb-4 text-center">
        <span>Crear empresa</span>
      </h2>
      <div className="relative">
        <input type="text" id="name" className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre de la empresa" />
      </div>
      <div className="relative">
        <input type="text" id="email" className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Correo electrónico" />
      </div>
    </div>  

  )
}
