import { configureStore } from "@reduxjs/toolkit";
import tweetsReducer from "./tweets/tweetsSlice";
import usersReducer from "./users/usersSlice";

export const store = configureStore({
    reducer: {
        tweets: tweetsReducer,
        users: usersReducer,
    },
    middleware: (getDefauldMiddleware) =>
        getDefauldMiddleware({ serializableCheck: false }),
});
