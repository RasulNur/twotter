import { useState } from "react";
import "./Profile.css";
import { useGetUserId } from "../../hooks/useGetUserId";
import axios from "axios";

export default function Profile({ currUsername, fetchCurrentUser }) {
    const userID = useGetUserId();

    const [newUser, setNewUser] = useState({
        newUsername: "",
        currPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const onSubmitUsername = async (e) => {
        e.preventDefault();
        const id = userID;
        const { newUsername } = newUser;

        try {
            await axios.put(`auth/changeusername/${id}`, {
                username: newUsername,
            });
            setNewUser({ ...newUser, newUsername: "" });
            fetchCurrentUser();
        } catch (e) {
            console.error(e);
        }
    };

    const onSubmitPassword = async (e) => {
        e.preventDefault();
        const id = userID;
        const { currPassword, newPassword, confirmPassword } = newUser;

        if (newPassword !== confirmPassword) {
            setNewUser({ ...newUser, confirmPassword: "" });
            alert("The new password and confirm password does not match");
            return;
        }

        try {
            const res = await axios.post(`auth/changepassword/${id}`, {
                currPassword,
                newPassword,
            });

            setNewUser({
                ...newUser,
                currPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            console.log(res);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <section className="profile">
            <div className="container">
                <div className="profile__wrapper">
                    <h1 className="profile__heading">Profile</h1>

                    <form
                        className="profile__form profile__form-username"
                        onSubmit={onSubmitUsername}>
                        <h2 className="profile__form-heading">
                            Change username
                        </h2>
                        <p>Current username: {currUsername}</p>
                        <label className="profile__label">
                            New username
                            <input
                                value={newUser.newUsername}
                                type="text"
                                className="profile__input"
                                name="newUsername"
                                required
                                autoComplete="on"
                                onChange={handleChange}
                            />
                        </label>
                        <button className="profile__btn" type="sumbit">
                            Save
                        </button>
                    </form>

                    <form
                        className="profile__form profile__form-password"
                        onSubmit={onSubmitPassword}>
                        <h2 className="profile__form-heading">
                            Change password
                        </h2>
                        <label htmlFor="" className="profile__label">
                            Current password
                            <input
                                type="password"
                                className="profile__input"
                                required
                                autoComplete="on"
                                name="currPassword"
                                value={newUser.currPassword}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="" className="profile__label">
                            New password
                            <input
                                type="password"
                                className="profile__input"
                                required
                                autoComplete="on"
                                name="newPassword"
                                value={newUser.newPassword}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="" className="profile__label">
                            Confirm new password
                            <input
                                type="password"
                                className="profile__input"
                                required
                                autoComplete="on"
                                name="confirmPassword"
                                value={newUser.confirmPassword}
                                onChange={handleChange}
                            />
                        </label>
                        <button className="profile__btn" type="sumbit">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
