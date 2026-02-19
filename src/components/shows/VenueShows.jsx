

export const VenueShows = ({ artistShows }) => {
    

    return (
        <div className="venue-shows-container">
            <div className="venue-shows">
            <h2>Show Conflicts</h2>
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
        </div>
    )
}