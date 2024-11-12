import { Avatar } from "./Avatar";
import { Logo } from "./Logo";

export const Header = () => {
   return (
      <div
         id="header"
         className="flex items-center justify-between p-4 border-b bg-white"
      >
         <Logo />
         <Avatar />
      </div>
   );
};
