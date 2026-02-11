import { Link, useParams } from "react-router-dom"
import { deleteBandShow, getBandShowsById } from "../../services/bandShowsService"
import { useEffect, useState } from "react"
import { getBandById } from "../../services/bandService"

export const BandShows = () => {
    const { bandId } = useParams()
    const [bandShows, setBandShows] = useState([])
    const [band, setBand] = useState({})

    const getAndSetBandShows = (bandId) => {
        getBandShowsById(bandId).then(setBandShows)
        getBandById(bandId).then(setBand)
    }

    useEffect(() => {
        getAndSetBandShows(bandId)
    }, [bandId])

    const handleShowDelete = (show) => {
        deleteBandShow(show).then(getAndSetBandShows(bandId))
    }

    return (
        <div>
            <h1>
                {band.bandName} Shows
            </h1>
            <div>
                <Link to={`/managers/band-shows/create/${bandId}`}>
                    <button>Create Show</button>            
                </Link>
            </div>
            <div>
                {bandShows.map((show) => {
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