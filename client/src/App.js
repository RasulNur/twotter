import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Profile from "./pages/Profile/Profile";
import TweetPage from "./pages/TweetPage/TweetPage";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";

import "./App.css";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="app__wrapper">
                    <Header />
                    <div className="content-wrapper">
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="profile" element={<Profile />} />
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
