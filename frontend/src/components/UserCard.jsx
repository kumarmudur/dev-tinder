import { useDispatch } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../constants/common";
import { API } from "../constants/api";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const { _id, firstName, lastName, about, photoUrl, age, gender } = user || {};

    const handleSendRequest = async (status, id) => {
        try {
            const response = await axios.post(`${BASE_URL}/${API.REQUEST_SEND}/${status}/${id}`, {}, {
                withCredentials: true
            });
            dispatch(removeUserFromFeed(id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img src={photoUrl} alt="user" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
                <h2 className="card-title">{`${age || ""} ${gender || ""}`}</h2>
                <p>{ about }</p>
                <div className="card-actions justify-center my-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => handleSendRequest('ignored', _id)}
                    >
                        Ignore
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => handleSendRequest('interested', _id)}
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;