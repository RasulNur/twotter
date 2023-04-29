import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTweet, getTweets } from "../../utils/api";

export const fetchTweetsThunk = createAsyncThunk("tweets/fetch", (limit) => {
    return getTweets(limit);
});

export const fetchTweetThunk = createAsyncThunk("tweet/fetch", (tweetID) => {
    return getTweet(tweetID);
});
