export const Sidebar = () => {
    return (
        <div id="sidebar" className="w-28 bg-gray-300 flex flex-col justify-between">
            <nav>
                <ul>
                    <li>
                        <a href={`/contacts/1`} className="w-auto block text-center align mx-1.5 my-1.5 bg-slate-500 px-1.5 py-1 rounded-md">
                        <img src="https://placehold.co/100x100?text=Icono" alt="logo" className="h-full rounded-full" />
                        <span>Inicio</span>
                        </a>
                    </li>
                    <li>
                        <a href={`/contacts/1`} className="w-auto block text-center align mx-1.5 my-1.5 bg-slate-500 px-1.5 py-1 rounded-md">
                        <img src="https://placehold.co/100x100?text=Clientes" alt="logo" className="h-full rounded-full" />
                        <span>Clientes</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
