import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

import { BASE_URL } from "../constants/common.js";
import { API } from "../constants/api.js";
import {removeUser} from "../utils/userSlice.js";

const NavBar = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
           await axios.post(`${BASE_URL}/${API.LOGOUT}`, { withCredentials: true });
           dispatch(removeUser());
           Cookies.remove("token");
           navigate('/login');
        } catch (error) {
            // Error logic maybe redirect to error page
            console.log(error);
        }
    };

    return (
        <div className="navbar bg-base-200 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">👨‍💻DevTinder</Link>
            </div>
            { user && <div className="flex gap-2 mx-5 items-center">
                <p className="px-4">Welcome, { user.firstName }</p>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="user photo"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to="/connections">Connections</Link></li>
                        <li><Link to="/requests">Requests</Link></li>
                        <li><Link to="/premium">Premium</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    )
};

export default NavBar;