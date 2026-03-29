import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getVenues } from "../../services/venuesService"
import { createArtistShow, getArtistShowsByVenueId } from "../../services/artistShowsService"
import { VenueShows } from "../shows/VenueShows"

export const CreateArtistShow = () => {
    const { artistId } = useParams()
    const [venues, setVenues] = useState([])
    const [venue, setVenue] = useState(0)
    const [showName, setShowName] = useState("")
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [url, setUrl] = useState("")
    const [artistShows, setArtistShows] = useState([])
    const [filteredArtistShowsByDate, setFilteredArtistShowsByDate] = useState([])
    const [intimate, setIntimate] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getVenues().then(setVenues)
    }, [])

    useEffect(() => {
        getArtistShowsByVenueId(venue).then(setArtistShows)
    }, [venue])

    useEffect(() => {
        const timeToMinutes = (timeStr) => {
            if (!timeStr) return 0
            const [hours, minutes] = timeStr.split(":").map(Number)
            return hours * 60 + minutes
        }

        const newStartMinutes = timeToMinutes(startTime)
        const newEndMinutes   = timeToMinutes(endTime)

        const filtered = artistShows.filter((show) => {
            if (show.date !== date) return false

            const showStart = timeToMinutes(show.startTime)
            const showEnd   = timeToMinutes(show.endTime)

            return showStart < newEndMinutes && newStartMinutes < showEnd
        })

        setFilteredArtistShowsByDate(filtered)
    }, [artistShows, startTime, endTime, date])

    const handleShowCreation = () => {
        if (venue && showName && date && startTime && endTime && filteredArtistShowsByDate.length === 0 && url) {
            const show = {
                artistId: artistId,
                venueId: venue,
                eventTitle: showName,
                date: date,
                startTime: startTime,
                endTime: endTime,
                intimate: intimate,
                url: url
            }

            createArtistShow(show).then(navigate(`/managers/artist-shows/${artistId}`))
        } else if (filteredArtistShowsByDate.length > 0){
            window.alert("A show has already been booked this date and time at this venue. Please select another venue, day, or time.")
        }
         else {
            window.alert("Please make sure all fields are filled out before submitting")
        }
    }

    return (
        <div>
            <div>
                <div>
                    <Link to={`/managers/artist-shows/${artistId}`}>
                        <button className="btn--primary">Back to Shows</button>
                    </Link>
                </div>
                <div className="form">
                    <h2 className="form__section-title">Create Show</h2>
                    <div>
                        <div>
                            <p>Show Name</p>
                            <input className="form__input" type="text" value={showName} onChange={(e) => {
                                setShowName(e.target.value)
                            }}/>
                        </div>
                        <div>
                            <p>Show Location</p>
                            <select className="form__select" onChange={(e) => {
                                setVenue(parseInt(e.target.value))
                            }}>
                                <option selected value={0}>Please select venue</option>
                                {venues.map((venue) => {
                                    return <option value={venue.id} key={venue.id}>{venue.venueName}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <input className="form__check" type="checkbox" checked={intimate} onChange={(e) => {
                                setIntimate(e.target.checked)
                            }} /> Intimate Set
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Show Date</p>
                            <input className="form__input" type="date" value={date} onChange={(e) => {
                                setDate(e.target.value)
                            }}/>
                        </div>
                        <div>
                            <p>Start Time</p>
                            <input className="form__input" type="time" value={startTime} onChange={(e) => {
                                setStartTime(e.target.value)
                            }}/>
                        </div>
                        <div>
                            <p>End Time</p>
                            <input className="form__input" type="time" value={endTime} onChange={(e) => {
                                setEndTime(e.target.value)
                            }}/>
                        </div>
                        <div>
                            <p>Show Link</p>
                            <input className="form__input" type="url" value={url} onChange={(e) => {
                                setUrl(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div>
                        <button className="form__day-btn" onClick={handleShowCreation}><a>Create Show</a></button>              
                    </div>
                </div>
            </div>
            <div>
                <VenueShows filteredArtistShowsByDate={filteredArtistShowsByDate}/>
            </div>
        </div>
        
    )
}