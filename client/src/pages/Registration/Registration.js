import { useState } from "react";
import RegisterOrLogin from "../../components/RegisterOrLogin/RegisterOrLogin";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
            });
            alert("Registration completed successfully! Now login.");
            navigate("/login");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <RegisterOrLogin
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
