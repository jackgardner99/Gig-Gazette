import { useMemo, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import L from 'leaflet';

export const HoverMarker = ({position, children}) => {
    const markerRef = useRef();

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

  return (
    <Marker
      position={position}
      eventHandlers={eventHandlers}
      ref={markerRef}
    >
      <Popup closeButton={false} autoPan={false}>
        {children}
      </Popup>
    </Marker>
  );
}