import { Link } from "react-router-dom"

export const CustomerNavbar = () => {
    return (
        <header>
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
        </header>
    )
}