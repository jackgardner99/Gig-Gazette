import { Marker, Popup } from 'react-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import { useMap } from 'react-leaflet/hooks'
import { useEffect, useState } from 'react'
import { getVenues } from '../../services/venuesService'

export const MapPage = () => {
    const [venues, setVenues] = useState([])

    useEffect(() => {
        getVenues().then(setVenues)
    }, [])

    return (
        <div>
            <MapContainer className="leaflet-container" center={[36.1627, -86.7816]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {venues.map((venue) => {
                    return (
                    <Marker position={venue.geoCode}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    )
                })}
                
            </MapContainer>
        </div>
        
    )
}