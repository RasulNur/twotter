import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Profile from "./pages/Profile/Profile";
import TweetPage from "./pages/TweetPage/TweetPage";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import { useGetUserId } from "./hooks/useGetUserId";
import BackButton from "./components/BackButton/BackButton";
import { fetchCurrUsernameThunk } from "./store/users/usersThunk";

import "./App.css";

function App() {
    const userID = useGetUserId();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(fetchCurrUsernameThunk(userID));
    }, []);

    return (
        <div className="App">
            <div className="app__wrapper">
                <Toaster />
                <Header />
                {location.pathname === "/" ? null : <BackButton />}
                <Routes>
                    <Route index element={<Home />} />

                    <Route
                        path="profile"
                        element={
                            !userID ? (
                                <Navigate replace to={"/"} />
                            ) : (
                                <Profile />
                            )
                        }
                    />
                    <Route path="post/:id/:username" element={<TweetPage />} />
                    <Route path="register" element={<Registration />} />
                    <Route path="login" element={<Login />} />
                </Routes>
                <Footer />
            </div>
        </div>
    );
}

export default App;
