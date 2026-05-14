import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginManager, getManagerProfile } from "../../services/managerService"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        loginManager(username, password).then((res) => {
            if (res.token) {
                localStorage.setItem("manager", JSON.stringify({ token: res.token }))

                getManagerProfile().then((manager) => {
                    localStorage.setItem("manager", JSON.stringify({ id: manager.id, token: res.token }))
                    navigate("/managers")
                })
            } else {
                window.alert("Invalid username or password")
            }
        })
    }

    return (
        <main>
            <section>
                <form className="form">
                    <div className="form__field">
                        <h2 className="form__section-title">Manager Sign In</h2>
                        <div>
                            <p className="form__label">Username</p>
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
                        <div>
                            <p className="form__label">Password</p>
                            <input
                                className="form__input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <section>
                            <div>
                                <button className="form__day-btn" onClick={handleLogin}>Sign In</button>
                            </div>
                        </section>
                        <div>
                            Don't have an account? <Link to={'/register'}>Register!</Link>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    )
}
