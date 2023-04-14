import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import HeaderLink from "./HeaderLink";

import { useCookies } from "react-cookie";
import { useGetUserId } from "../../hooks/useGetUserId";
import { useEffect } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

function Header({ currUsername, fetchCurrentUser }) {
    const [_, setCookies] = useCookies(["access_token"]);
    const userID = useGetUserId();
    const navigate = useNavigate();

    const handleSelectChange = (e) => {
        console.log(e.target.value);
        if (e.target.value === "logout") {
            setCookies("access_token", "");
            window.localStorage.removeItem("userID");
        } else if (e.target.value === "edit") {
            navigate("/profile");
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, [userID]);

    return (
        <header className="header">
            <div className="header-container">
                <nav className="header__nav">
                    <Link to="/" className="header__icon">
                        Twotter
                    </Link>
                    <ul className="header__list">
                        {!userID ? (
                            <li className="header__list-item">
                                <HeaderLink url={"login"} text={"Login"} />
                            </li>
                        ) : (
                            <>
                                <li className="header__list-item">
                                    <select
                                        className="header__select"
                                        name="cars"
                                        id="cars"
                                        onChange={handleSelectChange}
                                        defaultValue="username">
                                        <option
                                            className="header__option"
                                            value="username"
                                            hidden>
                                            {currUsername}
                                        </option>
                                        <option
                                            value="edit"
                                            className="header__option">
                                            Edit profile
                                        </option>
                                        <option
                                            value="logout"
                                            className="header__option">
                                            Logout
                                        </option>
                                    </select>
                                    <DropdownMenu />
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
