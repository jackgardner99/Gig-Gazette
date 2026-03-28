import { Link } from "react-router-dom"


export const CustomerNavbar = () => {
    return (
        <header className="nav">
            <div className="nav__brand-name">
                Gig Gazette
            </div>
            <nav>
                <ul className="nav__links">
                    <Link to={"/"}>
                        <li className="nav__link">
                            Map
                        </li>
                    </Link>    
                    <Link to={"/login"}>
                        <li className="nav__link">
                            Login
                        </li>
                    </Link>
                </ul>
            </nav>            
        </header>
    )
}