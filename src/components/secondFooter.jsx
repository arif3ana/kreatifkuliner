import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "./atom/loader";
import "../scss/component/secondfooter.scss";


const SecondFooter = () => {
    const navigate = useNavigate()
    const [Loading, setLoading] = useState(false);
    const access = Cookies.get('accessToken');
    const handleClick = () => {
        setLoading(true);
        axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/v1/auth/logout`, {
            withCredentials: true,
            headers: {
                'Authorization': access
            }
        })
        .then((response) => {
            localStorage.removeItem("USER");
            setLoading(false);
            Cookies.remove('refreshToken')
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
        {Loading && (<div className="loader-box"><Loader /></div>)}
        <footer className="second-footer fixed-bottom">
            <div className="container">
                <p className="web-name">kreatif kuliner</p>
                <button className={`btn sign-out-btn ${Loading && 'disabled'}`} onClick={handleClick}>Sign Out</button>
            </div>
        </footer>
        </>
    )
}

export default SecondFooter;