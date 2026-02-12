import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getVenues } from "../../services/venuesService"
import { getBandShowByShowId, updateBandShow } from "../../services/bandShowsService"

export const EditBandShow = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [bandShow, setBandShow] = useState({})
    const [venues, setVenues] = useState([])

    const getAndSetShowDetails = (id) => {
        getBandShowByShowId(id).then((bandShowArray) => {
            setBandShow(bandShowArray[0])
        })
        getVenues().then(setVenues)
    }

    useEffect(() => {
        getAndSetShowDetails(id)
    }, [id])

    const handleShowUpdate = () => {
        if (bandShow.eventTitle && bandShow.venueId && bandShow.dateTime) {
            updateBandShow(bandShow).then(navigate(`/managers/band-shows/${bandShow.bandId}`))
        } else {
            window.alert("Please fill out all fields before updating show")
        }
    }

    const formatDateTimeForInput = (dateTimeString) => {
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
                <input type="text" value={bandShow.eventTitle} onChange={(e) => {
                    const bandShowCopy = {...bandShow}
                    bandShowCopy.eventTitle = e.target.value
                    setBandShow(bandShowCopy)
                }}/>
            </div>
            <div>
                <h4>Show Location</h4>
                <select onChange={(e) => {
                    const bandShowCopy = {...bandShow}
                    bandShowCopy.venueId = e.target.value
                    setBandShow(bandShowCopy)
                }}>
                    <option selected value={bandShow?.venue?.id}>{bandShow?.venue?.venueName}</option>
                    {venues.map((venue) => {
                        return <option value={venue.id} key={venue.id}>{venue.venueName}</option>
                    })}
                </select>
            </div>
            <div>
                <input type="datetime-local" value={formatDateTimeForInput(bandShow.dateTime)} onChange={(e) => {
                    const bandShowCopy = {...bandShow}
                    bandShowCopy.dateTime = e.target.value
                    setBandShow(bandShowCopy)
                }}/>
            </div>
            <div>
                <button onClick={handleShowUpdate}>Save Edits</button>              
            </div>
        </div>
    )
}