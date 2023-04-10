import axios from "axios";

export const getTweets = () => axios.get("http://localhost:3001/tweets");
