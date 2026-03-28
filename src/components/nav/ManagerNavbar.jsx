import { Link, useNavigate } from "react-router-dom"


export const ManagerNavbar = () => {
    const navigate = useNavigate()

    return (
    <header className="nav">
        <div className="nav__brand-name">
            Gig Gazette
        </div>
        <nav>
            <ul className="nav__links">
                <Link to={"/managers"}><li className="nav__link">Clients</li></Link>
                <Link to={"/managers/map"}><li className="nav__link">Map</li></Link>
                {localStorage.getItem("manager") ? 
                (<Link to={"/login"} onClick={() => {
                    localStorage.removeItem("manager")
                    navigate("/login", { replace: true })
                }}>
                <li className="nav__link">
                    Logout                
                </li></Link>) : 
                ("")
            }
                
            </ul>
        </nav>
    </header>
        
    )
}