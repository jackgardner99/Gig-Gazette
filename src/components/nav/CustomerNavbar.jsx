import { Link } from "react-router-dom"

export const CustomerNavbar = () => {
    return (
        <header className="header">
            <ul className="navbar">
                <Link to={"/"}>
                    <li className="nav-button">
                        Map
                    </li>
                </Link>    
                <Link to={"/login"}>
                    <li className="nav-button">
                        Login
                    </li>
                </Link>
            </ul>
        </header>
    )
}