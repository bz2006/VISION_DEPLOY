import React, { useEffect, useState } from "react";
import Layout from '../../components/Layout/Layout'
import axios from "axios";
import { useAuth } from "../../context/auth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import toast from "react-hot-toast";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import "./address.css"




const Youraddress = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [defid, setdefid] = useState("");
    const [defset, setDefset] = useState(0);
    const [name, setName] = useState("");
    const [upname, setupName] = useState("");
    const [address, setaddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [pin, setPin] = useState();
    const [phone, setPhone] = useState();
    const [Alladdress, setallAdrs] = useState([])
    const [selectedaddress, setSelectedadrs] = useState([])

    //Model Controls
    const [showcr, setShowcr] = useState(false);
    const [showup, setShowup] = useState(false);
    const handleClosecr = () => setShowcr(false);
    const handleCloseup = () => setShowup(false);
    const handleShowcr = () => setShowcr(true);
    const handleShowup = () => setShowup(true);

    const Getallddress = async () => {
        try {
            const alladrs = await axios.get(`/api/v1/users/getall-address/${auth.user._id}`);
            setallAdrs(alladrs.data.Alladdres)
            setdefid(alladrs.data.defadrs)


        } catch (error) {
            console.log(error);
            toast.error("something went wrong");

        }
    }


    useEffect(() => {
        Getallddress()
    }, [])

    const Handlecreate = async () => {

        handleClosecr()
        try {

            const Data = [];
            Data.push({
                name: name,
                address: address,
                city: city,
                state: state,
                country: country,
                pin: pin,
                phone: phone,
            })
            await axios.post(`/api/v1/users/update-user/${auth.user._id}`, Data);
            Getallddress()
            const redirectUrl = sessionStorage.getItem("redirectUrl");
            console.log("1")
            if (redirectUrl == "/order/checkout-order") {
                console.log("2")
                navigate(redirectUrl)
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong");

        }

    }

    const handleUpdateinit = async (seladrs) => {
        setSelectedadrs(seladrs)
        handleShowup()
    }

    const handleUpdate = async () => {
        handleCloseup()
        try {
            const adrsid = selectedaddress._id
            const Data = selectedaddress;
            await axios.put(`/api/v1/users/update-user-adrs/${auth.user._id}`, { adrsid, selectedaddress });

            Getallddress()


        } catch (error) {
            console.log(error);
            toast.error("something went wrong");

        }
    }

    const handleDelete = async (seladrs) => {

        try {
            await axios.post(`/api/v1/users/delete-user-adrs/${auth.user._id}`, seladrs);
            Getallddress()


        } catch (error) {
            console.log(error);
            toast.error("something went wrong");

        }
    }

    const setDefault = async (id) => {
        setdefid(id)
        setDefset(1)
    }
    useEffect(() => {
        if (defset === 1) {
            const updatedefadrs = async () => {
                await axios.post(`/api/v1/users/user-def-adres/${auth.user._id}`, defid);
            }
            updatedefadrs()
        }
    }, [defid])


    return (
        <Layout>
            <h2 style={{ margin: "30px", fontFamily: "Rubik", fontWeight: "400" }}>Your Addresses</h2>
            <div className="adrsmdiv">
                {/* ----------------------------------- Display All Address  --------------------------*/}
                <Row xs={1} md={3} className="g-4 row row-cols-md-4 row-cols-1" style={{ margin: "auto" }}>
                    <Col className="btncol"><button onClick={handleShowcr} className="adrsbtn"><h1 style={{ fontSize: "70px" }}>+</h1></button></Col>
                    {Alladdress.length > 0 && Alladdress.map(adr => (
                        < Col key={adr._id} className="adrsdiv">
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.name}</h5>
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "400" }}>{adr.address}</h5>
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "400" }}>{adr.city}</h5>
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "400" }}>{adr.state}</h5>
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "400" }}>{adr.country}</h5>
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "400" }}>{adr.pin}</h5>
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "400" }}>{adr.phone}</h5>
                            <a onClick={() => {
                                handleUpdateinit(adr)
                            }} className="adbtn">Edit | </a> <a className="adbtn" onClick={() => {
                                handleDelete(adr._id)
                            }}> Remove  </a> {adr._id == defid ? (null) : (<a onClick={() => {
                                setDefault(adr._id)
                            }} className="adbtn">| Set as default</a>)}
                        </Col>
                    ))
                    }
                </Row>
            </div>
            <div className="mobadrsmdiv">
                {/* ----------------------------------- Display All Address  --------------------------*/}
                <div >
                    <div className="btncol"><button onClick={handleShowcr} className="adrsbtn"><h1 style={{ fontSize: "70px" }}>+</h1></button></div>
                    {Alladdress.length > 0 && Alladdress.map(adr => (
                        < div key={adr._id} className="adrsdiv">
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.name}</h5>
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "400" }}>{adr.address}</h5>
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "400" }}>{adr.city}</h5>
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "400" }}>{adr.state}</h5>
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "400" }}>{adr.country}</h5>
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "400" }}>{adr.pin}</h5>
                            <h5 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "400" }}>{adr.phone}</h5>
                            <a onClick={() => {
                                handleUpdateinit(adr)
                            }} className="adbtn">Edit &nbsp;&nbsp;|&nbsp;&nbsp; </a> <a className="adbtn" onClick={() => {
                                handleDelete(adr._id)
                            }}> Remove  </a> {adr._id == defid ? (null) : (<a onClick={() => {
                                setDefault(adr._id)
                            }} className="adbtn"> &nbsp;&nbsp; |&nbsp;&nbsp;  Set as default</a>)}
                        </div>
                    ))
                    }
                </div>
            </div>
            <>


                <Modal show={showcr} onHide={handleClosecr} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form onSubmit={Handlecreate}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={name} onChange={(e) => setName(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={address} onChange={(e) => setaddress(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={city} onChange={(e) => setCity(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>State / Province</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={state} onChange={(e) => setProvince(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={country} onChange={(e) => setCountry(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Zip / Postal code</Form.Label>
                                <Form.Control
                                    type="number"
                                    autoFocus
                                    value={pin} onChange={(e) => setPin(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="number"
                                    autoFocus
                                    value={phone} onChange={(e) => setPhone(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClosecr}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={Handlecreate} >
                            Add Address
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            <>


                <Modal show={showup} onHide={handleCloseup} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form onSubmit={Handlecreate}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={selectedaddress.name}
                                    onChange={(e) => setSelectedadrs({ ...selectedaddress, name: e.target.value })}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={selectedaddress.address}
                                    onChange={(e) => setSelectedadrs({ ...selectedaddress, address: e.target.value })}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={selectedaddress.city}
                                    onChange={(e) => setSelectedadrs({ ...selectedaddress, city: e.target.value })}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>State / Province</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={selectedaddress.state}
                                    onChange={(e) => setSelectedadrs({ ...selectedaddress, state: e.target.value })}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={selectedaddress.country}
                                    onChange={(e) => setSelectedadrs({ ...selectedaddress, country: e.target.value })}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Zip / Postal code</Form.Label>
                                <Form.Control
                                    type="number"
                                    autoFocus
                                    value={selectedaddress.pin}
                                    onChange={(e) => setSelectedadrs({ ...selectedaddress, pin: e.target.value })}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="number"
                                    autoFocus
                                    value={selectedaddress.phone}
                                    onChange={(e) => setSelectedadrs({ ...selectedaddress, phone: e.target.value })}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseup}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUpdate} >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        </Layout >

    )
}

export default Youraddress