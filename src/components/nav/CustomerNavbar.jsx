import { useState } from "react"
import { Link } from "react-router-dom"


export const CustomerNavbar = ({ onStartTour }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const closeMenu = () => setMenuOpen(false)

    return (
        <header className="nav">
            <div className="nav__brand-name">
                Gig Gazette™
            </div>
            <button
                type="button"
                className="nav__toggle"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(open => !open)}
            >
                <i className={`fas ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
            <nav>
                <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
                    <Link to={"/"} onClick={closeMenu}>
                        <li className="nav__link">Map</li>
                    </Link>
                    <Link to={"/submit"} onClick={closeMenu}>
                        <li className="nav__link">Submit Event</li>
                    </Link>
                    <Link to={"/venues/new"} onClick={closeMenu}>
                        <li className="nav__link">Add Venue</li>
                    </Link>
                    <Link to={"/contact"} onClick={closeMenu}>
                        <li className="nav__link">Contact</li>
                    </Link>
                    <li>
                        <button className="nav__tour-btn" onClick={() => { closeMenu(); onStartTour() }}>
                            <i className="fas fa-circle-question"></i>
                            Tour
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
