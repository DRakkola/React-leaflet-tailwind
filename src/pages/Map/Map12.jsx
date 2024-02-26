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
  Marker,
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
import { useLiveData } from "@/src/hooks/use-live";
import L from "leaflet";

const center = { lat: 35.505, lng: 9 };
const maxZoom = 17;
function customMarkerIcon() {
  const svgTemplate = `
  <svg width="64px" height="64px" viewBox="0 0 91 91" enable-background="new 0 0 91 91" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.546"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M70.385,38.117c-0.097-0.265-0.323-0.462-0.599-0.522c-0.274-0.06-0.563,0.025-0.762,0.225l-17.01,17.005 c-0.3,0.304-0.325,0.783-0.056,1.11L69.93,77.91c1.856,1.829,3.598,2.758,5.179,2.758l0,0c2.135,0,3.848-1.717,4.983-2.851 c3.18-3.191,2.592-5.448,1.776-8.567L70.385,38.117z" fill="#45596B"></path> <path d="M35.268,39.158c0.154,0.126,0.34,0.188,0.525,0.188c0.212,0,0.425-0.082,0.585-0.242l16.953-16.957 c0.199-0.198,0.282-0.486,0.223-0.761c-0.061-0.275-0.256-0.501-0.519-0.6L21.956,9.209c-1.256-0.333-2.444-0.646-3.607-0.646 c-1.175,0-2.798,0.275-4.936,2.421c-2.689,2.692-4.72,5.497-0.036,10.246L35.268,39.158z" fill="#45596B"></path> <path d="M89.033,2.202c-1.482-1.484-3.347-1.796-4.646-1.796c-2.35,0-4.752,1-6.424,2.676L36.846,44.155 c-0.07,0.046-0.159,0.11-0.203,0.153L21.766,59.155c-0.486,0.481-1.189,0.676-1.858,0.513L5.394,56.037 c-0.553-0.141-0.912-0.199-1.236-0.199c-0.623,0-1.119,0.227-1.594,0.755c-0.057,0.066-0.241,0.256-0.477,0.484 c-1.44,1.396-1.691,1.999-1.746,2.403c-0.044,0.331,0.112,0.654,0.4,0.826L19.256,71.2c0.284,0.169,0.524,0.41,0.695,0.695 l10.904,18.526c0.152,0.257,0.427,0.406,0.713,0.406c0.092,0,0.185-0.016,0.275-0.047c0.358-0.127,1.032-0.481,2.758-2.121 c0.292-0.298,0.417-0.491,0.464-0.568c0.097-0.146,0.146-0.323,0.136-0.503c-0.006-0.104-0.114-0.656-0.226-1.185l-3.444-15.192 c-0.149-0.656,0.046-1.333,0.521-1.812l15.099-15.155c0.031-0.038,0.089-0.143,0.112-0.186L88.067,13.19 C90.891,10.363,91.98,5.153,89.033,2.202z" fill="#647F94"></path> </g> </g> </g></svg>`;

  return new L.DivIcon({
    className: "test",
    html: svgTemplate,
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16],
  });
}
function customMarkerIconTarget() {
  const svgTemplate = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" width="64px" height="64px" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="244.096" y="178.545" width="23.817" height="158.856"></rect> <rect x="176.584" y="246.049" width="158.856" height="23.817"></rect> <g> <polygon style="fill:#E21B1B;" points="49.594,170.677 1.961,170.677 1.961,3.914 176.536,3.914 176.536,51.547 49.594,51.547 "></polygon> <polygon style="fill:#E21B1B;" points="343.276,47.633 343.276,0 510.039,0 510.039,174.591 462.406,174.591 462.406,47.633 "></polygon> <polygon style="fill:#E21B1B;" points="49.594,345.237 1.961,345.237 1.961,512 176.536,512 176.536,464.367 49.594,464.367 "></polygon> <polygon style="fill:#E21B1B;" points="343.276,464.367 343.276,512 510.039,512 510.039,337.417 462.406,337.417 462.406,464.367 "></polygon> </g> </g></svg>`;
  return new L.DivIcon({
    className: "test",
    html: svgTemplate,
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16],
  });
}

const Map = ({ ispanelOpen }) => {
  const { isLocationsShown, isPicturesShown, isLiveShown, setIsLiveShown } =
    useLayers((state) => state);
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

  const { data: liveData, isSuccess: liveIsSuccess } = useLiveData();

  /* console.log(QueryClient.getQueryData(["dash"])); */
  const locations = [];
  const pictures = [];
  const live_aircraft = [];
  const live_target = [];
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
      {isLiveShown &&
        liveIsSuccess &&
        liveData.map((address, index) => (
          <>
            <Marker
              key={address.id}
              position={{
                lat: address.aircraft_lat,
                lng: address.aircraft_lon,
              }}
              title={address.time}
              icon={customMarkerIcon()}
            >
              <Popup>{address.time}</Popup>
            </Marker>
            <Marker
              key={address.id}
              position={{
                lat: address.target_lat,
                lng: address.target_lon,
              }}
              title={address.time}
              icon={customMarkerIconTarget()}
            >
              <Popup>{address.time}</Popup>
            </Marker>
          </>
        ))}
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
