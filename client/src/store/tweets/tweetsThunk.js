import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTweets } from "../../utils/api";

export const fetchTweetsThunk = createAsyncThunk("tweets/fetch", (limit) => {
    return getTweets(limit);
});
