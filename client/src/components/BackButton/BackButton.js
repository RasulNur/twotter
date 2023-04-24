import { useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();

    const backNavigate = () => {
        navigate(-1);
    };
    return (
        <div className="back-btn-wrapper">
            <div className="header-container">
                <div className="btn-container">
                    <button
                        className="back-btn"
                        type="button"
                        onClick={backNavigate}>
                        Back
                    </button>
                    <div></div>
                </div>
            </div>
        </div>
    );
}
