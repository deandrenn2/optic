import { Avatar } from "./Avatar";
import { Logo } from "./Logo";

export const Header = () => {
   return (
      <div
         id="header"
         className="flex items-center justify-between p-2 border-b bg-white fixed top-0 left-0 right-0 z-50 shadow-sm"
      >
         <Logo />
         <Avatar />
      </div>
   );
};
