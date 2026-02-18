import { Link, useNavigate } from "react-router-dom"

export const ManagerNavbar = () => {
    const navigate = useNavigate()

    return (
    <header className="header">
        <ul className="navbar">
            <Link to={"/managers"}><li className="nav-button">Clients</li></Link>
            <Link to={"/managers/map"}><li className="nav-button">Map</li></Link>
            {localStorage.getItem("manager") ? 
            (<Link to={"/login"} onClick={() => {
                localStorage.removeItem("manager")
                navigate("/login", { replace: true })
            }}>
            <li className="nav-button">
                Logout                
            </li></Link>) : 
            ("")
        }
            
        </ul>
    </header>
        
    )
}