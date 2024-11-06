export const Sidebar = () => {
    return (
        <div id="sidebar" className="w-28 bg-gray-300 flex flex-col justify-between">
            <nav>
                <ul>
                    <li>
                        <a href={`/`} className="w-auto block text-center align mx-1.5 my-1.5 bg-slate-500 px-1.5 py-1 rounded-md">
                            <img src="https://placehold.co/100x100?text=Icono" alt="logo" className="h-full rounded-full" />
                            <span>Inicio</span>
                        </a>
                    </li>
                    <li>
                        <a href={`/clientes`} className="w-auto block text-center align mx-1.5 my-1.5 bg-slate-500 px-1.5 py-1 rounded-md">
                            <img src="https://placehold.co/100x100?text=Clientes" alt="logo" className="h-full rounded-full" />
                            <span>Clientes</span>
                        </a>
                    </li>
                    <li>
                        <a href={`/proveedores`} className="w-auto block text-center align mx-1.5 my-1.5 bg-slate-500 px-1.5 py-1 rounded-md">
                            <img src="https://placehold.co/100x100?text=Proveedores" alt="logo" className="h-full rounded-full" />
                            <span>Proveedores</span>
                        </a>
                    </li>
                    <li>
                        <a href={`/proveedores`} className="w-auto block text-center align mx-1.5 my-1.5 bg-slate-500 px-1.5 py-1 rounded-md">
                            <img src="https://placehold.co/100x100?text=Formulas" alt="logo" className="h-full rounded-full" />
                            <span>Formulas</span>
                        </a>
                    </li>
                    <li>
                        <a href={`/proveedores`} className="w-auto block text-center align mx-1.5 my-1.5 bg-slate-500 px-1.5 py-1 rounded-md">
                            <img src="https://placehold.co/100x100?text=Facturación" alt="logo" className="h-full rounded-full" />
                            <span>Facturación</span>
                        </a>
                    </li>
                    <li>
                        <a href={`/proveedores`} className="w-auto block text-center align mx-1.5 my-1.5 bg-slate-500 px-1.5 py-1 rounded-md">
                            <img src="https://placehold.co/100x100?text=Configuraciones" alt="logo" className="h-full rounded-full" />
                            <span>Configuraciones</span>
                        </a>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
