import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../context/auth';
import "./signup.css";
let Code = 0


function Login() {
    var hosturl = window.location.protocol + "//" + window.location.host + "/uploads/"

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [auth] = useAuth();
    const authData = JSON.parse(localStorage.getItem("auth"));
    const redirectUrl = sessionStorage.getItem("redirectUrl");
    const [modalShow, setModalShow] = useState(false);
    const [pass, setpass] = useState("")
    const [otp, setotp] = useState(new Array(4).fill(""));
    const [VerificationStatus, setVerificationStatus] = useState(false);
    const [VerificationInit, setVerificationInit] = useState(false);


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

    function handleChange(e, index) {
        if (isNaN(e.target.value)) return false;
        setotp([...otp.map((data, indx) => (indx === index ? e.target.value : data))]);

        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus()
        }
    }

    const UpdatePass = async () => {
        try {
            await axios.post(`/api/v1/users/forgot-pass/${email}`, pass);
            toast.success("Password Updated")
            setModalShow(false)
            setVerificationInit(false)
            setVerificationStatus(false)
        } catch (error) {
            console.log(error)
        }
    }

    const HandleVerificationInit = async () => {
        setVerificationInit(true)
        await Verification();
    }

    const handleChangePassword = async () => {
        setModalShow(true);
    };

    const Verification = async () => {
        try {
            Code = Math.floor(Math.random() * 9000) + 1000;
            const data = { OTP: Code, Email: email }
            const response = await fetch('/send-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            toast.success("Verfification sent")
        } catch (error) {
            console.log(error)
        }
    }
    const CheckVerification = async () => {
        try {
            const inputotp = parseInt(otp.join(''))
            if (inputotp == Code) {
                // VerificationStatus=true
                setVerificationStatus(true)
                toast.success("Verified")
            } else {
                toast.error("Verification Failed")
                setModalShow(false)
                setVerificationInit(false)
                setVerificationStatus(false)
                setotp(new Array(4).fill(""))
                Code = 0
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                        <a onClick={handleChangePassword}>Forgot password?</a>
                    </div>
                </form>
            </div>

            <>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={modalShow} // Pass the state variable to control the visibility
                    onHide={() => { setModalShow(false) }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Verify your email to continue
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {VerificationInit === false ? (
                            <>
                                <label htmlFor="pass" style={{ fontFamily: "Rubik", fontWeight: 400 }}>New Password</label><br />
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Email' style={{ width: "50%" }} name='pass' />
                                    <button className='chbtn' onClick={HandleVerificationInit}>Verify</button>
                                </div>
                            </>
                        ) : (
                            <>
                                {VerificationStatus === false ? (
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                        <div style={{ textAlign: "center", alignItems: "center" }}>
                                            <h4>{`Enter OTP sent to ${email}`}</h4>
                                            <div className="otp-area">
                                                {otp.map((data, i) => (
                                                    <input
                                                        key={i}
                                                        type="text"
                                                        value={data}
                                                        maxLength={1}
                                                        onChange={(e) => handleChange(e, i)}
                                                    />
                                                ))}
                                            </div>
                                            <a onClick={() => { setotp(new Array(4).fill("")) }} style={{ color: "#005580", fontSize: 20, cursor: 'pointer', marginTop: "-20", fontWeight: "bold" }}>Clear</a><br />
                                            <button className='verbtn' onClick={CheckVerification}>Verify</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <label htmlFor="pass" style={{ fontFamily: "Rubik", fontWeight: 400 }}>New Password</label><br />
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <input type='password' onChange={(e) => setpass(e.target.value)} value={pass} className="form-control" placeholder='Password' style={{ width: "50%" }} name='pass' />
                                            <button className='chbtn' onClick={UpdatePass}>Change Password</button>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </Modal.Body>
                </Modal>
            </>
        </>
    );
}

export default Login;
