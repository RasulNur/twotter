import HomeTweet from "../../components/HomeTweet/HomeTweet";
import TweetCreator from "../../components/TweetCreator/TweetCreator";
import "./Home.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTweetsThunk } from "../../store/tweets/tweetsThunk";
import { useGetUserId } from "../../hooks/useGetUserId";

export default function Home() {
    const userID = useGetUserId();
    const dispatch = useDispatch();
    const tweetsSlice = useSelector((state) => state.tweets);
    const { tweets } = tweetsSlice;
    const [limit, setLimit] = useState(10);

    const detectScrollBottom = () => {
        window.onscroll = function () {
            if (
                window.innerHeight + Math.ceil(window.pageYOffset) >=
                document.body.offsetHeight
            ) {
                setLimit(limit + 10);
            }
        };
    };

    useEffect(() => {
        dispatch(fetchTweetsThunk(limit));
        detectScrollBottom();
    }, [window.pageYOffset]);

    return (
        <div className="home">
            <div className="container">
                {userID ? (
                    <div className="home__write-post">
                        <TweetCreator limit={limit} />
                    </div>
                ) : null}

                <div className="home__posts-wrapper">
                    {tweets.length > 0 ? (
                        [...tweets].map((tweet) => (
                            <HomeTweet
                                key={tweet._id}
                                tweet={tweet}
                                tweetID={tweet._id}
                                tweetText={tweet.text}
                                tweetImg={tweet.image}
                                tweetUserID={tweet.userOwner}
                                limit={limit}
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
