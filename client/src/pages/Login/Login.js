import { useState } from "react";
import { useCookies } from "react-cookie";
import RegisterOrLogin from "../../components/RegisterOrLogin/RegisterOrLogin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Login({ fetchCurrentUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [_, setCookies] = useCookies(["access_token"]);
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
            fetchCurrentUser(res.data.userID);
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <RegisterOrLogin
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
