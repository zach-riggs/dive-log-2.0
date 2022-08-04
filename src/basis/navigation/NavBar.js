import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar= () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/dives/created">New Dive Log</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/dives/location">Locations</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/dives">Dive Catalog</Link>
            </li>
            {
                localStorage.getItem("dive_logger")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("dive_logger")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}