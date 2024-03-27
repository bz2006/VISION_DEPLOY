import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useCart } from "../../context/cart";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import "./checkout.css";

const Checkout = () => {
    var hosturl = window.location.protocol + "//" + window.location.host + "/uploads/"
    const [defid, setdefid] = useState("");
    const [defbid, setdefbillid] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState('');
    const [cart, setCart] = useCart([])
    const [qty, setQty] = useState(0);
    const [amount, setAmount] = useState(0);
    const [Alladdress, setallAdrs] = useState([])
    const [Shipaddress, setShipaddress] = useState([])
    const [billaddress, setBilladdress] = useState([])
    const [selectedaddress, setSelectedadrs] = useState([])


    //Model Controls
    const [showship, setShowship] = useState(false);
    const [showbill, setShowbill] = useState(false);
    const handleCloseship = () => setShowship(false);
    const handleClosebill = () => setShowbill(false);
    const handleShowship = () => setShowship(true);
    const handleShowbill = () => setShowbill(true);

    window.onload = function Getallad() {
        Getallddress()

    }

    const synccart = async () => {
        await axios.put(`/api/v1/cart/create-up-cart/${auth.user._id}`, cart);
    }
    const Getallddress = async () => {
        try {
            const alladrs = await axios.get(`/api/v1/users/getall-address/${auth.user._id}`);
            setallAdrs(alladrs.data.Alladdres)
            setdefid(alladrs.data.defadrs)
            setdefbillid(alladrs.data.defadrs)


        } catch (error) {
            toast.error("something went wrong");

        }
    }
    useEffect(() => {
        Getallddress()
    }, [])


    useEffect(() => {
        let totalQuantity = cart.reduce((acc, cartItem) => acc + cartItem[4], 0);
        let totalAmount = cart.reduce((acc, cartItem) => acc + cartItem[3] * cartItem[4], 0);
        setQty(totalQuantity);
        setAmount(totalAmount);
    }, [cart]);

    const getCart = async () => {
        try {
            const { data } = await axios.get(`/api/v1/cart/get-cart/${auth.user._id}`);

            const newdata = [];
            for (let arr of data) {
                for (let dat of arr["items"]) {
                    const darray = [
                        dat["product"],
                        dat["name"],
                        dat["image"],
                        dat["mrp"],
                        dat["quantity"]]
                    newdata.push(darray)

                }
            }
            setCart(newdata)
        } catch (error) {

        }
    }
    const syncCartWithServer = async (upcart) => {
        try {
            // Assuming your server expects cart data in a specific format
            const cartData = { items: [] };
            for (let arr of upcart) {
                cartData.items.push({
                    product: arr[0],
                    name: arr[1],
                    image: arr[2],
                    mrp: arr[3],
                    quantity: arr[4]

                });
            }
            await axios.put(`/api/v1/cart/create-up-cart/${auth.user._id}`, cartData);
        } catch (error) {
        }
    };

    const handleDelete = async (productId) => {
        const updatedCart = cart.filter(item => item[0] !== productId);
        setCart(updatedCart);
        if (auth.user) {

            if (updatedCart.length === 0) {
                await axios.delete(`/api/v1/cart//delete-cart/${auth.user._id}`);
                syncCartWithServer(updatedCart)
            }
            else if (cart.length === 0) {
                getCart()
            }
        }


    };


    // Function to create an order
    const createOrder = async () => {
        const response = await fetch('/api/v1/razorpay/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount * 100,
            }),
        });
        const data = await response.json();
        setOrderId(data.id);
        handlePayment()
    };

    // Function to handle payment
    const handlePayment = async () => {
        const options = {
            key: 'rzp_test_HR0OOE6FLlHVg8', // Your Razorpay API key
            amount: amount * 100, // Example amount
            currency: 'INR',
            name: 'VISION',
            description: 'Test payment',
            order_id: orderId,
            handler: function (response) {
                Placeorder()
                navigate("/dashboard/my_account/your-orders")
                setCart([])
                synccart()
            },
            prefill: {
                name: auth.user.username,
                email: 'test@example.com',
            },
            notes: {
                address: 'Test address',
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const Placeorder = async () => {


        try {

            const currentDate = new Date();
            const orddate = currentDate.toDateString()
            const orderid = "240" + Date.now();
            const usrid = auth.user._id
            const prod = []
            for (let pr of cart) {
                prod.push([pr[0], pr[1], pr[2][0], pr[3], pr[4]])
            }
            const orderData = {
                userid: usrid,
                orderId: orderid,
                Orderdate: orddate,
                Shipaddress: Shipaddress,
                billaddress: billaddress,
                total: amount,
                products: prod
            };
            const { data } = await axios.post("/api/v1/orders/create-order", orderData);
            await axios.put(`/api/v1/users/user_ordersno/${auth.user._id}`);

        } catch (error) {
            toast.error("something went wrong");

        }
    }



    return (
        <>
            <div className='codiv'>
                <h1>Review Your Order</h1>
                <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
                    <Col className='col1'>
                        <div style={{ display: "inline-block" }}>
                            <h6 style={{ marginTop: "15px" }}>Shipping Address</h6>
                            {Alladdress.length > 0 && Alladdress.map(adr => {

                                if (adr._id === defid) {
                                    if (Shipaddress.length === 0) {
                                        setShipaddress(adr)
                                    }

                                    return (
                                        <div key={adr._id}>
                                            <h6 style={{ fontSize: "12px", fontFamily: "Rubik", fontWeight: "500", marginTop: "15px" }}>{adr.name}</h6>
                                            <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.address}</h6>
                                            <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.state}</h6>
                                            <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.country}</h6>
                                            <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.pin}</h6>
                                            <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.phone}</h6>
                                            <a onClick={() => {
                                                handleShowship()
                                            }} className="adbtn">Change</a>
                                        </div>
                                    );
                                }
                                return null

                            })}
                        </div>
                        <div style={{ display: "inline-block", marginLeft: "70px" }}>
                            <h6 style={{ marginTop: "15px" }}>Billing Address</h6>
                            {Alladdress.length > 0 && Alladdress.map(adr => {

                                if (adr._id === defbid) {
                                    if (billaddress.length === 0) {
                                        setBilladdress(adr)
                                    }

                                    return (
                                        <div key={adr._id}>
                                            <h6 style={{ fontSize: "12px", fontFamily: "Rubik", fontWeight: "500", marginTop: "15px" }}>{adr.name}</h6>
                                            <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.address}</h6>
                                            <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.state}</h6>
                                            <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.country}</h6>
                                            <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.pin}</h6>
                                            <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.phone}</h6>
                                            <a onClick={() => {
                                                handleShowbill()
                                            }} className="adbtn">Change</a>
                                        </div>
                                    );
                                }
                                return null

                            })}
                        </div>
                    </Col>
                    <Col className='col2'>
                        <h5>Order Summary</h5>
                        <h6 style={{ display: "inline-block", fontFamily: "Rubik", fontWeight: "400" }}>Sub Total </h6><h6 style={{ display: "inline-block", float: "right", fontFamily: "Rubik", fontWeight: "400" }}>{amount}</h6><br />
                        <h6 style={{ display: "inline-block", fontFamily: "Rubik", fontWeight: "400" }}>Delivery </h6><h6 style={{ display: "inline-block", float: "right", fontFamily: "Rubik", fontWeight: "400" }}>Free</h6>
                        <hr />
                        <h6 style={{ display: "inline-block", fontFamily: "Rubik", fontWeight: "500", color: "rgb(160, 0, 0)" }}>Grand Total </h6><h6 style={{ display: "inline-block", color: "rgb(160, 0, 0)", float: "right", fontFamily: "Rubik", fontWeight: "500" }}>₹{amount}.00</h6>
                        <h6 style={{ fontFamily: "Rubik", fontSize: "smaller", fontWeight: "400" }}>Taxes Included</h6>


                        <div className="btndiv">
                            <button className="buybtn" onClick={createOrder}>Procced To Buy</button>
                        </div>
                    </Col>
                </Row >
                <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
                    <Col className='col3'>
                        <table style={{ width: "max-content" }}>
                            <tbody>
                                {cart.length > 0 && cart.map(cartItem => (
                                    <tr key={cartItem[0]} >
                                        <td style={{ height: "100px", fontSize: "larger", fontFamily: "Rubik", backgroundColor: "white" }}><img src={hosturl+cartItem[2][0]} alt="" style={{ width: "70px" }}></img></td>
                                        <td style={{ height: "100px", fontSize: "small", fontFamily: "Rubik", backgroundColor: "white" }}>{cartItem[1]}  <br />MRP : ₹{cartItem[3]}.00 </td>
                                        <td style={{ height: "100px", fontSize: "small", fontFamily: "Rubik", backgroundColor: "white" }}><input
                                            type="number"
                                            min={1}
                                            className="qty"
                                            style={{ display: "block", height: "35px" }}
                                            value={cartItem[4]}
                                            onChange={(e) => {
                                                const updatedQty = parseInt(e.target.value);
                                                const updatedCart = cart.map(item => {
                                                    if (item[0] === cartItem[0]) {
                                                        return [...item.slice(0, 4), updatedQty, ...item.slice(5)];
                                                    }
                                                    return item;
                                                });
                                                setCart(updatedCart);
                                            }}
                                        /></td>
                                        <td style={{ height: "100px", fontSize: "small", fontFamily: "Rubik", backgroundColor: "white" }}>₹{cartItem[3] * cartItem[4]}.00 </td>
                                    </tr>))}
                            </tbody>
                        </table>
                    </Col>
                </Row>

                {/* ----------------- Change ship Address------------------- */}
                <>


                    <Modal show={showship} onHide={handleCloseship} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            {Alladdress.length > 0 && Alladdress.map(adr => (

                                <div key={adr._id}>
                                    <input type="radio" name="addressRadio" value={adr._id} onChange={(e) => { setdefid(e.target.value); setShipaddress(adr) }} style={{ display: "block", display: "inline-block", height: "45px", width: "20px" }} />
                                    <div style={{ display: "inline-block", border: "1px solid black", margin: "10px", padding: "10px", borderRadius: "10px" }}><h6><h4>{adr.name}</h4>  {adr.address}  {adr.state}  {adr.country}  PIN - {adr.pin}  PHONE - {adr.phone}</h6></div>
                                </div>
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => {
                                navigate("/dashboard/my_account/your-address")
                                sessionStorage.setItem("redirectUrl", "/order/checkout-order");
                            }}>
                                Add New Address
                            </Button>
                            <Button variant="primary" onClick={handleCloseship}>
                                Proceed
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                {/* ----------------- Change ship Address------------------- */}
                {/* ----------------- Change bill Address------------------- */}
                <>


                    <Modal show={showbill} onHide={handleClosebill} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Bill Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            {Alladdress.length > 0 && Alladdress.map(adr => (

                                <div key={adr._id}>
                                    <input type="radio" name="addressRadio" value={adr._id} onChange={(e) => setdefbillid(e.target.value)} style={{ display: "block", display: "inline-block", height: "45px", width: "20px" }} />
                                    <div style={{ display: "inline-block", border: "1px solid black", margin: "10px", padding: "10px", borderRadius: "10px" }}><h6><h4>{adr.name}</h4>  {adr.address}  {adr.state}  {adr.country}  PIN - {adr.pin}  PHONE - {adr.phone}</h6></div>
                                </div>
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClosebill}>
                                Proceed
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                {/* ----------------- Change Address------------------- */}
            </div >

            <div className='mobcodiv' style={{ padding: "20px", backgroundColor: "rgb(236, 239, 243)" }} >
                <h1>Review Your Order mob</h1>
                <div className="shipadrs" onClick={() => {
                    handleShowship()
                }}>
                    <h6>Shipping Address</h6>
                    {Alladdress.length > 0 && Alladdress.map(adr => {

                        if (adr._id === defid) {
                            if (Shipaddress.length === 0) {
                                setShipaddress(adr)
                            }

                            return (
                                <div key={adr._id}>
                                    <h6 style={{ fontSize: "12px", fontFamily: "Rubik", fontWeight: "500", marginTop: "15px" }}>{adr.name}</h6>
                                    <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.address} {adr.state} {adr.country} {adr.pin}</h6>

                                </div>
                            );
                        }
                        return null

                    })}
                </div><br />
                <div className="billadrs" onClick={() => {
                    handleShowbill()
                }}>
                    <h6>Billing Address</h6>
                    {Alladdress.length > 0 && Alladdress.map(adr => {

                        if (adr._id === defbid) {
                            if (billaddress.length === 0) {
                                setBilladdress(adr)
                            }

                            return (
                                <div key={adr._id}>
                                    <h6 style={{ fontSize: "12px", fontFamily: "Rubik", fontWeight: "500", marginTop: "15px" }}>{adr.name}</h6>
                                    <h6 style={{ fontSize: "11px", fontFamily: "Rubik", fontWeight: "500" }}>{adr.address} {adr.state} {adr.country} {adr.pin}</h6>

                                </div>
                            );
                        }
                        return null

                    })}
                </div>
                <div className="crtbdiv">
                    {cart.length > 0 && cart.map(cartItem => (
                        <div className="cartcrd" key={cartItem[0]}>
                            <div className="card flex-row" id="card">
                                <img className="card-img" src={hosturl + cartItem[2][0]} />
                                <div className="card-body">
                                    <h4 className="card-title h5 h4-sm">{cartItem[1]}</h4>
                                    <h6 className="card-text">₹{cartItem[3]}</h6>
                                    <h6 className="card-text">Subtotal : ₹{cartItem[3] * cartItem[4]}.00 </h6>
                                </div>
                            </div>
                            <div className="foot">
                                <select
                                    className="selqty"
                                    value={cartItem[4]}
                                    onChange={(e) => {
                                        const updatedQty = parseInt(e.target.value);
                                        const updatedCart = cart.map(item => {
                                            if (item[0] === cartItem[0]) {
                                                return [...item.slice(0, 4), updatedQty, ...item.slice(5)];
                                            }
                                            return item;
                                        });
                                        setCart(updatedCart);
                                    }}
                                >
                                    {[...Array(10)].map((_, index) => ( // Assuming maximum quantity is 10
                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                                <button className="delcartm" onClick={() => {
                                    handleDelete(cartItem[0]);
                                }} >Delete</button>


                            </div>
                        </div>))}
                </div>
                <div className='col2'>
                    <h5>Order Summary</h5>
                    <h6 style={{ display: "inline-block", fontFamily: "Rubik", fontWeight: "400" }}>Sub Total </h6><h6 style={{ display: "inline-block", float: "right", fontFamily: "Rubik", fontWeight: "400" }}>{amount}</h6><br />
                    <h6 style={{ display: "inline-block", fontFamily: "Rubik", fontWeight: "400" }}>Delivery </h6><h6 style={{ display: "inline-block", float: "right", fontFamily: "Rubik", fontWeight: "400" }}>Free</h6>
                    <hr />
                    <h6 style={{ display: "inline-block", fontFamily: "Rubik", fontWeight: "500", color: "rgb(160, 0, 0)" }}>Grand Total </h6><h6 style={{ display: "inline-block", color: "rgb(160, 0, 0)", float: "right", fontFamily: "Rubik", fontWeight: "500" }}>₹{amount}.00</h6>
                    <h6 style={{ fontFamily: "Rubik", fontSize: "smaller", fontWeight: "400" }}>Taxes Included</h6>


                    <div className="btndiv">
                        <button className="buybtn" onClick={createOrder}>Procced To Buy</button>
                    </div>
                </div>



                {/* ----------------- Change ship Address------------------- */}
                <>


                    <Modal show={showship} onHide={handleCloseship} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            {Alladdress.length > 0 && Alladdress.map(adr => (

                                <div key={adr._id}>
                                    <input type="radio" name="addressRadio" value={adr._id} onChange={(e) => { setdefid(e.target.value); setShipaddress(adr) }} style={{ display: "block", display: "inline-block", height: "45px", width: "20px" }} />
                                    <div style={{ display: "inline-block", border: "1px solid black", margin: "10px", padding: "10px", borderRadius: "10px" }}><h6><h4>{adr.name}</h4>  {adr.address}  {adr.state}  {adr.country}  PIN - {adr.pin}  PHONE - {adr.phone}</h6></div>
                                </div>
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => {
                                navigate("/dashboard/my_account/your-address")
                                sessionStorage.setItem("redirectUrl", "/order/checkout-order");
                            }}>
                                Add New Address
                            </Button>
                            <Button variant="primary" onClick={handleCloseship}>
                                Proceed
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                {/* ----------------- Change ship Address------------------- */}
                {/* ----------------- Change bill Address------------------- */}
                <>


                    <Modal show={showbill} onHide={handleClosebill} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Bill Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            {Alladdress.length > 0 && Alladdress.map(adr => (

                                <div key={adr._id}>
                                    <input type="radio" name="addressRadio" value={adr._id} onChange={(e) => setdefbillid(e.target.value)} style={{ display: "block", display: "inline-block", height: "45px", width: "20px" }} />
                                    <div style={{ display: "inline-block", border: "1px solid black", margin: "10px", padding: "10px", borderRadius: "10px" }}><h6><h4>{adr.name}</h4>  {adr.address}  {adr.state}  {adr.country}  PIN - {adr.pin}  PHONE - {adr.phone}</h6></div>
                                </div>
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClosebill}>
                                Proceed
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                {/* ----------------- Change Address------------------- */}
            </div >
        </>

    )
}

export default Checkout;
