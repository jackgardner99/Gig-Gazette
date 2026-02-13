

export const VenueShows = ({ artistShows }) => {
    

    return (
        <div>
            <div>
                {artistShows.map((artistShow) => {
                    return (
                        <div>
                            <div>{artistShow.eventTitle}</div>
                            <div>{artistShow.artist?.artistName}</div>
                            <div>{artistShow.date}</div>
                            <div>{artistShow.time}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}