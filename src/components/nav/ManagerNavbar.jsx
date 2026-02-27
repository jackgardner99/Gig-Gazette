import { Link, useNavigate } from "react-router-dom"
import '../../CSS/NavBar.css'

export const ManagerNavbar = () => {
    const navigate = useNavigate()

    return (
    <header id="header">
        <div className="logo">
            Gig Gazette
        </div>
        <nav>
            <ul>
                <Link to={"/managers"}><li>Clients</li></Link>
                <Link to={"/managers/map"}><li>Map</li></Link>
                {localStorage.getItem("manager") ? 
                (<Link to={"/login"} onClick={() => {
                    localStorage.removeItem("manager")
                    navigate("/login", { replace: true })
                }}>
                <li>
                    Logout                
                </li></Link>) : 
                ("")
            }
                
            </ul>
        </nav>
    </header>
        
    )
}