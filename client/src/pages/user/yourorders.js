import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import "./orders.css"

const Yourorders = () => {

    const [auth] = useAuth();
    const [allorders, setAllorders] = useState([])
    var hosturl = window.location.protocol + "//" + window.location.host + "/uploads/"

    const getOrders = async () => {

        const orders = await axios.get(`/api/v1/orders/get-orders/${auth.user._id}`);
        setAllorders(orders.data)

    }
    useEffect(() => {
        getOrders()
    }, [])





    return (
        <Layout>
            <h2 style={{ margin: "30px", fontFamily: "Rubik", fontWeight: "400" }}>Your Orders</h2>
            <div className='orders'>
                {allorders.length > 0 && allorders.map(ord => (
                    <div style={{ display: 'flex', justifyContent: 'center', margin: "30px" }}>

                        <table style={{ width: "900px", borderSpacing: "0", borderCollapse: "separate", borderRadius: "15px", border: "1px solid rgb(223, 223, 223)" }}>
                            <thead>
                                <tr>
                                    <th style={{ fontSize: "small", height: "70px", borderTopLeftRadius: "15px", fontFamily: "Rubik", fontWeight: "400", backgroundColor: "rgb(238, 238, 238)" }}>ORDER PLACED<br />{ord.orderdate}</th>
                                    <th style={{ fontSize: "small", fontFamily: "Rubik", fontWeight: "400", backgroundColor: "rgb(238, 238, 238)" }}>SHIP TO<br />{ord.shipaddress.name}</th>
                                    <th style={{ fontSize: "small", fontFamily: "Rubik", fontWeight: "400", backgroundColor: "rgb(238, 238, 238)" }}>BILLED TO<br />{ord.billaddress.name}</th>
                                    <th style={{ fontSize: "small", fontFamily: "Rubik", fontWeight: "400", backgroundColor: "rgb(238, 238, 238)" }}>TOTAL AMOUNT<br />₹{ord.total}.00</th>
                                    <th style={{ fontSize: "small", borderTopRightRadius: "15px", fontFamily: "Rubik", fontWeight: "400", backgroundColor: "rgb(238, 238, 238)" }}>ORDER# {ord.orderid} </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ord.products.map((product, index) => (
                                    <tr key={product[0]}> {/* Assuming product[0] is unique */}
                                        <td><img src={hosturl + product[2]} style={{ width: "50px" }}></img></td>
                                        <td>{product[1]} <br /><h6 style={{ color: "red", fontFamily: "Rubik", fontSize: "small", fontWeight: "400" }}>₹{product[3]}.00</h6></td>
                                        <td></td>
                                        <td></td>
                                        <td>{index === 0 ? <><h6 style={{fontSize:"larger", color: "green" }}>{ord.status}</h6> <br /><button className='trbtn' onClick={()=>{
                                            window.location.href = `/dashboard/my_account/your-orders/order/${ord.orderid}`
                                        }}>View Details</button></> : ""}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            <div className='moborders'>
                {allorders.length > 0 && allorders.map(ord => (
                    <div className='orddiv'>
                        {ord.products.map((product, index) => (
                            <div key={product[0]}  onClick={()=>{
                                window.location.href = `/dashboard/my_account/your-orders/order/${ord.orderid}`
                            }}>
                                <div className='ordiv'>
                                    <img src={hosturl + product[2]} style={{ width: "70px", height: "70px", display: "inline-block" }} />
                                    <h6 className="card-text" style={{ marginLeft: "50px", display: "inline-block"}}>{product[1]}</h6>
                                    <h6 className="card-text" style={{ marginLeft: "120px",marginTop:"-20px"}}>{ord.status}</h6>
                                </div>
                            </div>))}
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Yourorders