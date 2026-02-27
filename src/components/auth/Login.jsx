import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getManagerByEmail } from "../../services/managerService"

export const Login = () => {
    const [email, setEmail] = useState("jtgardner99@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getManagerByEmail(email).then((foundUsers) => {
            if (foundUsers.length === 1) {
                const manager = foundUsers[0]
                console.log(manager)
                localStorage.setItem(
                    "manager",
                    JSON.stringify({
                        id: manager.id,

                    })
                )
                navigate("/managers")
            } else {
                window.alert("Invalid login")
            }
        })
    }


    return (
        <main className="clients-section">
            <section>
                <form className="container-form">
                    <div className="signin-form">
                        <h2>Manager Sign In</h2>
                                <div className="filter-group">
                                    <p>Email</p>
                                    <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(event) => {setEmail(event.target.value)}}
                                    placeholder="Email Address"
                                    required
                                    autoFocus/>
                                </div>
                            <section>
                        <div>
                            <button className="button" onClick={handleLogin}>Sign In</button>
                        </div>
                    </section>
                    <div>
                        Don't have an account? <Link to={'/register'}><a>Register!</a></Link>
                    </div>
                    </div>
                </form>
            </section>
        </main>
    )
}