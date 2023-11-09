import React, { useEffect, useState } from "react";
import Input from "../../components/atom/input";
import InputPassword from "../../components/atom/inputPassword";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../utils/reducer/registerReducer";
import Loader from "../../components/atom/loader";
import "../../scss/page/register.scss";
import Alert from "../../components/atom/alert";

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const onHandleChange = (e) => {
        if (e.target.name == "username") {
            setUsername(e.target.value);
        }
        if (e.target.name == "email") {
            setEmail(e.target.value);
        }
        if (e.target.name == "password") {
            setPassword(e.target.value);
        }
    }

    // menggunakan use Effec untuk mengambil data di useSelector
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "username": username,
            "email": email,
            "password": password
        }

        await dispatch(userRegister(data));
    }

    const {userData, err, isLoading} = useSelector((state) => state.register);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (err != null) {
            if ('username' in err) {
                setError(`Username sudah digunakan!!`)
            }
            if ('email' in err) {
                setError(`Email sudah digunakan!!`)
            }
            if(err.length > 0) {
                err.map((crash) => {
                    setError(crash.msg)
                })
            }
        }
    }, [handleSubmit])


    useEffect(() => {
        setMessage(userData);
        if (message === "Register Success!!") {
            setTimeout(() => navigate(`/login`), 1500);
        }
    }, [handleSubmit]);

    return (
    <>
    <div className="register">
    {isLoading && (<div className="loader-box"><Loader /></div>)}
        <div className="form-register container">
            {
                message == 'Register Success!!' && (
                <Alert 
                messageType={message} 
                type={'success'}
                mainMessage={"Silahkan Login!!"} />
                )
            }
            {
                error && (
                <Alert 
                messageType={"Failed!"} 
                type={'danger'}
                mainMessage={error} />
                )
            }
            <h2 className="text-center">Register</h2>
            <form onSubmit={handleSubmit} className="mb-5">
                <Input 
                divClassName="mb-3 input"
                type="text"
                name="username"
                placeholder="Username"
                handleChange={onHandleChange}/>

                <Input 
                divClassName="mb-3 input"
                type="email"
                name="email"
                placeholder="Email" 
                handleChange={onHandleChange} />

                <InputPassword 
                className="mb-3 input" handleChange={onHandleChange} />

                <div className="text-end">
                    <button type="submit" className="btn btn-primary form-btn">Register</button>
                </div>
            </form>
            <div className="link-center">
                <Link to={'/login'}>already have an account?</Link>
            </div>
        </div>
    </div>
    </>

    )
}

export default Register;