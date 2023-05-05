import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import env from "react-dotenv";

axios.defaults.baseURL = env.REACT_APP_AXIOS_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
