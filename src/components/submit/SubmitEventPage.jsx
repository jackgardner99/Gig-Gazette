import { useEffect, useState } from 'react'
import { getVenues } from '../../services/venuesService'
import { createArtistShow } from '../../services/artistShowsService'
import { createOpenMic, createWritersRound } from '../../services/eventService'

const EVENT_TYPES = [
    { value: 'show', label: 'Artist Show' },
    { value: 'openMic', label: 'Open Mic' },
    { value: 'writersRound', label: "Writers Round" },
]

export const SubmitEventPage = () => {
    const [venues, setVenues] = useState([])
    const [eventType, setEventType] = useState('show')
    const [status, setStatus] = useState(null)
    const [form, setForm] = useState({
        event_title: '',
        venue: '',
        date: '',
        recurrence: '',
        start_time: '',
        end_time: '',
        ticket_link: '',
    })

    useEffect(() => {
        getVenues().then(data => setVenues(Array.isArray(data) ? data : (data?.results ?? [])))
    }, [])

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus(null)
        try {
            const userId = JSON.parse(sessionStorage.getItem("user"))?.id
            const payload = {
                event_title: form.event_title,
                venue: parseInt(form.venue),
                start_time: form.start_time,
                end_time: form.end_time,
                user: userId,
            }
            if (eventType === 'show') {
                await createArtistShow({ ...payload, date: form.date, recurrence: form.recurrence, ticket_link: form.ticket_link })
            } else if (eventType === 'openMic') {
                await createOpenMic({ ...payload, recurrence: form.recurrence })
            } else {
                await createWritersRound({ ...payload, date: form.date })
            }
            setStatus('success')
            setForm({ event_title: '', venue: '', date: '', recurrence: '', start_time: '', end_time: '' })
        } catch {
            setStatus('error')
        }
    }

    return (
        <div className="page-content">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__section-title">Submit an Event</h2>

                <div className="form__field">
                    <label className="form__label form__label--required">Event Type</label>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                        {EVENT_TYPES.map(({ value, label }) => (
                            <label key={value} className="form__check">
                                <input
                                    type="radio"
                                    name="eventType"
                                    value={value}
                                    checked={eventType === value}
                                    onChange={() => setEventType(value)}
                                />
                                <span className="form__check-label">{label}</span>
                            </label>
                        ))}
                    </div>
                </div>

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
                        placeholder="e.g. Tuesday Night Open Mic"
                        required
                    />
                </div>

                {eventType === 'openMic' ? (
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
                ) : (
                    <div className="form__field">
                        <label className={`form__label${eventType === 'writersRound' || !form.recurrence ? ' form__label--required' : ''}`}>Date (not required if recurring event)</label>
                        <input
                            className="form__input"
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required={eventType === 'writersRound' || !form.recurrence}
                        />
                    </div>
                )}

                {eventType === 'show' && (
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

                {eventType === 'show' && (
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
                        Event submitted successfully!
                    </div>
                )}
                {status === 'error' && (
                    <div className="form__error">
                        Something went wrong. Please try again.
                    </div>
                )}

                <div className="form__actions">
                    <button type="submit" className="btn btn--primary btn--full">
                        Submit Event
                    </button>
                </div>
            </form>
        </div>
    )
}
