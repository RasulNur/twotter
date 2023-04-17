import { useState } from "react";
import "./Profile.css";
import { useGetUserId } from "../../hooks/useGetUserId";
import axios from "axios";
import toast from "react-hot-toast";
import ChangePswInput from "../../components/ChangePswInput/ChangePswInput";

export default function Profile({ currUsername, fetchCurrentUser }) {
    const userID = useGetUserId();

    const [newUser, setNewUser] = useState({
        newUsername: "",
        currPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const notifyError = (msg) =>
        toast.error(msg, {
            duration: 2000,
            position: "top-right",
            style: { background: "#e1e5e7" },
        });
    const notifySuccess = (msg) =>
        toast.success(msg, {
            duration: 2000,
            position: "top-right",
            style: { background: "#e1e5e7" },
        });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const onSubmitUser = async (e) => {
        e.preventDefault();
        const id = userID;
        const { newUsername, currPassword, newPassword, confirmPassword } =
            newUser;
        try {
            if (newUsername && currPassword && newPassword && confirmPassword) {
                if (newPassword !== confirmPassword) {
                    setNewUser({
                        ...newUser,
                        confirmPassword: "",
                        newPassword: "",
                    });
                    notifyError(
                        "The new password and confirm password does not match"
                    );
                    return;
                }
                if (newUsername === currUsername) {
                    notifyError("You already have that username!");
                    setNewUser({ ...newUser, newUsername: "" });
                    return;
                }

                const res = await axios.post(`auth/changeuser/${id}`, {
                    username: newUsername,
                    currPassword,
                    newPassword,
                });
                if (res.data.message) {
                    notifyError(res.data.message);
                    setNewUser({
                        newUsername: "",
                        currPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                    return;
                }
                setNewUser({
                    newUsername: "",
                    currPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                fetchCurrentUser();
                notifySuccess("The user has been changed successfully!");
            } else if (
                newUsername &&
                !(currPassword && newPassword && confirmPassword)
            ) {
                if (currUsername === newUsername) {
                    notifyError("You already have that username!");
                    setNewUser({ ...newUser, newUsername: "" });
                    return;
                }
                const res = await axios.put(`auth/changeusername/${id}`, {
                    username: newUsername,
                });
                if (res.data.codeName === "DuplicateKey") {
                    notifyError("That username already exist!");
                    setNewUser({ ...newUser, newUsername: "" });
                    return;
                }
                setNewUser({ ...newUser, newUsername: "" });
                notifySuccess("The username has been changed successfully!");
                fetchCurrentUser();
            } else if (
                !newUsername &&
                currPassword &&
                newPassword &&
                confirmPassword
            ) {
                if (newPassword !== confirmPassword) {
                    setNewUser({ ...newUser, confirmPassword: "" });
                    notifyError(
                        "The new password and confirm password does not match"
                    );
                    return;
                }

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
                notifySuccess("The password has been changed successfully!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <section className="profile">
            <div className="container">
                <div className="profile__wrapper">
                    <h1 className="profile__heading">Profile</h1>

                    <form
                        className="profile__form profile"
                        onSubmit={onSubmitUser}>
                        <h2 className="profile__form-heading">Change user</h2>
                        <p>Current username: {currUsername}</p>
                        <label className="profile__label">
                            New username
                            <input
                                value={newUser.newUsername}
                                type="text"
                                className="profile__input"
                                name="newUsername"
                                autoComplete="on"
                                onChange={handleChange}
                                minLength="3"
                                maxLength="16"
                            />
                        </label>

                        <h2 className="profile__form-heading">
                            Change password
                        </h2>
                        <label htmlFor="" className="profile__label">
                            Current password
                            <ChangePswInput
                                name="currPassword"
                                inputValue={newUser.currPassword}
                                handleChange={handleChange}
                                newUser={newUser}
                            />
                        </label>
                        <label htmlFor="" className="profile__label">
                            New password
                            <ChangePswInput
                                name="newPassword"
                                inputValue={newUser.newPassword}
                                handleChange={handleChange}
                                newUser={newUser}
                            />
                        </label>
                        <label htmlFor="" className="profile__label">
                            Confirm new password
                            <ChangePswInput
                                name="confirmPassword"
                                inputValue={newUser.confirmPassword}
                                handleChange={handleChange}
                                newUser={newUser}
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
