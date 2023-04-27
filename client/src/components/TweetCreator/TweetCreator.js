import "./TweetCreator.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../../hooks/useGetUserId";
import { useDispatch } from "react-redux";
import { fetchTweetsThunk } from "../../store/tweets/tweetsThunk";
import ImageIcon from "../../icons/image_upload.svg";

export default function TweetCreator({ limit }) {
    const userID = useGetUserId();
    const dispatch = useDispatch();
    const [uploadFile, setUploadFile] = useState("");
    const [lettersCount, setLettersCount] = useState(0);
    const [tweet, setTweet] = useState({
        text: "",
        image: "",
        userOwner: userID,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTweet({ ...tweet, [name]: value });

        setLettersCount(value.length);
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        setUploadFile(file);
        const base64 = await convertToBase64(file);
        setTweet({ ...tweet, image: base64 });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("tweets", tweet);

            dispatch(fetchTweetsThunk(limit));
            setTweet({ ...tweet, text: "", image: "" });
            setLettersCount(0);
            setUploadFile("");
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (err) => reject(err);
        });
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
            <div className="postcreator__upload-wrapper">
                <label
                    htmlFor="file-upload"
                    className="postcreator__label-upload">
                    <img src={ImageIcon} alt="Img upload" />
                    {uploadFile.name}
                </label>

                <input
                    className="postcreator__file-upload"
                    type="file"
                    name="image"
                    id="file-upload"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => handleUpload(e)}
                />
                <button className="postcreator__btn" type="submit">
                    Post
                </button>
            </div>
        </form>
    );
}
