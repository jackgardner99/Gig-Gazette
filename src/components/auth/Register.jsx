import { useState } from "react"
import { createManager, loginManager, getManagerProfile } from "../../services/managerService"
import { Link, useNavigate } from "react-router-dom"

export const Register = () => {
    const [manager, setManager] = useState({
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (!manager.username || !manager.email || !manager.password) {
            window.alert("Please make sure all input fields are filled out before submitting")
            return
        }

        createManager(manager).then((res) => {
            if (res.ok) {
                loginManager(manager.username, manager.password).then((authRes) => {
                    if (authRes.token) {
                        localStorage.setItem("manager", JSON.stringify({ token: authRes.token }))

                        getManagerProfile().then((profile) => {
                            localStorage.setItem("manager", JSON.stringify({ id: profile.id, token: authRes.token }))
                            navigate("/managers")
                        })
                    }
                })
            } else {
                window.alert("Registration failed. That username or email may already be in use.")
            }
        })
    }

    return (
        <main>
            <form className="form">
                <div className="form__field">
                    <h2 className="form__section-title">Welcome New Manager!</h2>
                    <div>
                        <p className="form__label">Username</p>
                        <input className="form__input" type="text" onChange={(e) => {
                            setManager({ ...manager, username: e.target.value })
                        }} placeholder="Enter a username" required />
                    </div>
                    <div>
                        <p className="form__label">Email</p>
                        <input className="form__input" type="email" onChange={(e) => {
                            setManager({ ...manager, email: e.target.value })
                        }} placeholder="Enter your email" required />
                    </div>
                    <div>
                        <p className="form__label">Password</p>
                        <input className="form__input" type="password" onChange={(e) => {
                            setManager({ ...manager, password: e.target.value })
                        }} placeholder="Create a password" required />
                    </div>
                    <div>
                        <button className="form__day-btn" type="submit" onClick={handleRegister}>Register</button>
                    </div>
                    <div>
                        Already have an account? <Link to={'/login'}>Login!</Link>
                    </div>
                </div>
            </form>
        </main>
    )
}
