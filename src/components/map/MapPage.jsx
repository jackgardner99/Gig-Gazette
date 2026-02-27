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
import { getOpenMics } from '../../services/eventService'

export const MapPage = () => {
    const [artistShows, setArtistShows] = useState([])
    const [openMics, setOpenMics] = useState([])
    const [displayOpenMics, setDisplayOpenMics] = useState(false)
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState(0)
    const [filteredShows, setFilteredShows] = useState([])
    const [search, setSearch] = useState("")
    const [eventIsVisible, setEventIsVisible] = useState(false)
    const [selectedShow, setSelectedShow] = useState(null)
    const [intimate, setIntimate] = useState(false)
    const mapContainerRef = useRef(null)

    useEffect(() => {
        getArtistShows().then(setArtistShows)
        getGenres().then(setGenres)
        getOpenMics().then(setOpenMics)
    }, [])

    useEffect(() => {
        let shows = [...artistShows]
        if (genre > 0) {
            shows = shows.filter((show) => show.artist?.genreId === genre)
        }

        if (intimate) {
            shows = shows.filter((show) => show.intimate === true)
        }

        if (search) {
            shows = shows.filter((show) => show.artist.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (displayOpenMics) {
            shows = [...openMics]
        }

        if(!eventIsVisible) {
            const timer = setTimeout(() => {
                setFilteredShows(shows)
            }, 300)

            return () => clearTimeout(timer)
        }

    }, [artistShows, genre, search, eventIsVisible, displayOpenMics, openMics, intimate])

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

    const formatTime = (timeString) => {
        if (!timeString) return '';

        const [hours, minutes] = timeString.split(':').map(Number)
        const period = hours >= 12 ? 'PM' : 'AM'
        const h12 = hours % 12 || 12
        return `${h12}:${String(minutes).padStart(2, '0')} ${period}`
    }

    const handleEventVisible = (show) => {
        setEventIsVisible(true)
        setSelectedShow(show)
    }

    const handleEventInvisible = () => {
        setEventIsVisible(false)
    }

    return (
        <div className='map-page-container'>
            <div className='gig-filter-container'>
                <h2>The Gig Map</h2>
                <div className='filter-group'>
                    <p>Search</p>
                    {displayOpenMics ? (
                        <input disabled placeholder='Search Artist' />
                    ) : (
                        <input type="text" placeholder="Search Artist" onChange={(e) => {
                        setSearch(e.target.value)
                    }} />
                    )}
                </div>
                <div className='filter-group'>
                    <p>Genre</p>
                    {displayOpenMics ? (
                        <select disabled>
                            <option>Please Select Genre</option>
                        </select>
                    ) : (
                        <select onChange={(e) => {
                        setGenre(parseInt(e.target.value))
                    }}>
                        <option value="0" >Please select genre</option>
                        {genres.map((genre) => {
                            return <option value={genre.id} key={genre.id}>{genre.name}</option>
                        })}
                    </select>
                    )}
                    
                </div>
                <div>
                    {displayOpenMics ? (
                        <>
                            <input type='checkbox' disabled /> Intimate Set
                        </>
                    ) : (<>
                        <input type='checkbox' checked={intimate} onChange={(e) => {
                            setIntimate(e.target.checked)
                        }}/> Intimate Set
                    </>   
                    )}
                </div>
                <div>
                    <input type='checkbox' checked={displayOpenMics} onChange={(e) => setDisplayOpenMics(e.target.checked)} /> Open Mics
                </div>
            </div>
            <div className='map-container' ref={mapContainerRef}>
                {eventIsVisible && <div className='map-blocker' onClick={handleEventInvisible} />}

                {mapContainerRef.current && createPortal(    
                        <div className={`popup-overlay ${eventIsVisible ? 'active' : ''}`}>
                                    {selectedShow && (
                                        <div>
                                        <h2>{selectedShow.eventTitle}</h2>
                                        {selectedShow.artistId ? (
                                            <div>{selectedShow.artist?.name}</div>
                                        ) : (
                                            ""
                                        )}
                                        {selectedShow.dateTime ? (
                                            <div>{formatDateTime(selectedShow.dateTime)}</div>
                                        ) : (<>
                                            <div>{selectedShow.dayOfWeek}s</div>
                                            <div>{formatTime(selectedShow.time)}</div>                                        
                                        </>
                                        )}
                                        <div>@{selectedShow.venue?.venueName}</div>
                                        {selectedShow.artistId ? (
                                            <div>
                                                <button>Get Tickets</button>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <button className='close-btn' onClick={handleEventInvisible}>X</button>
                                    </div>  
                                    )}
                                </div>,
                        mapContainerRef.current
                    )
                }
                <div>
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
                                            <div>{show.eventTitle}</div>
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
        </div>
        
    )
}