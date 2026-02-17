import { Marker, Popup } from 'react-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import { useMap } from 'react-leaflet/hooks'
import { useEffect, useState } from 'react'
import { getArtistShows } from '../../services/artistShowsService'

export const MapPage = () => {
    const [artistShows, setArtistShows] = useState([])

    useEffect(() => {
        getArtistShows().then(setArtistShows)
    }, [])

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return ""
        
        const date = new Date(dateTimeString)
        
        return date.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    return (
        <div>
            <MapContainer className="leaflet-container" center={[36.1627, -86.7816]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {artistShows.map((show) => {
                    return (
                    <Marker position={[show.venue?.lat, show.venue?.lng]} {...console.log(show.eventTitle)}>
                        <Popup>
                            <div>{show.eventTitle}</div>
                            <div>{formatDateTime(show.dateTime)}</div>
                        </Popup>
                    </Marker>
                    )
                })}
                
            </MapContainer>
        </div>
        
    )
}