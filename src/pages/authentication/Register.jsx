import React, { useState } from "react";
import "../../scss/page/register.scss";
import { Link, redirect, useNavigate } from "react-router-dom";
import Input from "../../components/atom/input";
import InputPassword from "../../components/atom/inputPassword";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            "username": username,
            "email": email,
            "password": password
        }
        
        axios.post("http://localhost:3000/v1/auth/register",
        data,
        {headers: {'Content-Type': "application/json"}
        }).then((response) => {
            console.log(response.data);
            navigate('/login');
        }).catch((error) => {
            const errorResponse = error.response.data.data;
            console.log(errorResponse);
        })
    }

    return (
    <div className="register">
        <div className="form-register container">
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

    )
}

export default Register;