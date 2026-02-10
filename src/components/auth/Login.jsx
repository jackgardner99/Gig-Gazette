import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getManagerByEmail } from "../../services/managerService"

export const Login = () => {
    const [email, setEmail] = useState("jtgardner99@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getManagerByEmail(email).then((foundUsers) => {
            if (foundUsers.length === 1) {
                const manager = foundUsers[0]
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
        <main>
            <section>
                <form>
                    <h1>Welcome Manager!</h1>
                    <h2>Manager Sign In</h2>
                    <fieldset>
                        <div>
                            <input 
                            type="email" 
                            value={email} 
                            onChange={(event) => {setEmail(event.target.value)}}
                            placeholder="Email Address"
                            required
                            autoFocus/>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section>
                <div>
                    <button onClick={handleLogin}>Sign In</button>
                </div>
            </section>
        </main>
    )
}