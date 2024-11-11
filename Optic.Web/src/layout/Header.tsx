export const Header = () => {
   return (
      <div
         id="header"
         className="flex items-center justify-between p-4 border-b"
      >
         <div className="h-full flex flex-col items-center">
            <div className="shrink-0">
               <img
                  src="https://placehold.co/100?text=Kennedy"
                  alt="logo"
                  className="h-full rounded-full"
               />
            </div>
            <div className="shrink-0">
               <span>Optica Kennedy</span>
            </div>
         </div>

         <div className="h-full flex flex-col items-center">
            <div className="shrink-0">
               <img
                  src="https://placehold.co/100?text=Kennedy"
                  alt="logo"
                  className="h-full rounded-full"
               />
            </div>
            <div className="shrink-0">
               <span>DEIMER NUÑEZ</span>
            </div>
         </div>
      </div>
   );
};
