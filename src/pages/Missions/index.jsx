import { ComposableMap, Geographies, Geography } from "react-simple-maps"

import features from "@/src/assets/TN-delegations.json"
const Missions = () => {
    return (
      
      <ComposableMap>
      <Geographies geography={features}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.id} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
    )
  }
  
  export default Missions;

