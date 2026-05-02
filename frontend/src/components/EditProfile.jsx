import { useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from "axios";

import { BASE_URL } from'../constants/common';
import { API } from '../constants/api';
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard.jsx";

const EditProfile = ({ user }) => {
    console.log('user', user);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState(null)
    const [showToast, setShowToast] = useState(false)
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError(null);
        try {
            const response = await axios.patch(`${BASE_URL}/${API.PROFILE_EDIT}`, {
                firstName, lastName, photoUrl, age, gender, about
            }, { withCredentials: true });
            dispatch(addUser(response?.data?.data));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            setError(error?.response?.data);
        }
    }

    return (
        <>
        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-10">
                <div className="card bg-base-300 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
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
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Photo URL:</legend>
                                <input
                                    type="text"
                                    value={photoUrl}
                                    className="input"
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Age</legend>
                                <input
                                    type="text"
                                    value={age}
                                    className="input"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Gender</legend>
                                <input
                                    type="text"
                                    value={gender}
                                    className="input"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">About</legend>
                                <textarea
                                    value={about}
                                    className="input"
                                    rows="4"
                                    cols="50"
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </fieldset>
                        </div>
                        <p className="text-red-500">{ error }</p>
                        <div className="card-actions justify-center m-2">
                            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </div>
        {
            showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile Saved successfully.</span>
                    </div>
                </div>
            )
        }
        </>
    )
};

export default EditProfile;