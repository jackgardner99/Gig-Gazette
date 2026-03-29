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
        if (artistShow.eventTitle && artistShow.venueId && artistShow.date && artistShow.startTime && artistShow.endTime && artistShow.url) {
            updateArtistShow(artistShow).then(navigate(`/managers/artist-shows/${artistShow.artistId}`))
        } else {
            window.alert("Please fill out all fields before updating show")
        }
    }

    return (
        <div>
                <h2 className="form__section-title">Edit Show</h2>
            <div className="form">
                <div>
                    <p>Show Name</p>
                    <input className="form__input" type="text" value={artistShow.eventTitle} {...console.log(artistShow)} onChange={(e) => {
                        const artistShowCopy = {...artistShow}
                        artistShowCopy.eventTitle = e.target.value
                        setArtistShow(artistShowCopy)
                    }}/>
                </div>
                <div>
                    <p>Show Location</p>
                    <select className="form__select" onChange={(e) => {
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
                    <p>Show Date</p>
                    <input className="form__input" type="date" value={artistShow.date} onChange={(e) => {
                        const copy = {...artistShow}
                        copy.date = e.target.value
                        setArtistShow(copy)
                    }}/>
                </div>
                <div>
                    <p>Start Time</p>
                    <input className="form__input" type="time" value={artistShow.startTime} onChange={(e) => {
                        const copy = {...artistShow}
                        copy.date = e.target.value
                        setArtistShow(copy)
                    }}/>
                </div>
                <div>
                    <p>End Time</p>
                    <input className="form__input" type="time" value={artistShow.endTime} onChange={(e) => {
                        const copy = {...artistShow}
                        copy.date = e.target.value
                        setArtistShow(copy)
                    }}/>
                </div>
                <div>
                    <p>URL Link</p>
                    <input className="form__input" type="url" value={artistShow.url} onChange={(e) => {
                        const artistShowCopy = {...artistShow}
                        artistShowCopy.url = e.target.value
                        setArtistShow(artistShowCopy)
                    }} />
                </div>
            <div>
                <button className="form__day-btn" onClick={handleShowUpdate}><a>Save Edits</a></button>              
            </div>
            </div>
        </div>
    )
}