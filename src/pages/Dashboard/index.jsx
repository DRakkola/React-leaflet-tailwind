import ChartLine from "./LineChart";
import Missions from "./Missions";
import Stats from "./Stats";
const Dashboard = () => {
    return (
      <div className="flex flex-col h-full w-full justify-around">
        <div className="flex flex-row h-3/5 justify-around">
          <div className=" w-1/2 h-full m-1">
            <ChartLine />
          </div>
          <div className=" w-2/5 h-full m-1">
            <Missions />
          </div>
        </div>
        <div className="flex flex-row">
          <Stats/>
        </div>
      </div>
    )
  }
  
  export default Dashboard;