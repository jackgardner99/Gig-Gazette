import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { deleteArtistShow, getArtistShowsById } from "../../services/artistShowsService"
import { getArtistById } from "../../services/artistService"

export const ArtistShows = () => {
    const { artistId } = useParams()
    const [artistShows, setArtistShows] = useState([])
    const [artist, setArtist] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const getAndSetArtistShows = (artistId) => {
        getArtistShowsById(artistId).then(setArtistShows)
        getArtistById(artistId).then(setArtist)
    }

    useEffect(() => {
            if(artistId) {
                setIsLoading(true)
    
                Promise.all([
                    getArtistShowsById(artistId),
                    getArtistById(artistId)
                ]).then(([artistShowsArray, artist]) => {
                    setArtistShows(artistShowsArray)
                    setArtist(artist)
                    setIsLoading(false)
                })
            }
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
                <h2>
                    {artist.artistName} Shows
                </h2>
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
                                    <div>
                                        {show.eventTitle}
                                    </div>
                                    <div>
                                        {show?.venue?.venueName}
                                    </div>
                                    <div>
                                        {formatDateTime(show.dateTime)}
                                    </div>
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
        </main>
        
    )
}