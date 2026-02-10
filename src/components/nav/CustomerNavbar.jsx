import { Link } from "react-router-dom"

export const CustomerNavbar = () => {
    return (
        <ul>
            <li>
                <Link to={"/"}>Map</Link>
            </li>
            <li>
                <Link to={"/login"}>Login</Link>
            </li>
        </ul>
    )
}