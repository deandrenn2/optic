import { faHouse, faUser, faUsers, faGear, faTruck, faMoneyCheckDollar, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from './MenuItem';
export const Sidebar = () => {
   return (
      <div
         id="sidebar"
         className=" bg-white p-4 border-r"
      >
         <nav>
            <ul className="space-y-1">
               <MenuItem icon={faHouse} path='/' text='Inicio' />
               <MenuItem icon={faUser} path='/clientes' text='Clientes' />
               <MenuItem icon={faUsers} path='/Suppliers' text='Proveedores' />
               <MenuItem icon={faTruck} path='/Products' text='Productos' />
               <MenuItem icon={faClipboardCheck} path='/formulas' text='Formulas' />
               <MenuItem icon={faMoneyCheckDollar} path='/Facturación' text='Facturación' />
               <MenuItem icon={faGear} path='/Settings' text='Configuraciones' />
            </ul>
         </nav>
      </div>
   );
};
