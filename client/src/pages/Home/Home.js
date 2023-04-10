import HomeTweet from "../../components/HomeTweet/HomeTweet";
import PostCreator from "../../components/PostCreator/PostCreator";
import "./Home.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTweetsThunk } from "../../store/tweets/tweetsThunk";

export default function Home() {
    const dispatch = useDispatch();
    const tweetsSlice = useSelector((state) => state.tweets);
    useEffect(() => {
        dispatch(fetchTweetsThunk());
    }, []);

    return (
        <div className="home">
            <div className="container">
                <div className="home__posts-wrapper">
                    {tweetsSlice.tweets && tweetsSlice.tweets.length > 0 ? (
                        tweetsSlice.tweets.map((tweet) => (
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
                <div className="home__write-post">
                    <PostCreator />
                </div>
            </div>
        </div>
    );
}
