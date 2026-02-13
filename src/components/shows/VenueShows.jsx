import { useEffect, useState } from "react"
import { getArtistShowsByVenueId } from "../../services/artistShowsService"
import { getBandShowsByVenueId } from "../../services/bandShowsService"

export const VenueShows = ({ venueId }) => {
    const [artistShows, setArtistShows] = useState([])
    const [bandShows, setBandShows] = useState([])

    useEffect(() => {
        getArtistShowsByVenueId(venueId).then(setArtistShows)
        getBandShowsByVenueId(venueId).then(setBandShows)
    }, [venueId])

    return (
        <div>
            <div>
                {artistShows.map((artistShow) => {
                    return (
                        <div>
                            <div>{artistShow.eventTitle}</div>
                            <div>{artistShow.artist?.artistName}</div>
                            <div>{artistShow.dateTime}</div>
                        </div>
                    )
                })}
            </div>
            <div>
                {bandShows.map((bandShow) => {
                    return (
                        <div>
                            <div>{bandShow.eventTitle}</div>
                            <div>{bandShow.band?.bandName}</div>
                            <div>{bandShow.dateTime}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}