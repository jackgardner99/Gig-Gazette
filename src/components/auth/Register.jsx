import { useState } from "react"
import { createManager, getManagerByEmail } from "../../services/managerService"
import { Link, useNavigate } from "react-router-dom"

export const Register = () => {
    const [manager, setManager] = useState({
        name: "",
        email: ""
    })
    const navigate = useNavigate()

    const navigateToManagersPage = () => {
        getManagerByEmail(manager.email).then((res) => {
                if (res.length === 1) {
                    const manager = res[0]
                    console.log(manager)
                    localStorage.setItem(
                        "manager",
                        JSON.stringify({id: manager.id})
                    )
                    navigate('/managers')
                }
            })
    }

    const registerNewManager = () => {
        createManager(manager).then(navigateToManagersPage)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        getManagerByEmail(manager.email).then((response) => {
            if (response.length > 0) {
                window.alert("Email is already in use. Please provide another email.")
            } else {
                registerNewManager()
            }
        })
    }

    return (
        <main>
            <h2>Welcome New Manager!</h2>
            <form>
                    <div>
                        <input type="text" onChange={(e) => {
                            const copy = {...manager}
                            copy.name = e.target.value
                            setManager(copy)
                        }} placeholder="Enter your name" required/>
                    </div>

                    <div>
                        <input type="email" onChange={(e) => {
                            const copy = {...manager}
                            copy.email = e.target.value
                            setManager(copy)
                        }} placeholder="Enter your email" required/>
                    </div>

                <div>
                    <button type="submit" onClick={handleRegister}>Register</button>
                </div>
            </form>
            <div>
                Already have an account? <Link to={'/login'}>Login!</Link>
            </div>
        </main>
    )
}