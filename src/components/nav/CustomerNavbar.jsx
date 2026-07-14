import { Link } from "react-router-dom"


export const CustomerNavbar = ({ onStartTour }) => {
    return (
        <header className="nav">
            <div className="nav__brand-name">
                Gig Gazette™
            </div>
            <nav>
                <ul className="nav__links">
                    <Link to={"/"}>
                        <li className="nav__link">Map</li>
                    </Link>
                    <Link to={"/submit"}>
                        <li className="nav__link">Submit Event</li>
                    </Link>
                    <Link to={"/venues/new"}>
                        <li className="nav__link">Add Venue</li>
                    </Link>
                    <Link to={"/contact"}>
                        <li className="nav__link">Contact</li>
                    </Link>
                    <li>
                        <button className="nav__tour-btn" onClick={onStartTour}>
                            <i className="fas fa-circle-question"></i>
                            Tour
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}