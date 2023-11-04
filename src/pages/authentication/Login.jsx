import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/atom/input";
import InputPassword from "../../components/atom/inputPassword";
import "../../scss/page/login.scss";
import { userLogin } from "../../utils/reducer/loginReducer";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onHandleChange = (e) => {
        if(e.target.name == "email") {
            setEmail(e.target.value);
        }
        if (e.target.name == "password") {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reqData = {
            "email": email,
            "password": password
        }
        await dispatch(userLogin({reqData}))

        // setEmail('')
        // setPassword('')  // handlle kesalahan input
    }

    const {loginData} = useSelector((state) => state.login);
    if (loginData.message === "login Success!!") {
        navigate('/dashboard');
        localStorage.setItem('USER', JSON.stringify(loginData.data));
    }

    if (loginData.msg === "Password anda tidak valid" || loginData.msg === "Email atau Password salah!!") {
        console.log(loginData.msg);
    }

    // PR notif error belum ada // kesalahan
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