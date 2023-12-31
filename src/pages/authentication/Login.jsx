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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // handle input value
    const onHandleChange = (e) => {
        if(e.target.name === "email") {
            setEmail(e.target.value);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    // notification handle
    const {loginData, err, isLoading} = useSelector((state) => state.login);
    const [error, setError] = useState('');
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reqData = {
            "email": email,
            "password": password
        }
        await dispatch(userLogin(reqData));

    }

    // set notification state
    useEffect(() => {
        setLoading(isLoading);

        if (err) {
            setError(err);
        }

        setMessage(loginData.message);
    }, [loginData, err, isLoading]);
    
    if (message) {
        try {
            localStorage.setItem('USER', JSON.stringify(loginData.data)); // menyimpan data login di localStorage
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (error) {
            console.log(error);
            setError('access denied!');
        }
    }

    // clear error dan message
    useEffect(() => {
        setError(null);
        setMessage(null);
    }, [])

    return (
        <div className="login">
        {loading && (<div className="loader-box"><Loader /></div>)}
        <div className="form-login">
            {
                error && (
                <Alert 
                type={'danger'}
                messageType={'Failed!'}
                mainMessage={error} />
                )
            }
            <h2 className="text-center">Sign In</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="mb-5">
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
                <button type="submit" className="form-btn">Sign In</button>
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