import React, { useState } from "react";
import "../../scss/page/login.scss";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/atom/input";
import InputPassword from "../../components/atom/inputPassword";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        if(e.target.name == "email") {
            setEmail(e.target.value);
        }
        if (e.target.name == "password") {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const reqData = {
            "email": email,
            "password": password
        }

        axios.post("http://localhost:3000/v1/auth/login",
        reqData,
        {
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            const dataRes = response.data;
            document.cookie = `accessToken=${dataRes.accessToken}; max-age=${60 * 60}; path=/dashboard; SameSite=Strict`;
            document.cookie = `refreshToken=${dataRes.refreshToken}; max-age=${86400}; path=/dashboard; SameSite=Strict`;
            navigate('/dashboard')
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="login">
        <div className="form-login">
            <h2 className="text-center">Log in</h2>
            <form onSubmit={handleSubmit} className="mb-5">
                <Input 
                divClassName="mb-3 input"
                type="email"
                name="email"
                placeholder="Email" 
                handleChange={onHandleChange}/>

                <InputPassword 
                className="mb-3 input" 
                handleChange={onHandleChange}/>

                <div className="text-end">
                <button type="submit" className="btn btn-primary form-btn">Log in</button>
                </div>
            </form>
            <div className="link-center">
                <Link to={'/register'}>Not registered yet?</Link>
            </div>
        </div>
    </div>
    )
}

export default Login;