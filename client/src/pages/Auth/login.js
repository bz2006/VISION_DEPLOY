import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../context/auth';
import "./signup.css";

function Login() {
    var hosturl = window.location.protocol + "//" + window.location.host + "/uploads/"

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [auth] = useAuth();
    const authData = JSON.parse(localStorage.getItem("auth"));
    const redirectUrl = sessionStorage.getItem("redirectUrl");




    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem("auth"));
        const redirectUrl = sessionStorage.getItem("redirectUrl");

        if (authData) {
            navigate(redirectUrl || "/");
        }
    }, []);

    const loginf = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", { email, password });
            if (res && res.data.success) {
                 toast.success("Login successful"); 
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(redirectUrl || "/");
                window.location.reload();
            } else {
                toast.error("User Not Found")

            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    };

    return (
        <>
            <video autoPlay loop muted className="video-bg">
                <source src={`${hosturl}weblogin.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='mdiv'>
                <form onSubmit={loginf}>
                    <div className='frm'>
                        <h1 className="txt">Log In</h1>
                        <h6>New to this site?<a href='/signup' style={{ textDecoration: "none", color: "green" }}> Sign Up</a></h6>


                        <div className="one">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="two">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <button type="submit" className="subbtn">Login</button>
                        <hr className='divi' />
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
