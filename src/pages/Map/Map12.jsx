/* eslint-disable react/prop-types */
/* import Mainmenu from "../global/Mainmenu"; */
/* import { Icon } from "leaflet"; */
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  CircleMarker,
  Popup,
  ScaleControl,
} from "react-leaflet";

import "./map.css";

import useLayers from "../../hooks/use-layers";
import MarkerClusterGroup from "react-leaflet-cluster";
import MinimapContros from "./controls/minimap";
import useLocations from "../../hooks/use-locations";
import { Filters } from "@/src/hooks/filter-store";
import usePictures from "@/src/hooks/use-pictures";
import GalerieID from "@/src/hooks/GalerieID-store";
import { MyMarkers } from "./map-features/MyMarkers";
import { CustomPopup } from "./map-features/CustomPopup";

const center = { lat: 35.505, lng: 9 };
const maxZoom = 17;

const Map = ({ ispanelOpen }) => {
  const { isLocationsShown, isPicturesShown } = useLayers((state) => state);
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const { Mission, Drone, From, To } = Filters((state) => state);

  const { currentGalerie } = GalerieID((state) => state);

  const { data: picturesData, isSuccess: picturesIsSuccess } = usePictures(
    Filters((state) => state)
  );

  const { data: locationsData, isSuccess: locationsIsSuccess } = useLocations(
    Filters((state) => state)
  );

  /* console.log(QueryClient.getQueryData(["dash"])); */
  const locations = [];
  const pictures = [];

  if (isLocationsShown && locationsIsSuccess && locationsData) {
    locations.push(
      ...locationsData.data.map((border) => ({
        type: "Feature",
        geometry: border.geometry,
        details: border,
        properties: border.mission,
        isPath: true,
      }))
    );
  }

  if (isPicturesShown && picturesIsSuccess && picturesData) {
    pictures.push(
      ...picturesData.data.map((border) => ({
        type: "Feature",
        geometry: border.geometry,
        details: border,
        properties: border.mission,
        isPath: true,
      }))
    );
  }

  const geoJsonData = {
    type: "FeatureCollection",
    locations,
    pictures,
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    alert(`Clicked at: ${lat}, ${lng}`);
  };

  return (
    <MapContainer
      center={center}
      zoom={9}
      style={{ height: "100%", width: "100%", zIndex: "0" }}
      maxZoom={maxZoom}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/*  <TileLayer url="https://sig.siat.at/SAT_IMAGES/vesat/{z}/{x}/{y}.jpg.tile" /> */}

      <MinimapContros position="bottomleft" />
      <ScaleControl imperial={false} position={"bottomright"} />
      {/* <MarkerClusterGroup chunkedLoading maxClusterRadius={50}> */}
      {geoJsonData.locations.map((address, index) => (
        <CircleMarker
          key={index}
          center={[
            address.geometry.coordinates[1],
            address.geometry.coordinates[0],
          ]}
          title={address.properties.name}
          radius="5"
          color="red"
          className="bg-lime-400"
          /* icon={address.isPath === true ? pin : pic} */
          // className="grayscale invert "
        >
          <Popup keepInView={true} minWidth={220}>
            <CustomPopup index={address.details.id} content={address} />
          </Popup>
        </CircleMarker>
      ))}
      {/* </MarkerClusterGroup> */}
      {!ispanelOpen ? (
        <MarkerClusterGroup chunkedLoading maxClusterRadius={40}>
          <MyMarkers
            geoJsonData={geoJsonData}
            currentGalerie={currentGalerie}
          />
        </MarkerClusterGroup>
      ) : (
        <MyMarkers
          geoJsonData={geoJsonData}
          currentGalerie={currentGalerie}
          ispanelOpen={ispanelOpen}
        />
      )}
      <MapEventsHandler handleMapClick={handleMapClick} hundle />
    </MapContainer>
  );
};

const MapEventsHandler = ({ handleMapClick }) => {
  useMapEvents({
    click: (e) => handleMapClick(e),
  });
  return null;
};

export { Map };
