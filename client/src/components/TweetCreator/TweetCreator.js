import "./TweetCreator.css";
import { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../../hooks/useGetUserId";
import { useDispatch } from "react-redux";
import { fetchTweetsThunk } from "../../store/tweets/tweetsThunk";

export default function TweetCreator({ limit }) {
    const userID = useGetUserId();
    const dispatch = useDispatch();
    const [lettersCount, setLettersCount] = useState(0);
    const [tweet, setTweet] = useState({
        text: "",
        userOwner: userID,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTweet({ ...tweet, [name]: value });
        setLettersCount(value.length);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("tweets", tweet);

            dispatch(fetchTweetsThunk(limit));
            setTweet({ ...tweet, text: "" });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form className="postcreator__form" onSubmit={onSubmit}>
            <label className="postcreator__label">
                Text
                <textarea
                    name="text"
                    type="text"
                    value={tweet.text}
                    onChange={handleChange}
                    maxLength="250"
                    rows={4}
                    required
                    className="postcreator__textarea"
                />
                <span className="postcreator__span">{lettersCount}/250</span>
            </label>

            <button className="postcreator__btn" type="submit">
                Post
            </button>
        </form>
    );
}
