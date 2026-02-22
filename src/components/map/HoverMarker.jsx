import { useMemo, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import { MapInfoExpansion } from "./MapInfoExpansion";

export const HoverMarker = ({position, children}) => {
    const markerRef = useRef();
    const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Define the event handlers
  const eventHandlers = useMemo(
    () => ({
      mouseover() {
        if (markerRef.current) {
          markerRef.current.openPopup();
        }
      },
      mouseout() {
        if (markerRef.current) {
          markerRef.current.closePopup();
        }
      },
    }),
    []
  );

      const openPopup = () => {
        setIsPopupOpen(true)
    }

    const closePopup = () => {
        setIsPopupOpen(false)
    }


  return (
    <Marker
      position={position}
      eventHandlers={eventHandlers}
      ref={markerRef}
      onClick={openPopup}
    >
        <MapInfoExpansion isOpen={isPopupOpen} onClose={closePopup}>
            <div>Hello!</div>
        </MapInfoExpansion>
      <Popup closeButton={false} autoPan={false}>
        {children}
      </Popup>
    </Marker>
  );
}