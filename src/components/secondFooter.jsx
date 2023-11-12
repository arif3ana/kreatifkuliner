import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../scss/component/secondfooter.scss";


const SecondFooter = () => {
    const navigate = useNavigate()

    const handleClick = async () => {
        await axios.delete("http://localhost:3000/v1/auth/logout", {
            withCredentials: true
        })
        .then((response) => {
            Cookies.remove('refreshToken', {path: '/dashboard'})
            localStorage.removeItem("USER")
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <footer className="second-footer fixed-bottom">
            <div className="container">
                <p className="web-name">kreatif kuliner</p>
                <p onClick={handleClick}>Sign Out</p>
            </div>
        </footer>
    )
}

export default SecondFooter;