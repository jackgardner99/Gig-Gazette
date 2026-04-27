import { Marker, Popup } from 'react-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { getArtistShows } from '../../services/artistShowsService'
import { getGenres } from '../../services/genreService'
import { getOpenMics } from '../../services/eventService'
import { getVenues } from '../../services/venuesService'

export const MapPage = () => {
    const [venues, setVenues] = useState([])
    const [artistShows, setArtistShows] = useState([])
    const [openMics, setOpenMics] = useState([])
    const [genres, setGenres] = useState([])
    const [search, setSearch] = useState("")
    const [displayOpenMics, setDisplayOpenMics] = useState(false)
    const [selectedVenue, setSelectedVenue] = useState(null)
    const [overlayVisible, setOverlayVisible] = useState(false)

    useEffect(() => {
        getGenres().then(data => setGenres(Array.isArray(data) ? data : (data?.results ?? [])))
        getVenues().then(data => setVenues(Array.isArray(data) ? data : (data?.results ?? [])))
        getArtistShows().then(data => setArtistShows(Array.isArray(data) ? data : (data?.results ?? [])))
        getOpenMics().then(data => setOpenMics(Array.isArray(data) ? data : (data?.results ?? [])))
    }, [])

    const formatDate = (dateStr) => {
        if (!dateStr) return ""
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
    }

    const formatTime = (timeString) => {
        if (!timeString) return ''
        const [hours, minutes] = timeString.split(':').map(Number)
        const period = hours >= 12 ? 'PM' : 'AM'
        const h12 = hours % 12 || 12
        return `${h12}:${String(minutes).padStart(2, '0')} ${period}`
    }

    const handleViewEvents = (venue) => {
        setSelectedVenue(venue)
        setOverlayVisible(true)
    }

    const handleCloseOverlay = () => {
        setOverlayVisible(false)
        setSelectedVenue(null)
    }

    const filteredVenues = venues.filter((venue) => {
        if (search) return venue.name.toLowerCase().includes(search.toLowerCase())
        return true
    })

    const venueEvents = selectedVenue
        ? (displayOpenMics ? openMics : artistShows).filter(e => e.venue.id === selectedVenue.id)
        : []

    return (
        <div className='map-wrapper'>
            <div className='filter-panel'>
                <h2>The Gig Map</h2>
                <div className='search-field'>
                    <p>Search</p>
                    <input
                        type="text"
                        placeholder="Search Venue"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className='search-field'>
                    <p>Genre</p>
                    {displayOpenMics ? (
                        <select disabled>
                            <option>Please Select Genre</option>
                        </select>
                    ) : (
                        <select>
                            <option value="0">Please select genre</option>
                            {genres.map((genre) => (
                                <option value={genre.id} key={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                    )}
                </div>
                <div className='search-field'>
                    <input
                        type='checkbox'
                        checked={displayOpenMics}
                        onChange={(e) => setDisplayOpenMics(e.target.checked)}
                    /> Open Mics
                </div>
            </div>

            <div className='map-container'>
                {overlayVisible && <div className='map-blocker' onClick={handleCloseOverlay} />}

                <div className={`popup-overlay ${overlayVisible ? 'active' : ''}`}>
                    {selectedVenue && (
                        <div>
                            <button className='close-btn' onClick={handleCloseOverlay}>X</button>

                            <h2>{selectedVenue.name}</h2>
                            <div>Noise Level: {selectedVenue.noise_level}</div>
                            <div>
                                {selectedVenue.bar && <span>Bar </span>}
                                {selectedVenue.food && <span>Food </span>}
                                {selectedVenue.kid_friendly && <span>Kid Friendly </span>}
                                {selectedVenue.parking && <span>Parking</span>}
                            </div>

                            <hr />

                            {venueEvents.length === 0 ? (
                                <div>No {displayOpenMics ? 'open mics' : 'shows'} at this venue.</div>
                            ) : (
                                venueEvents.map((event) => (
                                    <div key={event.id}>
                                        <div><strong>{event.event_title}</strong></div>
                                        {displayOpenMics ? (
                                            <>
                                                <div>{event.weekly_recurrence || event.monthly_recurrence}</div>
                                                <div>{formatTime(event.start_time)} – {formatTime(event.end_time)}</div>
                                            </>
                                        ) : (
                                            <>
                                                <div>{formatDate(event.date)}</div>
                                                <div>{formatTime(event.start_time)} – {formatTime(event.end_time)}</div>
                                            </>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                <MapContainer center={[36.1627, -86.7816]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredVenues.map((venue) => (
                        <Marker key={venue.id} position={[parseFloat(venue.lat), parseFloat(venue.lng)]}>
                            <Popup>
                                <div><strong>{venue.name}</strong></div>
                                <div>Noise Level: {venue.noise_level}</div>
                                <div>
                                    {venue.bar && <span>Bar </span>}
                                    {venue.food && <span>Food </span>}
                                    {venue.kid_friendly && <span>Kid Friendly </span>}
                                    {venue.parking && <span>Parking</span>}
                                </div>
                                <button onClick={() => handleViewEvents(venue)}>
                                    View {displayOpenMics ? 'Open Mics' : 'Shows'}
                                </button>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    )
}
