import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { createManager, loginManager, getManagerProfile } from "../../services/managerService"

export const Register = () => {
    const [manager, setManager] = useState({ username: "", email: "", password: "" })
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || "/submit"

    const handleRegister = (e) => {
        e.preventDefault()

        createManager(manager).then((res) => {
            if (res.ok) {
                loginManager(manager.username, manager.password).then((authRes) => {
                    if (authRes.token) {
                        sessionStorage.setItem("user", JSON.stringify({ token: authRes.token }))

                        getManagerProfile().then((profile) => {
                            sessionStorage.setItem("user", JSON.stringify({ id: profile.id, token: authRes.token }))
                            navigate(from, { replace: true })
                        })
                    }
                })
            } else {
                window.alert("Registration failed. That username or email may already be in use.")
            }
        })
    }

    return (
        <div className="page-content">
            <form className="form" onSubmit={handleRegister}>
                <h2 className="form__section-title">Create Account</h2>
                <div className="form__field">
                    <label className="form__label form__label--required">Username</label>
                    <input
                        className="form__input"
                        type="text"
                        value={manager.username}
                        onChange={(e) => setManager({ ...manager, username: e.target.value })}
                        placeholder="Choose a username"
                        required
                        autoFocus
                    />
                </div>
                <div className="form__field">
                    <label className="form__label form__label--required">Email</label>
                    <input
                        className="form__input"
                        type="email"
                        value={manager.email}
                        onChange={(e) => setManager({ ...manager, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                    />
                </div>
                <div className="form__field">
                    <label className="form__label form__label--required">Password</label>
                    <input
                        className="form__input"
                        type="password"
                        value={manager.password}
                        onChange={(e) => setManager({ ...manager, password: e.target.value })}
                        placeholder="Create a password"
                        required
                    />
                </div>
                <div className="form__actions">
                    <button className="btn btn--primary btn--full" type="submit">Create Account</button>
                </div>
                <div className="form__hint">
                    Already have an account?{" "}
                    <Link to="/login" state={{ from }}>Sign in</Link>
                </div>
            </form>
        </div>
    )
}
