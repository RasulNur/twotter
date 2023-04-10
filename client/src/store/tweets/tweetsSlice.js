import { createSlice } from "@reduxjs/toolkit";
import { fetchTweetsThunk } from "./tweetsThunk";

const initialState = { tweets: [], homeTweetAuthor: {} };

export const tweetsSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTweetsThunk.fulfilled, (state, action) => {
            state.tweets = action.payload.data;
        });
    },
});

export const { setTweets } = tweetsSlice.actions;
export default tweetsSlice.reducer;
