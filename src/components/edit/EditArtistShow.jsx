import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getArtistShowByShowId, updateArtistShow } from "../../services/artistShowsService"
import { getVenues } from "../../services/venuesService"

export const EditArtistShow = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [artistShow, setArtistShow] = useState({})
    const [venues, setVenues] = useState([])
    const [venue, setVenue] = useState({})

    const getAndSetShowDetails = (id) => {
        getArtistShowByShowId(id).then((artistShowArray) => {
            setArtistShow(artistShowArray[0])
        })
        getVenues().then(setVenues)
    }

    useEffect(() => {
        getAndSetShowDetails(id)
    }, [id])

    useEffect(() => {
        const showVenue = venues.filter((venue) => venue.id === artistShow.venueId)
        setVenue(showVenue[0])
    }, [artistShow, venues])

    const handleShowUpdate = () => {
        if (artistShow.eventTitle && artistShow.venueId && artistShow.dateTime) {
            updateArtistShow(artistShow).then(navigate(`/managers/artist-shows/${artistShow.artistId}`))
        } else {
            window.alert("Please fill out all fields before updating show")
        }
    }

    const formatForInput = (dateTimeString) => {
        if (!dateTimeString) return ""
        const date = new Date(dateTimeString)
        
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        
        return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    return (
        <div>
            <h2>Edit Show</h2>
            <div>
                <h4>Show Name</h4>
                <input type="text" value={artistShow.eventTitle} {...console.log(artistShow)} onChange={(e) => {
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
                    <option selected value={venue?.id}>{venue?.venueName}</option>
                    {venues.map((venue) => {
                        return <option value={venue.id} key={venue.id}>{venue.venueName}</option>
                    })}
                </select>
            </div>
            <div>
                <input type="datetime-local" value={formatForInput(artistShow.dateTime)} {...console.log(artistShow)} onChange={(e) => {
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