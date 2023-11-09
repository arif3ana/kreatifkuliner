import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../utils/reducer/loginReducer";
import Input from "../../components/atom/input";
import InputPassword from "../../components/atom/inputPassword";
import Loader from "../../components/atom/loader";
import  Alert from '../../components/atom/alert';
import "../../scss/page/login.scss";

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
        await dispatch(userLogin(reqData))
    }

    const {loginData, err, isLoading} = useSelector((state) => state.login);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (err) {
            setError(err);
        }

        setMessage(loginData.message);
        if (message === "login Success!!") {
            localStorage.setItem('USER', JSON.stringify(loginData.data));
            setTimeout(() => navigate('/dashboard'), 1000);
        }
    }, [handleSubmit])

    return (
        <div className="login">
        {isLoading && (<div className="loader-box"><Loader /></div>)}
        <div className="form-login">
            {
                error && (
                <Alert 
                type={'danger'}
                messageType={'Failed!'}
                mainMessage={error} />
                )
            }
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