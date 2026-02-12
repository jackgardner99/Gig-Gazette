import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getVenues } from "../../services/venuesService"
import { createArtistShow } from "../../services/artistShowsService"

export const CreateArtistShow = () => {
    const { artistId } = useParams()
    const [venues, setVenues] = useState([])
    const [venue, setVenue] = useState(0)
    const [showName, setShowName] = useState("")
    const [dateTime, setDateTime] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getVenues().then(setVenues)
    }, [])

    const handleShowCreation = () => {
        if (venue && showName && dateTime) {
            const show = {
                artistId: artistId,
                venueId: venue,
                eventTitle: showName,
                dateTime: dateTime
            }

            createArtistShow(show).then(navigate(`/managers/artist-shows/${artistId}`))
        } else {
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
                <input type="datetime-local" value={dateTime} onChange={(e) => {
                    setDateTime(e.target.value)
                }}/>
            </div>
            <div>
                <button onClick={handleShowCreation}>Create Show</button>              
            </div>
        </div>
    )
}