import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import HeaderLink from "./HeaderLink";

import { useCookies } from "react-cookie";
import { useGetUserId } from "../../hooks/useGetUserId";

function Header() {
    const [_, setCookies] = useCookies(["access_token"]);
    const userID = useGetUserId();
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/register");
    };
    return (
        <header className="header">
            <div className="container">
                <nav className="header__nav">
                    <Link to="/" className="header__icon">
                        Twotter
                    </Link>
                    <ul className="header__list">
                        {!userID ? (
                            <li className="header__list-item">
                                <HeaderLink
                                    url={"register"}
                                    text={"Register"}
                                />
                            </li>
                        ) : (
                            <>
                                <li className="header__list-item">
                                    <HeaderLink
                                        url={"profile"}
                                        text={"Profile"}
                                    />
                                </li>
                                <li className="header__list-item">
                                    <button
                                        className="header__btn"
                                        onClick={logout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
