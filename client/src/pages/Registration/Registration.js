import { useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { fetchCurrUsernameThunk } from "../../store/users/usersThunk";

export default function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("auth/register", {
                username,
                password,
            });
            if (res.data.message) {
                notifyError(res.data.message);
                setUsername("");
                setPassword("");
                return;
            }
            notifySuccess("Registration completed successfully!");

            setUsername("");
            setPassword("");
            setCookies("access_token", res.data.token);
            window.localStorage.setItem("userID", res.data.userID);

            dispatch(fetchCurrUsernameThunk(res.data.userID));
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <AuthForm
                heading={"Registration"}
                btn={"Register"}
                text={"Already registered?"}
                secBtn={"Login"}
                onSubmit={onSubmit}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
            />
        </>
    );
}
