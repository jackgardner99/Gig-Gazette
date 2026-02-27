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
        <main className="clients-section">
            <form className="container-form">
                <div className="signin-form">
                    <h2>Welcome New Manager!</h2>
                    <div className="filter-group">
                        <p>Name</p>
                        <input type="text" onChange={(e) => {
                            const copy = {...manager}
                            copy.name = e.target.value
                            setManager(copy)
                        }} placeholder="Enter your name" required/>
                    </div>

                    <div className="filter-group">
                        <p>Email</p>
                        <input type="email" onChange={(e) => {
                            const copy = {...manager}
                            copy.email = e.target.value
                            setManager(copy)
                        }} placeholder="Enter your email" required/>
                    </div>

                <div>
                    <button className="button" type="submit" onClick={handleRegister}>Register</button>
                </div>
            <div>
                Already have an account? <Link to={'/login'}>Login!</Link>
            </div>
                </div>
            </form>
        </main>
    )
}