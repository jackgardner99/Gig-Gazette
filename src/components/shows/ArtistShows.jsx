import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getArtistShowsById } from "../../services/artistShowsService"
import { getArtistById } from "../../services/artistService"

export const ArtistShows = () => {
    const { artistId } = useParams()
    const [artistShows, setArtistShows] = useState([])
    const [artist, setArtist] = useState({})

    useEffect(() => {
        getArtistShowsById(artistId).then(setArtistShows)
        getArtistById(artistId).then(setArtist)
    }, [artistId])

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
                    </div>
                })}
            </div>
        </div>
    )
}