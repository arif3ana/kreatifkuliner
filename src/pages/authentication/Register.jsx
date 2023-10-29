import React from "react";
import gambar from "../../assets/img/2.jpeg";
import "../../scss/page/register.scss";
import { Link } from "react-router-dom";

const Register = () => {
    
    return (
    <div className="register">
        <div className="form-register">
            <h2 className="text-center">Register</h2>
            <form action="" method="post" className="mb-5">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingName" name="username" placeholder="username"/>
                    <label htmlFor="floatingName">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" name="email" placeholder="email@gmail.com"/>
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" name="password" placeholder="password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="text-end">
                <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
            <div className="text-center">
                <Link to={'/login'}>Sudah memiliki akun? ---</Link>
            </div>
        </div>
    </div>

    )
}

export default Register;