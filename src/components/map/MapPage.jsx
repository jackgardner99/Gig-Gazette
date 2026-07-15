import { Marker, Popup, useMap } from 'react-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getShows, deleteArtistShow } from '../../services/artistShowsService'
import { getOpenMics, getWritersRounds, deleteWritersRound } from '../../services/eventService'
import { getVenues } from '../../services/venuesService'
import { reverseGeocode } from '../../services/geocodeService'

const makePillIcon = (color, iconClass) => L.divIcon({
    html: `<div style="background:${color};height:28px;padding:0 10px;border-radius:14px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.4);border:2px solid rgba(255,255,255,0.85);"><i class="${iconClass}" style="color:#fff;font-size:11px;pointer-events:none;"></i></div>`,
    className: '',
    iconSize: [32, 28],
    iconAnchor: [16, 14],
    popupAnchor: [0, -16],
})

const ICONS = {
    show:          makePillIcon('#e8a020', 'fas fa-star'),
    recurringShow: makePillIcon('#16a34a', 'fas fa-sync'),
    openMic:       makePillIcon('#7c3aed', 'fas fa-microphone'),
    writersRound:  makePillIcon('#db2777', 'fas fa-pen'),
    multi:         makePillIcon('#2dd4bf', 'fas fa-music'),
}

const EVENT_CHECKBOXES = [
    { key: 'show',          label: 'Shows',           color: '#e8a020', icon: 'fas fa-star' },
    { key: 'openMic',       label: 'Open Mics',       color: '#7c3aed', icon: 'fas fa-microphone' },
    { key: 'writersRound',  label: 'Writers Rounds',  color: '#db2777', icon: 'fas fa-pen' },
    { key: 'recurringShow', label: 'Recurring Shows', color: '#16a34a', icon: 'fas fa-sync' },
]

const MapFlyTo = ({ venue }) => {
    const map = useMap()
    useEffect(() => {
        if (venue) {
            map.flyTo([parseFloat(venue.lat), parseFloat(venue.lng)], 17, { duration: 1 })
        }
    }, [venue, map])
    return null
}

const EDIT_PATH = {
    show: (id) => `/edit/show/${id}`,
    openMic: (id) => `/edit/open-mic/${id}`,
    writersRound: (id) => `/edit/writers-round/${id}`,
}

const DETAIL_PATH = {
    show: (id) => `/details/show/${id}`,
    openMic: (id) => `/details/open-mic/${id}`,
    writersRound: (id) => `/details/writers-round/${id}`
}

