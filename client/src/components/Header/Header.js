import { Link } from "react-router-dom";
import "./Header.css";
import HeaderLink from "./HeaderLink";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { useGetUserId } from "../../hooks/useGetUserId";

import ReactSelect from "../ReactSelect/ReactSelect";

function Header() {
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const userID = useGetUserId();

    const handleSelectChange = (selected) => {
        if (selected.value === "logout") {
            setCookies("access_token", "");
            window.localStorage.removeItem("userID");
            navigate("/login");
        } else if (selected.value === "profile") {
            navigate("/profile");
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <nav className="header__nav">
                    <Link
                        to="/"
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}
                        className="header__icon">
                        Twotter
                    </Link>
                    <ul className="header__list">
                        {!userID ? (
                            <li className="header__list-item">
                                <HeaderLink url={"login"} text={"Login"} />
                            </li>
                        ) : (
                            <li className="header__list-item">
                                <ReactSelect
                                    handleSelectChange={handleSelectChange}
                                />
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
