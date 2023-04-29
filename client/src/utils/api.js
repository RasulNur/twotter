import axios from "axios";

export const getTweets = (limit = 10) => axios.get(`tweets/limit=${limit}`);

export const getCurrUsername = (resUserID) =>
    axios.get(`auth/users/${resUserID}`);

export const getTweet = (tweetID) => axios.get(`tweets/${tweetID}`);
