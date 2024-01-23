
import { Outlet } from 'react-router-dom';
import SideBar from '../Global/SideBar';

const MainLayout = () => {
  return (
    <div className=' h-full w-full flex flex-row justify-start m-0' id='sidebar'>

        <SideBar full={true}/>
        <Outlet />
    </div>
  )
}

export default MainLayout;