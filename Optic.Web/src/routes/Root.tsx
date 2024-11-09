import { Header } from "../layout/Header"
import { Sidebar } from "../layout/Sidebar"
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <div id="container">
            <Header />
            <div id="main" className="flex ">
                <Sidebar />
                <div id="detail" className=" w-full">
                    <Outlet />
                </div>
            </div>
        </div>

    );
}