import { useState } from "react";
import { useCookies } from "react-cookie";
import AuthForm from "../../components/AuthForm/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchCurrUsernameThunk } from "../../store/users/usersThunk";
import { useDispatch } from "react-redux";
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [cookies, setCookies] = useCookies(["access_token"]);
    const notify = (msg) =>
        toast.error(msg, {
            duration: 2000,
            position: "top-right",
            style: { background: "#e1e5e7" },
        });
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("auth/login", {
                username,
                password,
            });

            if (!res.data.token) {
                setPassword("");
                setUsername("");

                notify("Username or password is incorrect!");
                return;
            }
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
                heading={"Login"}
                btn={"Login"}
                text={"Not yet registered?"}
                secBtn={"Register"}
                onSubmit={onSubmit}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
            />
        </>
    );
}
