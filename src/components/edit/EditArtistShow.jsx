import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getArtistShowByShowId, updateArtistShow } from "../../services/artistShowsService"
import { getVenues } from "../../services/venuesService"

export const EditArtistShow = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [artistShow, setArtistShow] = useState({})
    const [venues, setVenues] = useState([])

    const getAndSetShowDetails = (id) => {
        getArtistShowByShowId(id).then(setArtistShow)
        getVenues().then(setVenues)
    }

    useEffect(() => {
        getAndSetShowDetails(id)
    }, [id])

    const handleShowUpdate = () => {
        if (artistShow.eventTitle && artistShow.venueId && artistShow.dateTime) {
            const updatedArtistShow = {
                    id: artistShow.id,
                    eventTitle: artistShow.eventTitle,
                    artistId: artistShow.artistId,
                    venueId: artistShow.venueId,
                    dateTime: artistShow.dateTime
                }

            updateArtistShow(updatedArtistShow).then(navigate(`/managers/artist-shows/${artistShow.artistId}`))
        } else {
            window.alert("Please fill out all fields before updating show")
        }
    }

    return (
        <div>
            <h2>Edit Show</h2>
            <div>
                <h4>Show Name</h4>
                <input type="text" value={artistShow.eventTitle} onChange={(e) => {
                    const artistShowCopy = {...artistShow}
                    artistShowCopy.eventTitle = e.target.value
                    setArtistShow(artistShowCopy)
                }}/>
            </div>
            <div>
                <h4>Show Location</h4>
                <select onChange={(e) => {
                    const artistShowCopy = {...artistShow}
                    artistShowCopy.venueId = e.target.value
                    setArtistShow(artistShowCopy)
                }}>
                    <option selected value={artistShow?.venue?.id}>{artistShow.venue?.name}</option>
                    {venues.map((venue) => {
                        return <option value={venue.id} key={venue.id}>{venue.venueName}</option>
                    })}
                </select>
            </div>
            <div>
                <input type="datetime-local" value={artistShow.dateTime} onChange={(e) => {
                    const artistShowCopy = {...artistShow}
                    artistShowCopy.dateTime = e.target.value
                    setArtistShow(artistShowCopy)
                }}/>
            </div>
            <div>
                <button onClick={handleShowUpdate}>Save Edits</button>              
            </div>
        </div>
    )
}