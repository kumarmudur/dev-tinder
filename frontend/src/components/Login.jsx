import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from "axios";

import { BASE_URL } from'../constants/common';
import { API } from '../constants/api';
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [emailId, setEmailId] = useState('shiva@gmail.com');
    const [password, setPassword] = useState('Mahesh@123');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/${API.LOGIN}`, {
                emailId,
                password
            }, { withCredentials: true });
            console.log('response', response);
            dispatch(addUser(response.data));
            navigate('/');
        } catch (error) {
            setError(error?.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input
                                type="text"
                                value={emailId}
                                className="input"
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Password</legend>
                            <input
                                type="password"
                                value={password}
                                className="input"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    <p className="text-red-500">{ error }</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;