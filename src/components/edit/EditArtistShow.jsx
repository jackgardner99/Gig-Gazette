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
        if (artistShow.eventTitle && artistShow.venueId && artistShow.dateTime && artistShow.url) {
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
        <div className="clients-section">
            <div className="create-container">
                <h2>Edit Show</h2>
                <div className="filter-group">
                    <p>Show Name</p>
                    <input type="text" value={artistShow.eventTitle} {...console.log(artistShow)} onChange={(e) => {
                        const artistShowCopy = {...artistShow}
                        artistShowCopy.eventTitle = e.target.value
                        setArtistShow(artistShowCopy)
                    }}/>
                </div>
                <div className="filter-group">
                    <p>Show Location</p>
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
                <div className="filter-group">
                    <p>Date and Time</p>
                    <input type="datetime-local" value={formatForInput(artistShow.dateTime)} {...console.log(artistShow)} onChange={(e) => {
                        const artistShowCopy = {...artistShow}
                        artistShowCopy.dateTime = e.target.value
                        setArtistShow(artistShowCopy)
                    }}/>
                </div>
                <div className="filter-group">
                    <p>URL Link</p>
                    <input type="url" value={artistShow.url} onChange={(e) => {
                        const artistShowCopy = {...artistShow}
                        artistShowCopy.url = e.target.value
                        setArtistShow(artistShowCopy)
                    }} />
                </div>
            <div>
                <button className="submit-btn" onClick={handleShowUpdate}><a>Save Edits</a></button>              
            </div>
            </div>
        </div>
    )
}