export const MapPage = () => {
    const navigate = useNavigate()
    const currentUserId = JSON.parse(sessionStorage.getItem("user"))?.id
    const [venues, setVenues] = useState([])
    const [artistShows, setArtistShows] = useState([])
    const [openMics, setOpenMics] = useState([])
    const [writersRounds, setWritersRounds] = useState([])
    const [search, setSearch] = useState("")
    const [eventTypes, setEventTypes] = useState({ show: true, openMic: true, writersRound: true, recurringShow: true })
    const [dateFilter, setDateFilter] = useState("")
    const [dayFilter, setDayFilter] = useState("")
    const [selectedVenue, setSelectedVenue] = useState(null)
    const [overlayVisible, setOverlayVisible] = useState(false)

    const [noiseFilter, setNoiseFilter] = useState("")
    const [filterFood, setFilterFood] = useState(false)
    const [filterKidFriendly, setFilterKidFriendly] = useState(false)
    const [filterParking, setFilterParking] = useState(false)
    const [filterSeating, setFilterSeating] = useState(false)
    const [filterRequiresReservation, setFilterRequiresReservation] = useState(false)
    const [filterOutdoor, setFilterOutdoor] = useState(false)
    const [barTypeFilter, setBarTypeFilter] = useState("")
    const [filterFreeEntry, setFilterFreeEntry] = useState(false)
    const [popupVenue, setPopupVenue] = useState(null)
    const [filterOpen, setFilterOpen] = useState(false)

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]

        getVenues().then(data => setVenues(Array.isArray(data) ? data : (data?.results ?? [])))

        getShows().then(data => {
            const shows = Array.isArray(data) ? data : (data?.results ?? [])
            const past = shows.filter(e => e.date && e.date < today)
            const current = shows.filter(e => !e.date || e.date >= today)
            Promise.all(past.map(e => deleteArtistShow({ id: e.id })))
            setArtistShows(current)
        })

        getOpenMics().then(data => setOpenMics(Array.isArray(data) ? data : (data?.results ?? [])))

        getWritersRounds().then(data => {
            const rounds = Array.isArray(data) ? data : (data?.results ?? [])
            const past = rounds.filter(e => e.date && e.date < today)
            const current = rounds.filter(e => !e.date || e.date >= today)
            Promise.all(past.map(e => deleteWritersRound(e.id)))
            setWritersRounds(current)
        })
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

    const toggleEventType = (key) => {
        if (key !== 'openMic') setDayFilter("")
        setEventTypes(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const weekRange = dateFilter ? (() => {
        const date = new Date(dateFilter + 'T00:00:00')
        const day = date.getDay()
        const monday = new Date(date)
        monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1))
        const sunday = new Date(monday)
        sunday.setDate(monday.getDate() + 6)
        const fmt = d => d.toISOString().split('T')[0]
        return { start: fmt(monday), end: fmt(sunday) }
    })() : null

    const inWeek = (date) => weekRange ? date >= weekRange.start && date <= weekRange.end : true

    const venueMatchesEventTypes = (venue) => {
        const id = venue.id
        if (eventTypes.show && artistShows.some(s => !s.recurrence && (s.venue?.id ?? s.venue) == id && inWeek(s.date))) return true
        if (eventTypes.recurringShow && artistShows.some(s => s.recurrence && (s.venue?.id ?? s.venue) == id)) return true
        if (eventTypes.openMic && openMics.some(m => (m.venue?.id ?? m.venue) == id && (!dayFilter || m.recurrence?.toLowerCase().includes(dayFilter.toLowerCase())))) return true
        if (eventTypes.writersRound && writersRounds.some(w => (w.venue?.id ?? w.venue) == id && inWeek(w.date))) return true
        return false
    }

    const filteredVenues = venues.filter((venue) => {
        if (search && !venue.name.toLowerCase().includes(search.toLowerCase())) return false
        if (noiseFilter && venue.noise_level !== noiseFilter) return false
        if (filterFood && !venue.food) return false
        if (filterKidFriendly && !venue.kid_friendly) return false
        if (filterParking && !venue.parking) return false
        if (filterSeating && !venue.seating) return false
        if (filterRequiresReservation && !venue.requires_reservation) return false
        if (filterOutdoor && !venue.outdoor) return false
        if (barTypeFilter === 'full_bar' && !(venue.bar && !venue.beer_only)) return false
        if (barTypeFilter === 'beer_only' && !venue.beer_only) return false
        if (filterFreeEntry && venue.cover_charge) return false
        if (!venueMatchesEventTypes(venue)) return false
        return true
    })

    const getVenueIcon = (venue) => {
        const hasShow = eventTypes.show && artistShows.some(s => !s.recurrence && (s.venue?.id ?? s.venue) == venue.id)
        const hasRecurring = eventTypes.recurringShow && artistShows.some(s => s.recurrence && (s.venue?.id ?? s.venue) == venue.id)
        const hasOpenMic = eventTypes.openMic && openMics.some(m => (m.venue?.id ?? m.venue) == venue.id)
        const hasWritersRound = eventTypes.writersRound && writersRounds.some(w => (w.venue?.id ?? w.venue) == venue.id)
        const count = [hasShow, hasRecurring, hasOpenMic, hasWritersRound].filter(Boolean).length
        if (count > 1) return ICONS.multi
        if (hasShow) return ICONS.show
        if (hasRecurring) return ICONS.recurringShow
        if (hasOpenMic) return ICONS.openMic
        if (hasWritersRound) return ICONS.writersRound
        return ICONS.show
    }

    const venueEvents = selectedVenue
        ? [
            ...(eventTypes.show ? artistShows.filter(s => !s.recurrence && inWeek(s.date)).map(e => ({ ...e, _type: 'show' })) : []),
            ...(eventTypes.recurringShow ? artistShows.filter(s => s.recurrence).map(e => ({ ...e, _type: 'show' })) : []),
            ...(eventTypes.openMic ? openMics.filter(m => !dayFilter || m.recurrence?.toLowerCase().includes(dayFilter.toLowerCase())).map(e => ({ ...e, _type: 'openMic' })) : []),
            ...(eventTypes.writersRound ? writersRounds.filter(w => inWeek(w.date)).map(e => ({ ...e, _type: 'writersRound' })) : []),
          ].filter(e => (e.venue?.id ?? e.venue) == selectedVenue.id)
        : []

    return (
        <div className='map-wrapper'>
            <div className={`filter-panel ${filterOpen ? 'filter-panel--open' : ''}`}>
                <div className='filter-panel__toggle'>
                    <h2>The Gig Map</h2>
                    <button className='filter-toggle-btn' onClick={() => setFilterOpen(f => !f)}>
                        <i className={`fas ${filterOpen ? 'fa-chevron-up' : 'fa-sliders'}`}></i>
                        {filterOpen ? 'Close' : 'Filters'}
                    </button>
                </div>

                <div className='filter-panel__content'>
                    <div className='search-field'>
                        <p>Search</p>
                        <input
                            type="text"
                            placeholder="Search Venue"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className='search-field'>
                        <p>Date</p>
                        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                            <input
                                type="date"
                                className="form__input"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            />
                            {dateFilter && (
                                <button className="btn btn--secondary btn--sm" onClick={() => setDateFilter("")}>
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    <div className='search-field'>
                        <p>Events</p>
                        {EVENT_CHECKBOXES.map(({ key, label, color, icon }) => (
                            <label key={key} className="form__check event-type-check">
                                <input
                                    type='checkbox'
                                    checked={eventTypes[key]}
                                    onChange={() => toggleEventType(key)}
                                />
                                <i className={icon} style={{ color }}></i>
                                <span className="form__check-label">{label}</span>
                            </label>
                        ))}
                    </div>

                    {eventTypes.openMic && !eventTypes.show && !eventTypes.writersRound && !eventTypes.recurringShow && (
                        <div className='search-field'>
                            <p>Open Mic Day</p>
                            <select
                                className="form__select"
                                value={dayFilter}
                                onChange={(e) => setDayFilter(e.target.value)}
                            >
                                <option value="">Any day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                    )}

                    <div className='search-field'>
                        <p>Venue Noise Level</p>
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
                            <input type='checkbox' checked={filterFood} onChange={(e) => setFilterFood(e.target.checked)} /> Food
                        </label>
                        <label>
                            <input type='checkbox' checked={filterKidFriendly} onChange={(e) => setFilterKidFriendly(e.target.checked)} /> Kid Friendly
                        </label>
                        <label>
                            <input type='checkbox' checked={filterParking} onChange={(e) => setFilterParking(e.target.checked)} /> Parking
                        </label>
                        <label>
                            <input type='checkbox' checked={filterSeating} onChange={(e) => setFilterSeating(e.target.checked)} /> Seating
                        </label>
                        <label>
                            <input type='checkbox' checked={filterRequiresReservation} onChange={(e) => setFilterRequiresReservation(e.target.checked)} /> Requires Reservation
                        </label>
                        <label>
                            <input type='checkbox' checked={filterOutdoor} onChange={(e) => setFilterOutdoor(e.target.checked)} /> Outdoor
                        </label>
                        <label>
                            <input type='checkbox' checked={filterFreeEntry} onChange={(e) => setFilterFreeEntry(e.target.checked)} /> Free Entry
                        </label>
                        <label> Bar Type
                            <select onChange={(e) => setBarTypeFilter(e.target.value)} value={barTypeFilter}>
                                <option value="">Any Bar</option>
                                <option value="full_bar">Full Bar</option>
                                <option value="beer_only">Beer Only</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>

            <div className='map-container'>
                {overlayVisible && <div className='map-blocker' onClick={handleCloseOverlay} />}

                <div className={`popup-overlay ${overlayVisible ? 'active' : ''}`}>
                    {selectedVenue && (
                        <div>
                            <button className='close-btn' onClick={handleCloseOverlay}>✕</button>

                            {selectedVenue.venue_image && (
                                <div className="popup-hero">
                                    <img src={selectedVenue.venue_image} alt={selectedVenue.name} />
                                </div>
                            )}

                            <div className="popup-body">
                                <h2>{selectedVenue.name}</h2>

                                {currentUserId && selectedVenue.user === currentUserId && (
                                    <button
                                        className="btn btn--secondary btn--sm"
                                        onClick={() => navigate(`/venues/edit/${selectedVenue.id}`)}
                                    >
                                        Edit Venue
                                    </button>
                                )}
                                {selectedVenue.website_url && (
                                    <button
                                        className="btn btn--secondary btn--sm"
                                        onClick={() => window.open(selectedVenue.website_url, '_blank', 'noreferrer')}
                                    >
                                        <i className="fas fa-globe" /> Visit Website
                                    </button>
                                )}
                                {address && (
                                    <div>{[selectedVenue.address_number, address].filter(Boolean).join(' ')}</div>
                                )}
                                <div>Noise Level: {selectedVenue.noise_level}</div>
                                <div>
                                    {selectedVenue.bar && <span>Bar </span>}
                                    {selectedVenue.food && <span>Food </span>}
                                    {selectedVenue.kid_friendly && <span>Kid Friendly </span>}
                                    {selectedVenue.parking && <span>Parking </span>}
                                    {selectedVenue.beer_only && <span>Beer Only </span>}
                                    {selectedVenue.requires_reservation && <span>Reservation Required </span>}
                                    {selectedVenue.seating && <span>Seating </span>}
                                    {selectedVenue.cover_charge && <span>Cover Charge </span>}
                                    {selectedVenue.outdoor && <span>Outdoor</span>}
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
                                                    <div>{event.recurrence}</div>
                                                    <div>{formatTime(event.start_time)} – {formatTime(event.end_time)}</div>
                                                </>
                                            )}
                                            <div>
                                                <button
                                                    className="btn btn--secondary btn--sm"
                                                    onClick={() => navigate(DETAIL_PATH[event._type](event.id))}
                                                >Event Details</button>
                                            </div>
                                            {event._type === 'show' && event.ticket_link && (
                                                <button
                                                    className="btn btn--secondary btn--sm"
                                                    onClick={() => window.open(event.ticket_link, '_blank', 'noreferrer')}
                                                >
                                                    Buy Tickets
                                                </button>
                                            )}
                                            {currentUserId && event.user === currentUserId && (
                                                <button
                                                    className="btn btn--secondary btn--sm"
                                                    onClick={() => navigate(EDIT_PATH[event._type](event.id))}
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                    ))
                                )}

                            </div>
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
                                popupclose: () => setPopupVenue(null)
                            }}
                        >
                            <Popup>
                                <div><strong>{venue.name}</strong></div>
                                <button onClick={() => handleViewEvents(venue)}>View Events</button>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    )
}
