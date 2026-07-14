import { useState } from 'react'

const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_URL

export const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [status, setStatus] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setStatus(null)
        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                setStatus('success')
                setForm({ name: '', email: '', subject: '', message: '' })
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="page-content">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__section-title">Contact Us</h2>
                <p className="form__hint">
                    Have a question, suggestion, or want to get your venue listed? Send us a message and we'll get back to you.
                </p>

                {status === 'success' ? (
                    <div className="form__hint" style={{ color: 'var(--teal)', textAlign: 'center', padding: 'var(--space-6) 0' }}>
                        <i className="fas fa-check-circle" style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--space-3)' }} />
                        Message sent! We'll be in touch soon.
                    </div>
                ) : (
                    <>
                        <div className="form__row">
                            <div className="form__field">
                                <label className="form__label form__label--required">Name</label>
                                <input
                                    className="form__input"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="form__field">
                                <label className="form__label form__label--required">Email</label>
                                <input
                                    className="form__input"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form__field">
                            <label className="form__label form__label--required">Subject</label>
                            <input
                                className="form__input"
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="What's this about?"
                                required
                            />
                        </div>

                        <div className="form__field">
                            <label className="form__label form__label--required">Message</label>
                            <textarea
                                className="form__textarea"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Tell us more..."
                                rows={5}
                                required
                            />
                        </div>

                        {status === 'error' && (
                            <div className="form__error">
                                Something went wrong. Please try again.
                            </div>
                        )}

                        <div className="form__actions">
                            <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
                                {submitting ? 'Sending…' : <><i className="fas fa-envelope" /> Send Message</>}
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}
