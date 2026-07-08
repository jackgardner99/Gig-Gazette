import { useState } from 'react'
import { Link } from 'react-router-dom'
import { requestPasswordReset } from '../../services/managerService'

export const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setStatus(null)
        try {
            await requestPasswordReset(email)
            setStatus('sent')
        } catch {
            setStatus('error')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="page-content">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__section-title">Reset Password</h2>

                {status === 'sent' ? (
                    <>
                        <p className="form__hint">
                            If an account exists for <strong>{email}</strong>, you'll receive a reset link shortly. Check your inbox.
                        </p>
                        <div className="form__actions">
                            <Link to="/login" className="btn btn--secondary btn--full">Back to Sign In</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="form__hint">Enter the email address on your account and we'll send you a link to reset your password.</p>

                        <div className="form__field">
                            <label className="form__label form__label--required">Email</label>
                            <input
                                className="form__input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                autoFocus
                            />
                        </div>

                        {status === 'error' && (
                            <div className="form__error">Something went wrong. Please try again.</div>
                        )}

                        <div className="form__actions">
                            <button className="btn btn--primary btn--full" type="submit" disabled={submitting}>
                                {submitting ? 'Sending…' : 'Send Reset Link'}
                            </button>
                        </div>

                        <div className="form__hint">
                            <Link to="/login">Back to Sign In</Link>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}
