import { Marker, Popup, useMap } from 'react-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import L from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import { getArtistShows } from '../../services/artistShowsService'
import { getOpenMics, getWritersRounds } from '../../services/eventService'
import { getVenues } from '../../services/venuesService'
import { reverseGeocode } from '../../services/geocodeService'

const makeFaIcon = (faClass, color) => L.divIcon({
    html: `<div style="background:${color};width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.45);">
               <i class="${faClass}" style="color:#fff;font-size:15px;"></i>
           </div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
})

const makeCombinedFaIcon = (faClass1, color1, faClass2, color2) => L.divIcon({
    html: `<div style="display:flex;gap:3px;">
               <div style="background:${color1};width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 5px rgba(0,0,0,0.4);">
                   <i class="${faClass1}" style="color:#fff;font-size:12px;"></i>
               </div>
               <div style="background:${color2};width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 5px rgba(0,0,0,0.4);">
                   <i class="${faClass2}" style="color:#fff;font-size:12px;"></i>
               </div>
           </div>`,
    className: '',
    iconSize: [55, 26],
    iconAnchor: [27, 13],
    popupAnchor: [0, -15],
})

const showIcon = makeFaIcon('fas fa-star', '#e8a020')
const openMicIcon = makeFaIcon('fas fa-microphone', '#7c3aed')
const writersRoundIcon = makeFaIcon('fas fa-pen', '#db2777')
const openMicAndWritersIcon = makeCombinedFaIcon('fas fa-microphone', '#7c3aed', 'fas fa-pen', '#db2777')
const restaurantIcon = makeFaIcon('fas fa-utensils', '#16a34a')

const MapFlyTo = ({ venue }) => {
    const map = useMap()
    useEffect(() => {
        if (venue) {
            map.flyTo([parseFloat(venue.lat), parseFloat(venue.lng)], 17, { duration: 1 })
        }
    }, [venue, map])
    return null
}

export const MapPage = () => {
    const [venues, setVenues] = useState([])
    const [artistShows, setArtistShows] = useState([])
    const [openMics, setOpenMics] = useState([])
    const [writersRounds, setWritersRounds] = useState([])
    const [search, setSearch] = useState("")
    const [displayOpenMics, setDisplayOpenMics] = useState(false)
    const [displayWritersRounds, setDisplayWritersRounds] = useState(false)
    const [selectedVenue, setSelectedVenue] = useState(null)
    const [overlayVisible, setOverlayVisible] = useState(false)

    const [noiseFilter, setNoiseFilter] = useState("")
    const [filterBar, setFilterBar] = useState(false)
    const [filterFood, setFilterFood] = useState(false)
    const [filterKidFriendly, setFilterKidFriendly] = useState(false)
    const [filterParking, setFilterParking] = useState(false)
    const [popupVenue, setPopupVenue] = useState(null)
    const restaurantClickedRef = useRef(false)

    useEffect(() => {
getVenues().then(data => setVenues(Array.isArray(data) ? data : (data?.results ?? [])))
        getArtistShows().then(data => setArtistShows(Array.isArray(data) ? data : (data?.results ?? [])))
        getOpenMics().then(data => setOpenMics(Array.isArray(data) ? data : (data?.results ?? [])))
        getWritersRounds().then(data => setWritersRounds(Array.isArray(data) ? data : (data?.results ?? [])))
    }, [])

    const formatDate = (dateStr) => {
        if (!dateStr) return ""
        const [year, month, day] = dateStr.split('-').map(Number)
        return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
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

    const [address, setAddress] = useState("")

    useEffect(() => {
        if (selectedVenue) {
            reverseGeocode(selectedVenue.lat, selectedVenue.lng).then(setAddress)
        }
    }, [selectedVenue])

    const handleCloseOverlay = () => {
        setOverlayVisible(false)
        setSelectedVenue(null)
        setAddress("")
    }

    const filteredVenues = venues.filter((venue) => {
        if (search && !venue.name.toLowerCase().includes(search.toLowerCase())) return false
        if (noiseFilter && venue.noise_level !== noiseFilter) return false
        if (filterBar && !venue.bar) return false
        if (filterFood && !venue.food) return false
        if (filterKidFriendly && !venue.kid_friendly) return false
        if (filterParking && !venue.parking) return false
        if (displayOpenMics || displayWritersRounds) {
            const hasOpenMic = displayOpenMics && openMics.some(m => (m.venue?.id ?? m.venue) == venue.id)
            const hasWritersRound = displayWritersRounds && writersRounds.some(w => (w.venue?.id ?? w.venue) == venue.id)
            if (!hasOpenMic && !hasWritersRound) return false
        }
        return true
    })

    const getVenueIcon = (venue) => {
        if (!displayOpenMics && !displayWritersRounds) return showIcon
        if (displayOpenMics && displayWritersRounds) {
            const hasOpenMic = openMics.some(m => (m.venue?.id ?? m.venue) == venue.id)
            const hasWritersRound = writersRounds.some(w => (w.venue?.id ?? w.venue) == venue.id)
            if (hasOpenMic && hasWritersRound) return openMicAndWritersIcon
            if (hasWritersRound) return writersRoundIcon
            return openMicIcon
        }
        if (displayWritersRounds) return writersRoundIcon
        return openMicIcon
    }

    const venueEvents = selectedVenue
        ? [
            ...(!displayOpenMics && !displayWritersRounds ? artistShows.map(e => ({ ...e, _type: 'show' })) : []),
            ...(displayOpenMics ? openMics.map(e => ({ ...e, _type: 'openMic' })) : []),
            ...(displayWritersRounds ? writersRounds.map(e => ({ ...e, _type: 'writersRound' })) : []),
          ].filter(e => (e.venue?.id ?? e.venue) == selectedVenue.id)
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
                    <p>Noise Level</p>
                    <select onChange={(e) => setNoiseFilter(e.target.value)} value={noiseFilter}>
                        <option value="">Any</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className='search-field'>
                    <p>Amenities</p>
                    <label>
                        <input type='checkbox' checked={filterBar} onChange={(e) => setFilterBar(e.target.checked)} /> Bar
                    </label>
                    <label>
                        <input type='checkbox' checked={filterFood} onChange={(e) => setFilterFood(e.target.checked)} /> Food
                    </label>
                    <label>
                        <input type='checkbox' checked={filterKidFriendly} onChange={(e) => setFilterKidFriendly(e.target.checked)} /> Kid Friendly
                    </label>
                    <label>
                        <input type='checkbox' checked={filterParking} onChange={(e) => setFilterParking(e.target.checked)} /> Parking
                    </label>
                </div>

                <div className='search-field'>
                    <p>Events</p>
                    <label>
                        <input
                            type='checkbox'
                            checked={displayOpenMics}
                            onChange={(e) => setDisplayOpenMics(e.target.checked)}
                        /> Open Mics
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            checked={displayWritersRounds}
                            onChange={(e) => setDisplayWritersRounds(e.target.checked)}
                        /> Writers Rounds
                    </label>
                </div>

            </div>

            <div className='map-container'>
                {overlayVisible && <div className='map-blocker' onClick={handleCloseOverlay} />}

                <div className={`popup-overlay ${overlayVisible ? 'active' : ''}`}>
                    {selectedVenue && (
                        <div>
                            <button className='close-btn' onClick={handleCloseOverlay}>X</button>

                            <h2>{selectedVenue.name}</h2>
                            {address && <div>{address}</div>}
                            <div>Noise Level: {selectedVenue.noise_level}</div>
                            <div>
                                <div>
                                    {selectedVenue.bar && <span>Bar </span>}
                                </div>
                                <div>
                                    {selectedVenue.food && <span>Food </span>}
                                </div>
                                <div>
                                    {selectedVenue.kid_friendly && <span>Kid Friendly </span>}
                                </div>
                                <div>
                                    {selectedVenue.parking && <span>Parking</span>}
                                </div>
                            </div>

                            <hr />

                            {venueEvents.length === 0 ? (
                                <div>No events at this venue.</div>
                            ) : (
                                venueEvents.map((event) => (
                                    <div key={`${event._type}-${event.id}`}>
                                        <div><strong>{event.event_title}</strong></div>
                                        {event.date ? (
                                            <>
                                                <div>{formatDate(event.date)}</div>
                                                <div>{formatTime(event.start_time)} – {formatTime(event.end_time)}</div>
                                            </>
                                        ) : (
                                            <>
                                                <div>{event.weekly_recurrence || event.monthly_recurrence}</div>
                                                <div>{formatTime(event.start_time)} – {formatTime(event.end_time)}</div>
                                            </>
                                        )}
                                    </div>
                                ))
                            )}

                            {(() => {
                                const visibleRestaurants = (selectedVenue.restaurants ?? []).filter(r => r.is_visible)
                                if (visibleRestaurants.length === 0) return null
                                return (
                                    <>
                                        <hr />
                                        <div><strong>Nearby Restaurants</strong></div>
                                        {visibleRestaurants.map((r) => (
                                            <div key={r.id}>{r.name}</div>
                                        ))}
                                    </>
                                )
                            })()}
                        </div>
                    )}
                </div>

                <MapContainer center={[36.1627, -86.7816]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <MapFlyTo venue={popupVenue} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredVenues.map((venue) => (
                        <Marker
                            key={venue.id}
                            position={[parseFloat(venue.lat), parseFloat(venue.lng)]}
                            icon={getVenueIcon(venue)}
                            eventHandlers={{
                                click: () => setPopupVenue(venue),
                                popupclose: () => {
                                    if (!restaurantClickedRef.current) setPopupVenue(null)
                                }
                            }}
                        >
                            <Popup>
                                <div><strong>{venue.name}</strong></div>
                                <button onClick={() => handleViewEvents(venue)}>
                                    View {displayOpenMics ? 'Open Mics' : 'Shows'}
                                </button>
                            </Popup>
                        </Marker>
                    ))}
                    {(popupVenue?.restaurants ?? []).filter(r => r.is_visible).map((r) => (
                        <Marker
                            key={r.id}
                            position={[parseFloat(r.lat), parseFloat(r.lng)]}
                            icon={restaurantIcon}
                            eventHandlers={{
                                mousedown: () => {
                                    restaurantClickedRef.current = true
                                    setTimeout(() => { restaurantClickedRef.current = false }, 200)
                                }
                            }}
                        >
                            <Popup><div><strong>{r.name}</strong></div><div>{r.food_type}</div></Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    )
}
