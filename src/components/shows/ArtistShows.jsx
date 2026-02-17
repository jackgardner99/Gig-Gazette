import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { deleteArtistShow, getArtistShowsById } from "../../services/artistShowsService"
import { getArtistById } from "../../services/artistService"

export const ArtistShows = () => {
    const { artistId } = useParams()
    const [artistShows, setArtistShows] = useState([])
    const [artist, setArtist] = useState({})

    const getAndSetArtistShows = (artistId) => {
        getArtistShowsById(artistId).then(setArtistShows)
        getArtistById(artistId).then(setArtist)
    }

    useEffect(() => {
        getAndSetArtistShows(artistId)
    }, [artistId])

    const handleShowDelete = (show) => {
        deleteArtistShow(show).then(getAndSetArtistShows(artistId))
    }

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return ""
        
        const date = new Date(dateTimeString)
        
        return date.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }


    return (
        <div>
            <h1>
                {artist.artistName} Shows
            </h1>
            <div>
                <Link to={`/managers/artist-shows/create/${artistId}`}>
                    <button>Create Show</button>            
                </Link>
            </div>
            <div>
                {artistShows.map((show) => {
                    return <div key={show.id}>
                        <Link to={`/managers/artist-shows/edit-show/${show.id}`}>
                            <div>
                                {show.eventTitle}
                            </div>
                            <div>
                                {show?.venue?.venueName}
                            </div>
                            <div>
                                {formatDateTime(show.dateTime)}
                            </div>
                        </Link>
                        <div>
                            <button onClick={() => {
                                handleShowDelete(show)
                            }}>Delete Show</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}