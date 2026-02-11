import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getArtistShowsById } from "../../services/artistShowsService"

export const ArtistShows = () => {
    const { artistId } = useParams()
    const [artistShows, setArtistShows] = useState([])

    useEffect(() => {
        getArtistShowsById(artistId).then(setArtistShows)
    }, [artistId])

    return (
        <div>
            <h1>
                {artistShows[0]?.artist?.artistName} Shows
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
                            {show.dateTime}
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}