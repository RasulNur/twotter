import HomeTweet from "../../components/HomeTweet/HomeTweet";
import TweetCreator from "../../components/TweetCreator/TweetCreator";
import "./Home.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTweetsThunk } from "../../store/tweets/tweetsThunk";
import { useGetUserId } from "../../hooks/useGetUserId";

export default function Home() {
    const userID = useGetUserId();
    const dispatch = useDispatch();
    const tweetsSlice = useSelector((state) => state.tweets);
    const { tweets } = tweetsSlice;
    console.log(tweets);
    useEffect(() => {
        dispatch(fetchTweetsThunk());
    }, []);

    return (
        <div className="home">
            <div className="container">
                {userID ? (
                    <div className="home__write-post">
                        <TweetCreator />
                    </div>
                ) : null}

                <div className="home__posts-wrapper">
                    {tweets.length > 0 ? (
                        [...tweets]
                            .reverse()
                            .map((tweet) => (
                                <HomeTweet
                                    key={tweet._id}
                                    tweet={tweet}
                                    tweetID={tweet._id}
                                    tweetText={tweet.text}
                                    tweetUserID={tweet.userOwner}
                                />
                            ))
                    ) : (
                        <h2>No posts</h2>
                    )}
                </div>
            </div>
        </div>
    );
}
