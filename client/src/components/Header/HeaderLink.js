import { Link } from "react-router-dom";

export default function HeaderLink({ url, text }) {
    return (
        <>
            <Link className="header__link" to={url}>
                {text}
            </Link>
        </>
    );
}
