import { useEffect, useState } from 'react'
import { getVenues } from '../../services/venuesService'
import { createArtistShow } from '../../services/artistShowsService'
import { createOpenMic, createWritersRound, importCalendar, importCalendarFromBandsintown } from '../../services/eventService'

const EVENT_TYPES = [
    { value: 'show', label: 'Artist Show' },
    { value: 'openMic', label: 'Open Mic' },
    { value: 'writersRound', label: "Writers Round" },
]

const IMPORT_TITLES = {
    file: 'Import from Calendar File',
    bandsintown: 'Sync from Bandsintown',
}

export const SubmitEventPage = () => {
    const [venues, setVenues] = useState([])
    const [mode, setMode] = useState('manual')

    // manual form state
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
        description: '',
        website_url: '',
    })

    // import state
    const [importSource, setImportSource] = useState('file')
    const [icsFile, setIcsFile] = useState(null)
    const [bandsintownApiKey, setBandsintownApiKey] = useState('')
    const [bandsintownArtist, setBandsintownArtist] = useState('')
    const [selectedVenues, setSelectedVenues] = useState([])
    const [venueSearch, setVenueSearch] = useState('')
    const [importStatus, setImportStatus] = useState(null)
    const [importResult, setImportResult] = useState(null)
    const [importing, setImporting] = useState(false)

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
                await createArtistShow({ ...payload, date: form.date, recurrence: form.recurrence, ticket_link: form.ticket_link, description: form.description, website_url: form.website_url })
            } else if (eventType === 'openMic') {
                await createOpenMic({ ...payload, recurrence: form.recurrence, description: form.description, website_url: form.website_url })
            } else {
                await createWritersRound({ ...payload, date: form.date, description: form.description, website_url: form.website_url })
            }
            setStatus('success')
            setForm({ event_title: '', venue: '', date: '', recurrence: '', start_time: '', end_time: '', description: '' })
        } catch {
            setStatus('error')
        }
    }

    const toggleVenue = (id) => {
        setSelectedVenues(prev =>
            prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
        )
    }

    const resetImport = (formEl) => {
        setSelectedVenues([])
        setVenueSearch('')
        setIcsFile(null)
        setBandsintownApiKey('')
        setBandsintownArtist('')
        if (formEl) formEl.reset()
    }

    const handleImport = async (e) => {
        e.preventDefault()
        if (!icsFile) return
        setImporting(true)
        setImportStatus(null)
        setImportResult(null)
        try {
            const result = await importCalendar(icsFile, selectedVenues)
            setImportResult(result)
            setImportStatus('success')
            resetImport(e.target)
        } catch {
            setImportStatus('error')
        } finally {
            setImporting(false)
        }
    }

    const handleBandsintownSync = async (e) => {
        e.preventDefault()
        if (!bandsintownApiKey || !bandsintownArtist) return
        setImporting(true)
        setImportStatus(null)
        setImportResult(null)
        try {
            const result = await importCalendarFromBandsintown(bandsintownApiKey, bandsintownArtist, selectedVenues)
            setImportResult(result)
            setImportStatus('success')
            resetImport(e.target)
        } catch {
            setImportStatus('error')
        } finally {
            setImporting(false)
        }
    }

    const filteredVenues = venues.filter(v =>
        v.name.toLowerCase().includes(venueSearch.toLowerCase())
    )

    return (
        <div className="page-content">

            <div className="form__mode-tabs">
                <button
                    type="button"
                    className={`form__mode-tab ${mode === 'manual' ? 'form__mode-tab--active' : ''}`}
                    onClick={() => setMode('manual')}
                >
                    <i className="fas fa-pen" /> Manual Entry
                </button>
                <button
                    type="button"
                    className={`form__mode-tab ${mode === 'import' ? 'form__mode-tab--active' : ''}`}
                    onClick={() => setMode('import')}
                >
                    <i className="fas fa-calendar-import" /> Import Events
                </button>
            </div>

            {mode === 'manual' ? (
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

                    <div className="form__field">
                        <label className="form__label">Description</label>
                        <textarea
                            className="form__textarea"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Details please..."
                            rows={3}
                        />
                    </div>

                    <div className="form__field">
                        <label className="form__label">Website URL</label>
                        <input
                            className="form__input"
                            type="url"
                            name="website_url"
                            value={form.website_url}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                    </div>

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
            ) : (
                <form
                    className="form"
                    onSubmit={importSource === 'file' ? handleImport : handleBandsintownSync}
                >
                    <h2 className="form__section-title">{IMPORT_TITLES[importSource]}</h2>

                    <div className="form__mode-tabs" style={{ maxWidth: '100%', marginBottom: 'var(--space-4)' }}>
                        <button
                            type="button"
                            className={`form__mode-tab ${importSource === 'file' ? 'form__mode-tab--active' : ''}`}
                            onClick={() => { setImportSource('file'); setImportStatus(null) }}
                        >
                            <i className="fas fa-file-arrow-up" /> Upload File
                        </button>
                        <button
                            type="button"
                            className={`form__mode-tab ${importSource === 'bandsintown' ? 'form__mode-tab--active' : ''}`}
                            onClick={() => { setImportSource('bandsintown'); setImportStatus(null) }}
                        >
                            <i className="fas fa-music" /> Bandsintown
                        </button>
                    </div>

                    {importSource !== 'bandsintown' && (
                        <div className="form__caution">
                            <i className="fas fa-triangle-exclamation" />
                            <div>
                                <strong>Important:</strong> Make sure every event has the right keyword in the title so it's categorized correctly.
                                <ul className="form__caution-list">
                                    <li><strong>"Open Mic"</strong> in the title → imported as an Open Mic</li>
                                    <li><strong>"Writers Round"</strong> in the title → imported as a Writers Round</li>
                                    <li>Anything else → imported as an Artist Show</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {importSource === 'file' && (
                        <div className="form__field">
                            <label className="form__label form__label--required">Calendar File (.ics or .zip)</label>
                            <p className="form__hint">Export from Google Calendar, Apple Calendar, or any calendar app.</p>
                            <input
                                className="form__input"
                                type="file"
                                accept=".ics,.zip,text/calendar,application/zip"
                                required
                                onChange={(e) => setIcsFile(e.target.files[0] ?? null)}
                            />
                        </div>
                    )}

                    {importSource === 'bandsintown' && (
                        <>
                            <div className="form__field">
                                <label className="form__label form__label--required">Bandsintown API Key</label>
                                <input
                                    className="form__input"
                                    type="text"
                                    value={bandsintownApiKey}
                                    onChange={(e) => setBandsintownApiKey(e.target.value)}
                                    placeholder="abc123..."
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <label className="form__label form__label--required">Artist / Tour Name</label>
                                <input
                                    className="form__input"
                                    type="text"
                                    value={bandsintownArtist}
                                    onChange={(e) => setBandsintownArtist(e.target.value)}
                                    placeholder="e.g. Nashville Tour Stop"
                                    required
                                />
                                <p className="form__hint">The artist or tour name to search for on Bandsintown.</p>
                            </div>

                            <div className="form__caution" style={{ marginTop: 'var(--space-2)' }}>
                                <i className="fas fa-triangle-exclamation" />
                                <div>
                                    <strong>Before syncing:</strong> make sure every venue playing this tour is already added to Gig Gazette. Then select them below so matching shows can be imported.{' '}
                                    <a href="/venues/new" target="_blank" rel="noreferrer" style={{ color: 'var(--amber-light)' }}>
                                        Add a venue →
                                    </a>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="form__field">
                        <label className="form__label">Venues</label>
                        <p className="form__hint">Select the venues where these shows are booked.</p>
                        <input
                            className="form__input"
                            type="text"
                            placeholder="Search venues..."
                            value={venueSearch}
                            onChange={(e) => setVenueSearch(e.target.value)}
                            style={{ marginBottom: 'var(--space-2)' }}
                        />
                        <div className="form__venue-list">
                            {filteredVenues.map(v => (
                                <label key={v.id} className="form__check">
                                    <input
                                        type="checkbox"
                                        checked={selectedVenues.includes(v.id)}
                                        onChange={() => toggleVenue(v.id)}
                                    />
                                    <span className="form__check-label">{v.name}</span>
                                </label>
                            ))}
                            {filteredVenues.length === 0 && (
                                <p className="form__hint">No venues match your search.</p>
                            )}
                        </div>
                        {selectedVenues.length > 0 && (
                            <p className="form__hint" style={{ marginTop: 'var(--space-2)' }}>
                                {selectedVenues.length} venue{selectedVenues.length > 1 ? 's' : ''} selected
                            </p>
                        )}
                    </div>

                    {importStatus === 'success' && (
                        <div className="form__hint" style={{ color: 'var(--teal)' }}>
                            {importSource === 'bandsintown' && importResult ? (
                                <>
                                    Sync complete — created {Array.isArray(importResult.created) ? importResult.created.length : importResult.created ?? 0},
                                    {' '}skipped {Array.isArray(importResult.skipped) ? importResult.skipped.length : importResult.skipped ?? 0},
                                    {' '}unmatched {Array.isArray(importResult.unmatched) ? importResult.unmatched.length : importResult.unmatched ?? 0}.
                                </>
                            ) : (
                                <>Import complete!{importResult ? ` ${importResult.created ?? importResult.count ?? ''} event${(importResult.created ?? importResult.count) !== 1 ? 's' : ''} added.` : ''}</>
                            )}
                        </div>
                    )}
                    {importStatus === 'error' && (
                        <div className="form__error">
                            Something went wrong. {
                                importSource === 'file'
                                    ? 'Make sure the file is a valid .ics calendar export.'
                                    : 'Make sure the API key and artist name are correct.'
                            }
                        </div>
                    )}

                    <div className="form__actions">
                        <button
                            type="submit"
                            className="btn btn--primary btn--full"
                            disabled={
                                importing || (
                                    importSource === 'file'
                                        ? !icsFile
                                        : !bandsintownApiKey || !bandsintownArtist
                                )
                            }
                        >
                            {importing ? 'Importing…' : importSource === 'bandsintown' ? 'Sync Shows' : 'Import Events'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}
