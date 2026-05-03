import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL} from "../constants/common";
import { API}  from "../constants/api";
import { addConnections } from "../utils/connectionsSlice.js";

const Connections = () => {
    const connections = useSelector((state) => state.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${API.CONNECTING}`, {
                withCredentials: true,
            });
            dispatch(addConnections(response?.data?.data));
        } catch (error) {
            // handle error case
            console.error(error);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    console.log(connections);

    if (!connections) return;

    if (connections.length === 0) return <h1>No Connections found!</h1>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>
            {
                connections.map((connection) => {
                  const { firstName, lastName, photoUrl, age, gender, about } = connection;

                  return (
                      <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                          <div>
                              <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
                          </div>
                          <div className="text-left mx-4">
                              <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
                              { age && gender && <p>{`${age} ${gender}`}</p>}
                              <p>{about}</p>
                          </div>
                      </div>
                  )
                })
            }
        </div>
    )
};

export default Connections;