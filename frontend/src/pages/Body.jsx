import { useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

import { BASE_URL} from "../constants/common.js";
import { API } from "../constants/api.js";
import { addUser } from "../utils/userSlice.js";
import Footer from '../components/Footer.jsx';
import NavBar from "../components/NavBar.jsx";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user);

    const fetchUser = async () => {
        try {
           const response = await axios.get(`${BASE_URL}/${API.PROFILE}`, {
              withCredentials: true,
           });
            dispatch(addUser(response.data));
        } catch (error) {
            if (error.status === 401) {
                navigate('/login');
            }
            console.error(error);
        } 
    };

    useEffect(() => {
        if (!userData) {
          fetchUser();
        }
    }, []);

    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
};

export default Body;