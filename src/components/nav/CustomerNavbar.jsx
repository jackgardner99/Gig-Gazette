import { Link } from "react-router-dom"
import '../../CSS/NavBar.css'

export const CustomerNavbar = () => {
    return (
        <header id="header">
            <div className="logo">
                Gig Gazette
            </div>
            <nav>
                <ul>
                    <Link to={"/"}>
                        <li>
                            Map
                        </li>
                    </Link>    
                    <Link to={"/login"}>
                        <li>
                            Login
                        </li>
                    </Link>
                </ul>
            </nav>            
        </header>
    )
}