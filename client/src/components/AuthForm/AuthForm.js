import { Link } from "react-router-dom";
import "./AuthForm.css";

export default function RegisterOrLogin({
    heading,
    btn,
    text,
    secBtn,
    onSubmit,
    username,
    setUsername,
    password,
    setPassword,
}) {
    return (
        <section className="registration">
            <div className="container">
                <div className="registration__wrapper">
                    <h1 className="registration__heading">{heading}</h1>
                    <form className="registration__form" onSubmit={onSubmit}>
                        <label className="registration__label">
                            Username
                            <input
                                type="text"
                                className="registration__input"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                autoComplete="on"
                                required
                                minLength="3"
                                maxLength="16"
                            />
                        </label>
                        <label className="registration__label">
                            Password
                            <input
                                type="password"
                                className="registration__input"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                autoComplete="on"
                                required
                                minLength="3"
                                maxLength="16"
                            />
                        </label>

                        <button className="registration__btn">{btn}</button>
                    </form>
                    <div className="registration__is-register">
                        <span className="registration__is-register-text">
                            {text}
                        </span>
                        <Link
                            to={`/${secBtn.toLowerCase()}`}
                            className="registration__is-register-link">
                            {secBtn}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
