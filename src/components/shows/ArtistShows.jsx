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
                        <div>
                            {show.eventTitle}
                        </div>
                        <div>
                            {show?.venue?.venueName}
                        </div>
                        <div>
                            {new Date(show.dateTime).toLocaleString()}
                        </div>
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