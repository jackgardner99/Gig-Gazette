import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { loginManager, getManagerProfile } from "../../services/managerService"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || "/submit"

    const handleLogin = (e) => {
        e.preventDefault()

        loginManager(username, password).then((res) => {
            if (res.token) {
                sessionStorage.setItem("user", JSON.stringify({ token: res.token }))

                getManagerProfile().then((profile) => {
                    sessionStorage.setItem("user", JSON.stringify({ id: profile.id, token: res.token }))
                    navigate(from, { replace: true })
                })
            } else {
                window.alert("Invalid username or password")
            }
        })
    }

    return (
        <div className="page-content">
            <form className="form" onSubmit={handleLogin}>
                <h2 className="form__section-title">Sign In</h2>
                <div className="form__field">
                    <label className="form__label form__label--required">Username</label>
                    <input
                        className="form__input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        autoFocus
                    />
                </div>
                <div className="form__field">
                    <label className="form__label form__label--required">Password</label>
                    <input
                        className="form__input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="form__actions">
                    <button className="btn btn--primary btn--full" type="submit">Sign In</button>
                </div>
                <div className="form__hint">
                    Don't have an account?{" "}
                    <Link to="/register" state={{ from }}>Register</Link>
                </div>
            </form>
        </div>
    )
}
