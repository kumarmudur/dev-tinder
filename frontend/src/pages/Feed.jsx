import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import UserCard from "../components/UserCard";
import { BASE_URL } from "../constants/common";
import { API } from "../constants/api";
import {addFeed} from "../utils/feedSlice";

const Feed = () => {
    const feed = useSelector((state) => state.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return;
        try {
            const response = await axios.get(`${BASE_URL}/${API.FEED}`, {
                withCredentials: true,
            });
            dispatch(addFeed(response?.data?.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) return;

    if (feed.length <= 0) return <h1 className="flex justify-center my-10">No new users found!</h1>

    return feed && (
        <div className="flex justify-center my-10">
            <UserCard user={feed[0]} />
        </div>
    )
};

export default Feed;