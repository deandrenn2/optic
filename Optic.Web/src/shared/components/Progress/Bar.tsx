import { useEffect, useState } from "react";
import { sleep } from "../Utils";
import "./Bar.css"
export const Bar = ({ Title, Await = 1 }: { Title?: string, Await?: number }) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await sleep(Await);
    setRender(true);
  }

  if (render)
    return (
      <>
        <p className="text-center mb-1 text-gray-500 font-bold">{Title || "Cargando..."}</p >
        <div className='w-full'>
          <div className='h-1.5 w-full bg-blue-200 overflow-hidden'>
            <div className='progress w-full h-full bg-blue-500 left-right'></div>
          </div>
        </div>
      </>
    )
}
