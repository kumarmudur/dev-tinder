import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

import { BASE_URL } from "../constants/common.js";
import { API } from "../constants/api.js";
import { addRequests } from "../utils/requestsSlice.js";

const Requests = () => {
    const requests = useSelector(state => state.requests);
    const dispatch = useDispatch();

    const fetchRequests = async () => {
        try {
            const response = await axios(`${BASE_URL}/${API.REQUEST_RECEIVED}`, {
                withCredentials: true,
            });
            dispatch(addRequests(response?.data?.data));
        } catch (error) {
            // handle error case
            console.error(error);
        }
    }

    console.log('requests', requests);

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;

    if (requests.length === 0) return <h1>No Connection Requests found!</h1>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>
            {
                requests.map((request) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = request?.fromUserId;
                    return (
                        <div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
                            <div>
                                <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
                            </div>
                            <div className="text-left mx-4">
                                <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
                                { age && gender && <p>{`${age} ${gender}`}</p>}
                                <p>{about}</p>
                            </div>
                            <div>
                                <button className="btn btn-primary mx-2">Reject</button>
                                <button className="btn btn-secondary mx-2">Accept</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Requests;