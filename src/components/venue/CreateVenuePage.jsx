import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createVenue } from '../../services/venuesService'

const NOISE_LEVELS = ['low', 'medium', 'high']

export const CreateVenuePage = () => {
    const navigate = useNavigate()
    const [status, setStatus] = useState(null)
    const [venueImage, setVenueImage] = useState(null)
    const [form, setForm] = useState({
        name: '',
        address_number: '',
        address: '',
        city: '',
        state: '',
        country: 'US',
        noise_level: '',
        bar: false,
        beer_only: false,
        food: false,
        kid_friendly: false,
        parking: false,
        seating: false,
        requires_reservation: false,
        outdoor: false,
        cover_charge: false,
        ical_feed_url: '',
    })

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
                Object.entries(form).forEach(([k, v]) => payload.append(k, v))
                payload.append('venue_image', venueImage)
            } else {
                payload = form
            }
            const res = await createVenue(payload)
            if (res.ok) {
                navigate('/')
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    return (
        <div className="page-content">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__section-title">Add a Venue</h2>

                <div className="form__field">
                    <label className="form__label form__label--required">Venue Name</label>
                    <input
                        className="form__input"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. The Bluebird Cafe"
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
                            placeholder="e.g. 4104"
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
                            placeholder="e.g. Hillsboro Pike"
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
                            placeholder="e.g. Nashville"
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
                            placeholder="e.g. TN"
                            required
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
                            placeholder="e.g. US"
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
                    <label className="form__label">iCal Feed URL</label>
                    <input
                        className="form__input"
                        type="url"
                        name="ical_feed_url"
                        value={form.ical_feed_url}
                        onChange={handleChange}
                        placeholder="https://..."
                    />
                    <span className="form__hint">Paste your venue's calendar feed URL to automatically sync events.</span>
                </div>

                <div className="form__field">
                    <label className="form__label">Venue Image</label>
                    <input
                        className="form__input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setVenueImage(e.target.files[0] ?? null)}
                    />
                </div>

                {status === 'error' && (
                    <div className="form__error">
                        Something went wrong. Please try again.
                    </div>
                )}

                <div className="form__actions">
                    <button type="submit" className="btn btn--primary btn--full">
                        Add Venue
                    </button>
                </div>
            </form>
        </div>
    )
}
