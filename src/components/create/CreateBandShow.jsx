import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getVenues } from "../../services/venuesService"
import { createBandShow } from "../../services/bandShowsService"

export const CreateBandShow = () => {
    const { bandId } = useParams()
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
                bandId: bandId,
                venueId: venue,
                eventTitle: showName,
                dateTime: dateTime
            }

            createBandShow(show).then(navigate(`/managers/band-shows/${bandId}`))
        } else {
            window.alert("Please make sure all fields are filled out before submitting")
        }
    }

    return (
        <div>
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