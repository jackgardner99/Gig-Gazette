

export const VenueShows = ({ artistShows }) => {
    

    return (
        <div className="">
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
        </div>
    )
}