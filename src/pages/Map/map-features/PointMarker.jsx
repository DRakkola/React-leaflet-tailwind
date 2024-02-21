import {
  CircleMarker,
  Popup, useMap
} from "react-leaflet";
import { useEffect, useRef } from "react";
import { CustomPopup } from "./CustomPopup";

export const PointMarker = ({ center, address, openPopup, markerColor, ispanelOpen }) => {
  const map = useMap();
  const markerRef = useRef(null);


  useEffect(() => {
    if (openPopup && ispanelOpen) {
      
      map.flyToBounds([center]);
      
      markerRef.current.openPopup();
    }
  }, [map, center, openPopup]);

  return (
    <CircleMarker
      center={center}
      title={address.properties.name}
      radius="5"
      ref={markerRef}
      eventHandlers={{
        click(e) {
          const location = e.target.getLatLng();
          map.flyToBounds([location]);

        },
      }}
      color={markerColor}
      fillColor={markerColor}

    >
      <Popup keepInView={true} minWidth={220} className="bg-transparent" >
        <CustomPopup index={address.details.id} content={address} />
      </Popup>
    </CircleMarker>
  );
};
