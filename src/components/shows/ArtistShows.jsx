import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { deleteArtistShow, getArtistShowsById } from "../../services/artistShowsService"
import { getClientById } from "../../services/clientService"

export const ArtistShows = () => {
    const { artistId } = useParams()
    const [artistShows, setArtistShows] = useState([])
    const [artist, setArtist] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const getAndSetArtistShows = (artistId) => {
        getArtistShowsById(artistId).then(setArtistShows)
        getClientById(artistId).then(setArtist)
    }

    useEffect(() => {
            if(artistId) {
                setIsLoading(true)
    
                Promise.all([
                    getArtistShowsById(artistId),
                    getClientById(artistId)
                ]).then(([artistShowsArray, artist]) => {
                    setArtistShows(artistShowsArray)
                    setArtist(artist)
                }).then(setIsLoading(false))
            }
        }, [artistId])

    const handleShowDelete = (show) => {
        deleteArtistShow(show).then(getAndSetArtistShows(artistId))
    }

    const formatDate = (dateString) => {
        if (!dateString) return ""
        
        const date = new Date(dateString)
        
        return date.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const formatTime = (timeString) => {
        const [hourStr, minute] = timeString.split(":")
        let hour = parseInt(hourStr)
        const ampm = hour >= 12 ? "PM" : "AM"
        hour = hour % 12 || 12
        return `${hour}:${minute} ${ampm}`
    }

    if (isLoading) {
        return (
            <div class="spinner-box">
                <div class="circle-border">
                    <div class="circle-core"></div>
                </div>  
            </div>
        )
    }


    return (
        <main>
            <div>
                <h1 className="form__section-title">
                    {artist.name} Shows
                </h1>
                <div>
                    <Link to={`/managers/artist-shows/create/${artistId}`}>
                        <button className="btn--primary">Create Show</button>            
                    </Link>
                </div>
                <div className="card-grid">
                    {artistShows.map((show) => {
                        return <div key={show.id}>
                                    <Link to={`/managers/artist-shows/edit-show/${show.id}`}>
                                    <div className="card">
                                        <div className="card__title">
                                            {show.eventTitle}
                                        </div>
                                        <div className="card__subtitle">
                                            {show?.venue?.venueName}
                                        </div>
                                        <div>
                                            {formatDate(show.date)} {formatTime(show.startTime)}
                                        </div>
                                    </div>                              
                                    </Link>
                                    <div>
                                        <button className="btn--danger" onClick={() => {
                                            handleShowDelete(show)
                                        }}>Delete Show</button>
                                    </div>
                        </div>
                    })}
                </div>
            </div>
        </main>
        
    )
}