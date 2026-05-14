import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from "axios";

import { BASE_URL } from '../constants/common';
import { API } from '../constants/api';
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/${API.LOGIN}`, {
                emailId,
                password
            }, { withCredentials: true });
            dispatch(addUser(response?.data?.data));
            navigate('/');
        } catch (error) {
            setError(error?.response?.data || "Something went wrong");
        }
    };

    const handleSignUp = async () => {
        try {
             const response = await axios.post(`${BASE_URL}/${API.SIGNUP}`, {
                 firstName, lastName, emailId, password
             }, { withCredentials: true });
             dispatch(addUser(response?.data?.data));
             return navigate('/profile');
        } catch (error) {
            setError(error?.response?.data || "Something went wrong");
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">{ isLoginForm ? 'Login' : 'SignUp'}</h2>
                    <div>
                        {
                            !isLoginForm && (
                                <>
                                    <fieldset className="fieldset my-2">
                                        <legend className="fieldset-legend">First Name</legend>
                                        <input
                                            type="text"
                                            value={firstName}
                                            className="input"
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset className="fieldset my-2">
                                        <legend className="fieldset-legend">Last Name</legend>
                                        <input
                                            type="text"
                                            value={lastName}
                                            className="input"
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </fieldset>
                                </>
                            )
                        }
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
                        <button
                            className="btn btn-primary"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                        >
                            { isLoginForm ? 'Login' : 'Sign Up' }
                        </button>
                    </div>
                    <p
                        className="m-auto cursor-pointer py-10"
                        onClick={() => setIsLoginForm(!isLoginForm)}>
                        {
                            isLoginForm ? 'New User? Signup Here' : 'Existing User? Login Here'
                        }
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Login;