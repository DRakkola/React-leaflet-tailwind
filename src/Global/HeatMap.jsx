import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import features from "@/src/assets/TN-delegations.json"
import useDissionsDetails from "../hooks/use-missionsDetails";
const MapChart = ({id}) => {
  const { data: missionsDetails, isSuccess:  MissionDetailsIsSuccess} = useDissionsDetails(id)


  // eslint-disable-next-line no-unused-vars
  const [position, setPosition] = useState({ coordinates: [10, 34], zoom: 25});
  

  const colorScale = scaleQuantize()
  .domain([1, 100])
  .range([
    "#13294B",  // Dark Blue
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
  ]);
  
  if(!MissionDetailsIsSuccess) {
    
    return (
      
      <ComposableMap >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          >
          <Geographies geography={features} >
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} 
                style={{
                  default: {
                    fill:'#13294B',
                    outline: 'none'
                  },
                  hover: { outline: "none" },
                }}
                
                fill={colorScale(geo.properties.intensity)}/>
                ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>


    
    )
  }

  return (
    
 
      <ComposableMap >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          >
          <Geographies geography={missionsDetails} >
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} 
                style={{
                  default: {
                    outline: 'none'
                  },
                  hover: { outline: "none" },
                }}
                
                fill={colorScale(geo.properties.intensity)}/>
                ))
              }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>



  );
};

export default MapChart;
