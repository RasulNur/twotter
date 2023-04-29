import CommentsIcon from "../../icons/comments.svg";
import ThumbUpIcon from "../../icons/thumb_up.svg";
import ThumbUpFillIcon from "../../icons/thumb_up-fill.svg";
import ThumbDownIcon from "../../icons/thumb_down.svg";
import ThumbDownFillIcon from "../../icons/thumb_down-fill.svg";
import "./HomeTweet.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../../hooks/useGetUserId";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweetsThunk } from "../../store/tweets/tweetsThunk";
import toast from "react-hot-toast";

export default function HomeTweet({
    tweet,
    tweetText,
    tweetUserID,
    tweetID,
    tweetImg,
}) {
    const userID = useGetUserId();
    const [tweetAuthor, setTweetAuthor] = useState("");
    const dispatch = useDispatch();
    const tweetsSlice = useSelector((state) => state.tweets);
    const fetchHomeTweetUsername = async () => {
        try {
            const user = await axios.get(`auth/users/${tweetUserID}`);
            setTweetAuthor(user.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchHomeTweetUsername();
    }, []);

    const notify = (msg) =>
        toast.error(msg, {
            duration: 2000,
            position: "top-right",
            style: { background: "#e1e5e7" },
        });

    const onLikeClick = async () => {
        if (!userID) {
            notify("You should register or login to react");
            return;
        }
        await axios.put(`tweets/reactions/likes/${tweetID}`, {
            userID,
        });

        dispatch(fetchTweetsThunk(tweetsSlice.limit));
    };
    const onDislikeClick = async () => {
        if (!userID) {
            notify("You should register or login to react");
            return;
        }
        await axios.put(`tweets/reactions/dislikes/${tweetID}`, { userID });

        dispatch(fetchTweetsThunk(tweetsSlice.limit));
    };

    return (
        <div className="home__post">
            <div className="home__post-author">
                <Link
                    className="home__post-author-link"
                    to={`post/${tweetID}/${
                        tweetAuthor && tweetAuthor.username
                    }`}>
                    {tweetAuthor && tweetAuthor.username}
                </Link>
            </div>

            {tweetImg ? (
                <Link
                    className="home__post-author-link"
                    to={`post/${tweetID}/${
                        tweetAuthor && tweetAuthor.username
                    }`}>
                    <img
                        className="home__post-img"
                        src={tweetImg}
                        alt="Tweet img"
                    />
                </Link>
            ) : null}

            <div className="home__post-text">
                <Link
                    className="home__post-text-link"
                    to={`post/${tweetID}/${
                        tweetAuthor && tweetAuthor.username
                    }`}>
                    {tweetText}
                </Link>
            </div>
            <div className="home__post-bottom">
                <div className="home__post-bottom-comments">
                    <Link
                        className="home__post-bottom-comments-link"
                        to={`post/${tweetID}/${
                            tweetAuthor && tweetAuthor.username
                        }`}>
                        <img
                            src={CommentsIcon}
                            alt="Comments"
                            className="home__post-icon"
                        />
                        {tweet.comments && tweet.comments.length}
                    </Link>
                </div>
                <div className="home__post-bottom-reaction">
                    <button
                        type="button"
                        className="home__post-bottom-reaction-btn"
                        onClick={onLikeClick}>
                        <img
                            src={
                                tweet && tweet.likes.includes(userID)
                                    ? ThumbUpFillIcon
                                    : ThumbUpIcon
                            }
                            alt="Thumb up"
                            className="home__post-icon"
                        />
                        {tweet.likes.length}
                    </button>
                    <button
                        type="button"
                        className="home__post-bottom-reaction-btn"
                        onClick={onDislikeClick}>
                        <img
                            src={
                                tweet && tweet.dislikes.includes(userID)
                                    ? ThumbDownFillIcon
                                    : ThumbDownIcon
                            }
                            alt="Thumb down"
                            className="home__post-icon"
                        />
                        {tweet.dislikes.length}
                    </button>
                </div>
            </div>
        </div>
    );
}
