import { Marker, Popup } from 'react-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import { useMap } from 'react-leaflet/hooks'
import { useEffect, useRef, useState } from 'react'
import { getArtistShows } from '../../services/artistShowsService'
import { Link } from 'react-router-dom'
import { getGenres } from '../../services/genreService'
import { createPortal } from 'react-dom'

export const MapPage = () => {
    const [artistShows, setArtistShows] = useState([])
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState(0)
    // const [bandShowOnly, setBandShowOnly] = useState(false)
    // const [artistShowOnly, setArtistShowOnly] = useState(false)
    const [filteredShows, setFilteredShows] = useState([])
    const [search, setSearch] = useState("")
    const [eventIsVisible, setEventIsVisible] = useState(false)
    const [selectedShow, setSelectedShow] = useState(null)
    const mapContainerRef = useRef(null)

    useEffect(() => {
        getArtistShows().then(setArtistShows)
        getGenres().then(setGenres)
    }, [])

    useEffect(() => {
        let shows = [...artistShows]
        if (genre > 0) {
            shows = shows.filter((show) => show.artist?.genreId === genre)
        }

        if (search) {
            shows = shows.filter((show) => show.artist.artistName.toLowerCase().includes(search.toLowerCase()))
        }

        if(!eventIsVisible) {
            const timer = setTimeout(() => {
                setFilteredShows(shows)
            }, 300)

            return () => clearTimeout(timer)
        }

    }, [artistShows, genre, search, eventIsVisible])



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

    const handleEventVisible = (show) => {
        setEventIsVisible(true)
        setSelectedShow(show)
    }

    const handleEventInvisible = () => {
        setEventIsVisible(false)
    }

    return (
        <div className='section'>
            <div className='showcase-main'>
                <h2 className='about-header-gig-map'>GIG Gazette</h2>
                <div className='form-group'>
                    <select onChange={(e) => {
                        setGenre(parseInt(e.target.value))
                    }}>
                        <option value="0" >Please select genre</option>
                        {genres.map((genre) => {
                            return <option value={genre.id} key={genre.id}>{genre.name}</option>
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <input type="text" placeholder="Search Artist" onChange={(e) => {
                        setSearch(e.target.value)
                    }} />
                </div>
            </div>
            <div className='showcase-main-map' ref={mapContainerRef}>
                {eventIsVisible && <div className='map-blocker' onClick={handleEventInvisible} />}

                {mapContainerRef.current && createPortal(    
                        <div className={`popup-overlay ${eventIsVisible ? 'active' : ''}`}>
                                    {selectedShow && (
                                        <div>
                                        <h2>{selectedShow.eventTitle}</h2>
                                        <div>{selectedShow.artist?.artistName}</div>
                                        <div>{formatDateTime(selectedShow.dateTime)}</div>
                                        <div>@{selectedShow.venue?.venueName}</div>
                                        <div>
                                            <button>Get Tickets</button>
                                        </div>
                                        <button className='close-btn' onClick={handleEventInvisible}>X</button>
                                    </div>  
                                    )}
                                </div>,
                        mapContainerRef.current
                    )
                }
                <MapContainer center={[36.1627, -86.7816]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredShows.map((show) => {
                    return (
                        <>
                    <Marker position={[show.venue?.lat, show.venue?.lng]}>
                                <Popup>
                                    <div className='logo-text'>{show.eventTitle}</div>
                                    <div>{formatDateTime(show.dateTime)}</div>
                                    <button onClick={() => {
                                        handleEventVisible(show)
                                    }}>Event Details</button>
                                </Popup>                                
                </Marker>
                    </>
                    )
                })}
                
            </MapContainer>
            </div>        
        </div>
        
    )
}