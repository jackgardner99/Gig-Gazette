import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { confirmPasswordReset } from '../../services/managerService'

export const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const uid = searchParams.get('uid')
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [status, setStatus] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    if (!uid || !token) {
        return (
            <div className="page-content">
                <div className="form">
                    <h2 className="form__section-title">Invalid Link</h2>
                    <p className="form__hint">This password reset link is missing required information. Please request a new one.</p>
                    <div className="form__actions">
                        <Link to="/forgot-password" className="btn btn--primary btn--full">Request New Link</Link>
                    </div>
                </div>
            </div>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirm) { setStatus('mismatch'); return }
        setSubmitting(true)
        setStatus(null)
        try {
            await confirmPasswordReset(uid, token, password)
            setStatus('success')
        } catch {
            setStatus('error')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="page-content">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__section-title">Set New Password</h2>

                {status === 'success' ? (
                    <>
                        <p className="form__hint">Your password has been updated. You can now sign in with your new password.</p>
                        <div className="form__actions">
                            <Link to="/login" className="btn btn--primary btn--full">Sign In</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="form__field">
                            <label className="form__label form__label--required">New Password</label>
                            <input
                                className="form__input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New password"
                                required
                                autoFocus
                            />
                        </div>

                        <div className="form__field">
                            <label className="form__label form__label--required">Confirm Password</label>
                            <input
                                className="form__input"
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                placeholder="Confirm new password"
                                required
                            />
                        </div>

                        {status === 'mismatch' && (
                            <div className="form__error">Passwords do not match.</div>
                        )}
                        {status === 'error' && (
                            <div className="form__error">This link may have expired. Please request a new one.</div>
                        )}

                        <div className="form__actions">
                            <button className="btn btn--primary btn--full" type="submit" disabled={submitting}>
                                {submitting ? 'Saving…' : 'Set New Password'}
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}
