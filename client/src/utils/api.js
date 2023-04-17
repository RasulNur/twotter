import axios from "axios";

export const getTweets = (limit = 10) => axios.get(`tweets/limit=${limit}`);
