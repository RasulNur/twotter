import { useState } from "react";
import { useCookies } from "react-cookie";
import RegisterOrLogin from "../../components/RegisterOrLogin/RegisterOrLogin";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [_, setCookies] = useCookies(["access_token"]);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
            });

            if (!res.data.token) {
                setPassword("");
                setUsername("");
                alert("Username or password is incorrect");
                return;
            }
            setCookies("access_token", res.data.token);

            window.localStorage.setItem("userID", res.data.userID);
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
