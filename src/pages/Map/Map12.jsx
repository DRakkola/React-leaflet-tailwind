/* eslint-disable react/prop-types */
/* import Mainmenu from "../global/Mainmenu"; */
/* import { Icon } from "leaflet"; */
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
  ScaleControl,
} from "react-leaflet";
import "./map.css";
/* import Filter_control from "./controls/Filter_controls";
import useLocations from "../../hooks/use-locations";
import usePictures from "../../hooks/use-pictures";
import Layer_controls from "./controls/Layer_controls";
import useLayers from "../../hooks/use-layers"; */
import MarkerClusterGroup from "react-leaflet-cluster";
import MinimapContros from "./controls/minimap";

function customPopup(index) {
  return (
    <div className="customPopup" key={index}>
      <figure>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/A-10_Sukiennice_w_Krakowie_Krak%C3%B3w%2C_Rynek_G%C5%82%C3%B3wny_MM.jpg/1920px-A-10_Sukiennice_w_Krakowie_Krak%C3%B3w%2C_Rynek_G%C5%82%C3%B3wny_MM.jpg"
          alt="Kraków"
          width="100%"
        />
        <figcaption>Source: wikipedia.org</figcaption>
      </figure>
      <div>
        Kraków,[a] also written in English as Krakow and traditionally known as
        Cracow, is the second-largest and one of the oldest cities in Poland.
        Situated on the Vistula River in Lesser Poland Voivodeship...{" "}
        <a
          href="https://en.wikipedia.org/wiki/Krak%C3%B3w"
          target="_blank"
          rel="noreferrer"
        >
          → show more
        </a>
      </div>
    </div>
  );
}

const Map = () => {
  /* const { isLocationsShown, isPicturesShown } = useLayers((state) => state);
  // eslint-disable-next-line no-unused-vars
  const { data: locationsData, isSuccess: locationsIsSuccess } = useLocations();
  // eslint-disable-next-line no-unused-vars
  const { data: picturesData, isSuccess: picturesIsSuccess } = usePictures(); */

  const features = [];

  /* if (isLocationsShown && locationsData?.locations) {
    features.push(
      ...locationsData.locations.map((border) => ({
        type: "Feature",
        geometry: border.geometry,
        properties: border.properties,
        isPath: true,
      }))
    );
  }

  if (isPicturesShown && picturesData?.pictures) {
    features.push(
      ...picturesData.pictures.map((border) => ({
        type: "Feature",
        geometry: border.geometry,
        properties: border.properties,
        isPath: false,
      }))
    );
  } */

  const geoJsonData = {
    type: "FeatureCollection",
    features,
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    alert(`Clicked at: ${lat}, ${lng}`);
  };
  /* const pin = new Icon({
    iconUrl: "src/assets/map-pin.svg",
    iconSize: [25, 25],
  });
  const pic = new Icon({
    iconUrl: "src/assets/image.svg",
    iconSize: [25, 25],
  }); */

  return (
    <>
{/*       <div className="absolute z-10 top-20 left-3">
        <Mainmenu />
      </div>
      <div className="absolute flex flex-col top-3 right-3 z-10 h-fit mt-2 mb-2 align-between">
        <Layer_controls />
        <Filter_control />
      </div> */}
      <MapContainer
        center={{ lat: 35.505, lng: 9 }}
        zoom={9}
        style={{ height: "100%", width: "100%", zIndex: "0" }}
        maxZoom={20}
        
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <TileLayer url="http://localhost/data/{z}/{x}/{y}.jpg.tile" /> */}
       {/*  <TileLayer url="https://sig.siat.at/SAT_IMAGES/vesat/{z}/{x}/{y}.jpg.tile" /> */}
        {/* {geoJsonData.features.map((feature, index) => (
          locationsIsSuccess && <GeoJSON key={index} data={feature} />
        ))} */}
        <MinimapContros position="bottomleft" />
        <ScaleControl imperial={false} position={"bottomright"} />
        <MarkerClusterGroup chunkedLoading maxClusterRadius={50}>
          {geoJsonData.features.map((address, index) => (
            <Marker
              key={index}
              position={[
                address.geometry.coordinates[1],
                address.geometry.coordinates[0],
              ]}
              title={address.properties.mission.properties.name}
              /* icon={address.isPath === true ? pin : pic} */
              // className="grayscale invert "
            >
              <Popup keepInView={true} minWidth={220}>
                {address.isPath === false ? (
                  customPopup(index)
                ) : (
                  <>
                    <h1>{address.properties.mission.properties.name}</h1>
                    <h2>{address.properties.timestamp}</h2>
                    <p>{address.geometry.coordinates[1]}</p>
                    <p>{address.geometry.coordinates[0]}</p>
                  </>
                )}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <MapEventsHandler handleMapClick={handleMapClick} hundle />
      </MapContainer>
    </>
  );
};
const MapEventsHandler = ({ handleMapClick }) => {
  useMapEvents({
    click: (e) => handleMapClick(e),
  });
  return null;
};
export  {Map};
