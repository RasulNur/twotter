import { createSlice } from "@reduxjs/toolkit";
import { fetchTweetsThunk, fetchTweetThunk } from "./tweetsThunk";

const initialState = {
    tweets: [],
    limit: 10,
    tweet: null,
};

export const tweetsSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {
        increaseLimit: (state, action) => {
            state.limit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTweetsThunk.fulfilled, (state, action) => {
            state.tweets = action.payload.data;
        });
        builder.addCase(fetchTweetThunk.fulfilled, (state, action) => {
            state.tweet = action.payload.data;
        });
    },
});

export const { increaseLimit } = tweetsSlice.actions;
export default tweetsSlice.reducer;
