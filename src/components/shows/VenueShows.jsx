

export const VenueShows = ({ filteredArtistShowsByDate }) => {
    
    const formatDate = (dateString) => {
        if (!dateString) return ""
        
        const date = new Date(dateString)
        
        return date.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const formatStartTime = (timeString) => {
        const [hourStr, minute] = timeString.split(":")
        let hour = parseInt(hourStr)
        const ampm = hour >= 12 ? "PM" : "AM"
        hour = hour % 12 || 12
        return `${hour}:${minute} ${ampm}`
    }

    const formatEndTime = (timeString) => {
        const [hourStr, minute] = timeString.split(":")
        let hour = parseInt(hourStr)
        const ampm = hour >= 12 ? "PM" : "AM"
        hour = hour % 12 || 12
        return `${hour}:${minute} ${ampm}`
    }

    return (
        <div className="venue-shows-container">
            <div className="venue-shows">
            <h2>Show Conflicts</h2>
                {filteredArtistShowsByDate.map((artistShow) => {
                    return (
                        <div>
                            <div>{artistShow.eventTitle}</div>
                            <div>{artistShow.artist?.artistName}</div>
                            <div><strong>{formatDate(artistShow.date)} {formatStartTime(artistShow.startTime)} - {formatEndTime(artistShow.endTime)}</strong></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}