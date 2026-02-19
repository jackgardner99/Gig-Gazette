

export const VenueShows = ({ artistShows }) => {
    
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
        <div className="venue-shows-container">
            <div className="venue-shows">
            <h2>Show Conflicts</h2>
                {artistShows.map((artistShow) => {
                    return (
                        <div>
                            <div>{artistShow.eventTitle}</div>
                            <div>{artistShow.artist?.artistName}</div>
                            <div><strong>{formatDateTime(artistShow.dateTime)}</strong></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}