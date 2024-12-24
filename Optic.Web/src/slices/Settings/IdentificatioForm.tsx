export  const IdentificationForm = () => {
    return (
        <>
        <form className="flex rounded-lg overflow-hidden">
           <input required
            autoComplete="off"
            name="name"
            placeholder="Identification"
            className="shadow appearance-none border rounded-tl-lg rounded-bl-lg  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 font-bold">
             Creando
        </button>
         </form>
         <div>
            <h3>Identificaion</h3>
            <div className="flex flex-col">
            </div>
         </div>
      </>
    )
}