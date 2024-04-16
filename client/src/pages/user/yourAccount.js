import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../../context/auth';
import "./youraccount.css"
let Code = 0
// let VerificationStatus=false
function YourAccount() {
    const [auth, setAuth] = useAuth();
    const [user, setuser] = useState([])
    const navigate = useNavigate();
    const [otp, setotp] = useState(new Array(4).fill(""));
    const [name, setname] = useState("")
    const [pass, setpass] = useState("")
    const [VerificationStatus, setVerificationStatus] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [email, setemail] = useState("")


    const GetUser = async () => {
        try {
            const user = await axios.get(`/api/v1/users/get-user/${auth.user._id}`)
            setname(user.data.user.username)
            setemail(user.data.user.email)
        } catch (error) {
            console.log(error)
        }
    }


    function handleChange(e, index) {
        if (isNaN(e.target.value)) return false;
        setotp([...otp.map((data, indx) => (indx === index ? e.target.value : data))]);

        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus()
        }
    }


    const updtaename = async () => {
        try {
            await axios.post(`/api/v1/users/update-username/${auth.user._id}`, name);
            GetUser()
            toast.success("Username Updated")
            setModalShow(false)
        } catch (error) {
            console.log(error)
        }
    }

    const UpdatePass = async () => {
        try {
            await axios.post(`/api/v1/users/update-pass/${auth.user._id}`, pass);
            GetUser()
            toast.success("Password Updated")
            setModalShow(false)
            setVerificationStatus(false)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetUser()

    }, [])

    const handleChangePassword = async () => {
        setModalShow(true);
        toast.success("Verfification sent")
        await Verification();
    };

    const Verification = async () => {
        try {
            Code = Math.floor(Math.random() * 9000) + 1000;
            const response = await fetch('/send-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ OTP: Code, Email: email })
            });
        } catch (error) {
            console.log(error)
        }
    }
    const CheckVerification = async () => {
        try {
            const inputotp = parseInt(otp.join(''))
            if (inputotp == Code) {
                console.log("Verified")
                // VerificationStatus=true
                setVerificationStatus(true)
                toast.success("Verified")
            } else {
                toast.error("Verification Failed")
                setModalShow(false)
                setotp(new Array(4).fill(""))
                Code = 0
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Layout>
            <div className='maindiv'>
                <h1 style={{ fontFamily: "Rubik", fontWeight: 400, margin: "30px" }}>Your Details</h1>
                <div className='accntdiv'>
                    <div className='accpdet'>
                        <h1 style={{ fontSize: "25px", fontFamily: "Rubik", fontWeight: 400 }}>Personal Details</h1><br />
                        <label for="username">Username</label>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <input type='text' className="form-control" placeholder='Username' style={{ width: "50%" }} onChange={(e) => setname(e.target.value)} value={name} name='username' /><button className='chbtn' onClick={updtaename}>Change User Name</button>
                        </div><br />
                        <label for="adrsbtn">Addresses</label><br />
                        <button onClick={() => { navigate("/dashboard/my_account/your-address") }} className='adrbtn'>Addresses</button>
                        <hr style={{ width: "80%", color: "black" }} />
                        <h4 for="adrsbtn" style={{ fontFamily: "Rubik", fontWeight: 400 }}>Login & Security</h4><br />
                        <label for="mail">Email</label>
                        <input type='email' className="form-control" placeholder='Email' value={email} style={{ width: "50%", height: "45px" }} name='mail' readonly />
                        <br />
                        <label for="pass" style={{ fontFamily: "Rubik", fontWeight: 400 }}>Password</label>
                        <div style={{ display: "flex", flexDirection: "row" }}>

                            <input type='password' className="form-control" value={"passwordinputsample"} placeholder='Password' style={{ width: "50%" }} name='pass' readonly /> <button className='chbtn' onClick={handleChangePassword}>Change Password</button>
                        </div>
                    </div>
                </div>
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
                        {VerificationStatus === false ? (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                <div style={{ textAlign: "center", alignItems: "center" }}>
                                    <h4>{`Enter OTP sent to ${email}`}</h4>
                                    <div className="otp-area">
                                        {otp.map((data, i) => (
                                            <input
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
                                <label for="pass" style={{ fontFamily: "Rubik", fontWeight: 400 }}>New Password</label><br />
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <input type='password' onChange={(e) => setpass(e.target.value)} value={pass} className="form-control" placeholder='Password' style={{ width: "50%" }} name='pass' />
                                    <button className='chbtn' onClick={UpdatePass}>Change Password</button>

                                </div>
                            </>
                        )}
                    </Modal.Body>
                </Modal>
            </>
        </Layout >

    )
}

export default YourAccount