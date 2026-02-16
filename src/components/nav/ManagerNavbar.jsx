import { Link, useNavigate } from "react-router-dom"

export const ManagerNavbar = () => {
    const navigate = useNavigate()

    return (
        <ul>
            <li><Link to={"/managers"}>Clients</Link></li>
            <li><Link to={"/managers/map"}>Map</Link></li>
            {localStorage.getItem("manager") ? 
            (<li>
                <Link to={"/login"} onClick={() => {
                localStorage.removeItem("manager")
                navigate("/login", { replace: true })
            }}
                    >Logout
                </Link>
            </li>) : 
            ("")
        }
            
        </ul>
    )
}