import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Profile from "./pages/Profile/Profile";
import TweetPage from "./pages/TweetPage/TweetPage";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";

import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "./hooks/useGetUserId";

function App() {
    const userID = useGetUserId();
    const [currUsername, setCurrUsername] = useState("");
    const fetchCurrentUser = async () => {
        const currUser = await axios.get(`auth/users/${userID}`);

        setCurrUsername(currUser.data.username);
    };
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <div className="app__wrapper">
                    <Header
                        currUsername={currUsername}
                        fetchCurrentUser={fetchCurrentUser}
                    />
                    <div className="content-wrapper">
                        <Routes>
                            <Route index element={<Home />} />
                            <Route
                                path="profile"
                                element={
                                    <Profile
                                        currUsername={currUsername}
                                        fetchCurrentUser={fetchCurrentUser}
                                    />
                                }
                            />
                            <Route
                                path="post/:id/:username"
                                element={<TweetPage />}
                            />
                            <Route path="register" element={<Registration />} />
                            <Route path="login" element={<Login />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
