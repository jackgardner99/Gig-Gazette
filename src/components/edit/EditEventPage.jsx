import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getVenues } from '../../services/venuesService'
import { getOpenMicById, updateOpenMic, deleteOpenMic, getWritersRoundById, updateWritersRound, deleteWritersRound } from '../../services/eventService'
import { getShowById, updateArtistShow, deleteArtistShow } from '../../services/artistShowsService'

const CONFIG = {
    show: {
        label: 'Artist Show',
        getFn: (id) => getShowById(id).then(data => Array.isArray(data) ? data[0] : data),
        updateFn: updateArtistShow,
        deleteFn: (id) => deleteArtistShow({ id }),
        hasDate: true,
        hasTicketLink: true,
    },
    openMic: {
        label: 'Open Mic',
        getFn: getOpenMicById,
        updateFn: updateOpenMic,
        deleteFn: (id) => deleteOpenMic({ id }),
        hasDate: false,
    },
    writersRound: {
        label: "Writers Round",
        getFn: getWritersRoundById,
        updateFn: updateWritersRound,
        deleteFn: deleteWritersRound,
        hasDate: true,
    },
}

export const EditEventPage = ({ eventType }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [venues, setVenues] = useState([])
    const [status, setStatus] = useState(null)
    const [form, setForm] = useState(null)
    const config = CONFIG[eventType]

    useEffect(() => {
        getVenues().then(data => setVenues(Array.isArray(data) ? data : (data?.results ?? [])))
        config.getFn(id).then(data => {
            setForm({
                event_title: data.event_title ?? '',
                venue: data.venue?.id ?? '',
                date: data.date ?? '',
                recurrence: data.recurrence ?? '',
                ticket_link: data.ticket_link ?? '',
                start_time: data.start_time ?? '',
                end_time: data.end_time ?? '',
            })
        })
    }, [id])

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus(null)
        try {
            const userId = JSON.parse(sessionStorage.getItem("user"))?.id
            await config.updateFn({ id: parseInt(id), ...form, venue: parseInt(form.venue), user: userId })
            setStatus('success')
        } catch {
            setStatus('error')
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this event?')) return
        await config.deleteFn(parseInt(id))
        navigate('/submit')
    }

    if (!form) return null

    return (
        <div className="page-content">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__section-title">Edit {config.label}</h2>

                <div className="form__field">
                    <label className="form__label form__label--required">Venue</label>
                    <select
                        className="form__select"
                        name="venue"
                        value={form.venue}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a venue</option>
                        {venues.map(v => (
                            <option key={v.id} value={v.id}>{v.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form__field">
                    <label className="form__label form__label--required">Event Title</label>
                    <input
                        className="form__input"
                        type="text"
                        name="event_title"
                        value={form.event_title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {config.hasDate ? (
                    <div className="form__field">
                        <label className={`form__label${eventType === 'writersRound' || !form.recurrence ? ' form__label--required' : ''}`}>Date</label>
                        <input
                            className="form__input"
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required={eventType === 'writersRound' || !form.recurrence}
                        />
                    </div>
                ) : (
                    <div className="form__field">
                        <label className="form__label form__label--required">Recurrence</label>
                        <input
                            className="form__input"
                            type="text"
                            name="recurrence"
                            value={form.recurrence}
                            onChange={handleChange}
                            placeholder="e.g. Every Tuesday"
                            required
                        />
                    </div>
                )}

                {config.hasTicketLink && (
                    <div className="form__field">
                        <label className="form__label">Recurrence</label>
                        <input
                            className="form__input"
                            type="text"
                            name="recurrence"
                            value={form.recurrence}
                            onChange={handleChange}
                            placeholder="e.g. Every Friday"
                        />
                    </div>
                )}

                {config.hasTicketLink && (
                    <div className="form__field">
                        <label className="form__label">Ticket Link</label>
                        <input
                            className="form__input"
                            type="url"
                            name="ticket_link"
                            value={form.ticket_link}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                    </div>
                )}

                <div className="form__row">
                    <div className="form__field">
                        <label className="form__label form__label--required">Start Time</label>
                        <input
                            className="form__input"
                            type="time"
                            name="start_time"
                            value={form.start_time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label form__label--required">End Time</label>
                        <input
                            className="form__input"
                            type="time"
                            name="end_time"
                            value={form.end_time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {status === 'success' && (
                    <div className="form__hint" style={{ color: 'var(--teal)' }}>
                        Event updated successfully!
                    </div>
                )}
                {status === 'error' && (
                    <div className="form__error">
                        Something went wrong. Please try again.
                    </div>
                )}

                <div className="form__actions">
                    <button type="submit" className="btn btn--primary btn--full">Save Changes</button>
                    <button type="button" className="btn btn--danger btn--full" onClick={handleDelete}>
                        Delete Event
                    </button>
                </div>
            </form>
        </div>
    )
}
