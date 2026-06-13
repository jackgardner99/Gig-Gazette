import { useNavigate, useParams } from "react-router-dom"
import { getShowById } from "../../services/artistShowsService"
import { getOpenMicById, getWritersRoundById } from "../../services/eventService"
import { useEffect, useState } from "react"

const CONFIG = {
    show: {
        label: 'Artist Show',
        getFn: (id) => getShowById(id).then(data => Array.isArray(data) ? data[0] : data),
        hasDate: true,
        hasTicketLink: true,
    },
    openMic: {
        label: 'Open Mic',
        getFn: getOpenMicById,
        hasDate: false,
    },
    writersRound: {
        label: "Writers Round",
        getFn: getWritersRoundById,
        hasDate: true,
    },
}


export const EventDetails = ({ eventType }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [details, setDetails] = useState(null)
    const config = CONFIG[eventType]

    useEffect(() => {
        config.getFn(id).then(data => {
            setDetails({
                event_title: data.event_title ?? '',
                date: data.date ?? '',
                start_time: data.start_time ?? '',
                end_time: data.end_time ?? '',
                description: data.description ?? ''
            })
        })
    }, [id, config])

    if (!details) return null

    const formatDate = (dateStr) => {
        if (!dateStr) return ""
        const [year, month, day] = dateStr.split('-').map(Number)
        return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
    }

    const formatTime = (timeString) => {
        if (!timeString) return ''
        const [hours, minutes] = timeString.split(':').map(Number)
        const period = hours >= 12 ? 'PM' : 'AM'
        const h12 = hours % 12 || 12
        return `${h12}:${String(minutes).padStart(2, '0')} ${period}`
    }

    return (
        <div className="page-content">
            <div className="event-detail">
                <button className="btn btn--secondary btn--sm event-detail__back" onClick={() => navigate("/")}>
                    ← Back
                </button>
                <div className="event-detail__card">
                    <span className="event-detail__type-badge">{config.label}</span>
                    <h1 className="event-detail__title">{details.event_title}</h1>
                    <div className="event-detail__meta">
                        {details.date && (
                            <div className="event-detail__meta-item">
                                <i className="fas fa-calendar-alt"></i>
                                <span>{formatDate(details.date)}</span>
                            </div>
                        )}
                        <div className="event-detail__meta-item">
                            <i className="fas fa-clock"></i>
                            <span>{formatTime(details.start_time)} – {formatTime(details.end_time)}</span>
                        </div>
                    </div>
                    {details.description && (
                        <p className="event-detail__description">{details.description}</p>
                    )}
                </div>
            </div>
        </div>
    )
}