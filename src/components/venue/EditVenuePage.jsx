import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getVenueById, updateVenue, deleteVenue } from '../../services/venuesService'

const NOISE_LEVELS = ['low', 'medium', 'high']

export const EditVenuePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState(null)
    const [status, setStatus] = useState(null)
    const [existingImage, setExistingImage] = useState(null)
    const [venueImage, setVenueImage] = useState(null)

    useEffect(() => {
        getVenueById(id).then(data => {
            setExistingImage(data.venue_image ?? null)
            setForm({
                name: data.name ?? '',
                address_number: data.address_number ?? '',
                address: data.address ?? '',
                city: data.city ?? '',
                state: data.state ?? '',
                country: data.country ?? 'US',
                noise_level: data.noise_level ?? '',
                bar: data.bar ?? false,
                beer_only: data.beer_only ?? false,
                food: data.food ?? false,
                kid_friendly: data.kid_friendly ?? false,
                parking: data.parking ?? false,
                seating: data.seating ?? false,
                requires_reservation: data.requires_reservation ?? false,
                outdoor: data.outdoor ?? false,
                cover_charge: data.cover_charge ?? false,
                ical_feed_url: data.ical_feed_url ?? '',
                website_url: data.website_url ?? '',
            })
        })
    }, [id])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus(null)
        try {
            let payload
            if (venueImage) {
                payload = new FormData()
                payload.append('id', parseInt(id))
                Object.entries(form).forEach(([k, v]) => payload.append(k, v))
                payload.append('venue_image', venueImage)
            } else {
                payload = { id: parseInt(id), ...form }
            }
            const res = await updateVenue(payload)
            if (res.ok) {
                setStatus('success')
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this venue?')) return
        await deleteVenue(parseInt(id))
        navigate('/')
    }

    if (!form) return null

    return (
        <div className="page-content">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__section-title">Edit Venue</h2>

                <div className="form__field">
                    <label className="form__label form__label--required">Venue Name</label>
                    <input
                        className="form__input"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form__row">
                    <div className="form__field">
                        <label className="form__label form__label--required">Street Number</label>
                        <input
                            className="form__input"
                            type="text"
                            name="address_number"
                            value={form.address_number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label form__label--required">Street Address</label>
                        <input
                            className="form__input"
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__field">
                        <label className="form__label form__label--required">City</label>
                        <input
                            className="form__input"
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label form__label--required">State</label>
                        <input
                            className="form__input"
                            type="text"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label">Country</label>
                        <input
                            className="form__input"
                            type="text"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form__field">
                    <label className="form__label form__label--required">Noise Level</label>
                    <select
                        className="form__select"
                        name="noise_level"
                        value={form.noise_level}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select noise level</option>
                        {NOISE_LEVELS.map(level => (
                            <option key={level} value={level}>
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form__field">
                    <label className="form__label">Amenities</label>
                    {[
                        { name: 'bar', label: 'Bar' },
                        { name: 'beer_only', label: 'Beer Only' },
                        { name: 'food', label: 'Food' },
                        { name: 'kid_friendly', label: 'Kid Friendly' },
                        { name: 'parking', label: 'Parking' },
                        { name: 'seating', label: 'Seating' },
                        { name: 'requires_reservation', label: 'Requires Reservation' },
                        { name: 'outdoor', label: 'Outdoor' },
                        { name: 'cover_charge', label: 'Cover Charge' },
                    ].map(({ name, label }) => (
                        <label key={name} className="form__check">
                            <input
                                type="checkbox"
                                name={name}
                                checked={form[name]}
                                onChange={handleChange}
                            />
                            <span className="form__check-label">{label}</span>
                        </label>
                    ))}
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

                <div className="form__field">
                    <label className="form__label">iCal Feed URL</label>
                    <input
                        className="form__input"
                        type="url"
                        name="ical_feed_url"
                        value={form.ical_feed_url}
                        onChange={handleChange}
                        placeholder="https://example.com/calendar.ics"
                    />
                    <span className="form__hint">Paste your venue's iCal feed URL to automatically sync events.</span>
                </div>

                <div className="form__field">
                    <label className="form__label">Venue Image</label>
                    {existingImage && !venueImage && (
                        <img src={`https://gig-gazette-api-production.up.railway.app${existingImage}`} alt="Current venue" style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }} />
                    )}
                    <input
                        className="form__input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setVenueImage(e.target.files[0] ?? null)}
                    />
                </div>

                {status === 'success' && (
                    <div className="form__hint" style={{ color: 'var(--teal)' }}>
                        Venue updated successfully!
                    </div>
                )}
                {status === 'error' && (
                    <div className="form__error">
                        Something went wrong. Please try again.
                    </div>
                )}

                <div className="form__actions">
                    <button type="submit" className="btn btn--primary btn--full">
                        Save Changes
                    </button>
                    <button type="button" className="btn btn--danger btn--full" onClick={handleDelete}>
                        Delete Venue
                    </button>
                </div>
            </form>
        </div>
    )
}
