import { PointMarker } from "./PointMarker";

export const MyMarkers = ({ geoJsonData, currentGalerie, ispanelOpen }) => {
  console.log(currentGalerie);
  return geoJsonData.pictures.map((address, index) => (
    <PointMarker
      key={index}
      address={address}
      center={{
        lat: address.geometry.coordinates[1],
        lng: address.geometry.coordinates[0],
      }}
      openPopup={currentGalerie === address.details.id}
      markerColor={currentGalerie === address.details.id ? "blue" : "blue"}
      ispanelOpen={ispanelOpen}
      
      />
      
  ));
};
