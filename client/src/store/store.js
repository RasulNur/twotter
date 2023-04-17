import { configureStore } from "@reduxjs/toolkit";
import tweetsReducer from "./tweets/tweetsSlice";
import userReducer from "./users/userSlice";

export const store = configureStore({
    reducer: {
        tweets: tweetsReducer,
        user: userReducer,
    },
    middleware: (getDefauldMiddleware) =>
        getDefauldMiddleware({ serializableCheck: false }),
});
