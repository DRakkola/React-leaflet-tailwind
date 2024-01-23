
import { Outlet } from 'react-router-dom';
import SideBar from '../Global/SideBar';

const MapLayout = () => {
  return (
    <div className=' h-full w-full  m-0'>
        <div className='z-30 absolute'>

        <SideBar full={false}/>
        </div>
        <Outlet />
    </div>
  )
}

export default MapLayout;