import { Outlet } from "react-router-dom";
import SideBar from "../layouts/SideBar";
import Header from "./Header";
const MainLayout = () => {
  return (
    <div className="flex flex-col w-full h-full">
      {/* <div className="flex flex-row w-full h-12 bg-slate-400">
        <Header />
      </div> */}

      <div
        className=" h-full w-full flex flex-row justify-start m-0"
        id="sidebar"
      >
        <SideBar full={true} />
        <div className="w-full pt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
