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
    const [time, setTime] = useState("")
    const [artistShows, setArtistShows] = useState([])
    const [filteredArtistShowsByDate, setFilteredArtistShowsByDate] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getVenues().then(setVenues)
    }, [])

    useEffect(() => {
        getArtistShowsByVenueId(venue).then(setArtistShows)
    }, [venue])

    useEffect(() => {
        const filteredShows = artistShows.filter((show) => date == show.date)
        setFilteredArtistShowsByDate(filteredShows)
    }, [artistShows, date])

    const handleShowCreation = () => {
        if (venue && showName && date && time && filteredArtistShowsByDate.length === 0) {
            const show = {
                artistId: artistId,
                venueId: venue,
                eventTitle: showName,
                date: date,
                time: time
            }

            createArtistShow(show).then(navigate(`/managers/artist-shows/${artistId}`))
        } else if (filteredArtistShowsByDate.length > 0){
            window.alert("A show has already been booked this date at this venue. Please select another venue or another day.")
        }
         else {
            window.alert("Please make sure all fields are filled out before submitting")
        }
    }

    return (
        <div>
            <div>
                <Link to={`/managers/artist-shows/${artistId}`}>
                    <button>Back to Shows</button>
                </Link>
            </div>
            <h2>Create Show</h2>
            <div>
                <h4>Show Name</h4>
                <input type="text" value={showName} onChange={(e) => {
                    setShowName(e.target.value)
                }}/>
            </div>
            <div>
                <h4>Show Location</h4>
                <select onChange={(e) => {
                    setVenue(parseInt(e.target.value))
                }}>
                    <option selected value={0}>Please select venue</option>
                    {venues.map((venue) => {
                        return <option value={venue.id} key={venue.id}>{venue.venueName}</option>
                    })}
                </select>
            </div>
            <div>
                <input type="date" value={date} onChange={(e) => {
                    setDate(e.target.value)
                }}/>
            </div>
            <div>
                <input type="time" value={time} onChange={(e) => {
                    setTime(e.target.value)
                }} />
            </div>
            <div>
                <button onClick={handleShowCreation}>Create Show</button>              
            </div>
            <div>
                <VenueShows artistShows={artistShows}/>
            </div>
        </div>
    )
}