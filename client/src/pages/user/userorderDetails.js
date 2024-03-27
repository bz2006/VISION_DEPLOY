import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import Tracking from "./tracking";
import "./orders.css"



const UserOrderDetails = () => {
  var hosturl = window.location.protocol + "//" + window.location.host + "/uploads/"


  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("")
  const params = useParams();


  const getSingleOrder = async () => {
    try {
      const singleorder = await axios.get(`/api/v1/orders/user-order/${params.id}`);
      setOrder(singleorder.data);
    } catch (error) {
      toast.error("Something went wrong in getting catgeory");
    }
  };



  useEffect(() => {
    getSingleOrder(params.id);

  }, []);



  return (
    <Layout>
      <div className='codiv'>
        <h1>Order Summary</h1>
        {order.length > 0 && order.map(ord => (
          <>
        <h6>Order# &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ord.orderid}</h6>
        <h6>Order Date &nbsp;&nbsp;{ord.orderdate}</h6>
        <Tracking status={ord.status}/>
        </>))}
        
        <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
          <Col className='ordcol1'>
            <div style={{ display: "inline-block" }}>
              <h6 style={{ marginTop: "15px" }}>Shipping Address</h6>
              {order.length > 0 && order.map((ord,index) => (
                <div>
                  <h6 style={{ fontSize: "17px", fontFamily: "Rubik", fontWeight: "500", marginTop: "15px" }}>{ord.shipaddress.name}</h6>
                  <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.address}</h6>
                  <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.city}</h6>
                  <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.state}</h6>
                  <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.country}</h6>
                  <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.pin}</h6>
                  <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.phone}</h6>
                </div>
              ))}
            </div>
            <div style={{ display: "inline-block", marginLeft: "80px" }}>
              <h6 style={{ marginTop: "15px" }}>Billing Address</h6>
              {order.length > 0 && order.map(ord => (
                <div>
                  <h6 style={{ fontSize: "17px", fontFamily: "Rubik", fontWeight: "500", marginTop: "15px" }}>{ord.billaddress.name}</h6>
                  <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.address}</h6>
                  <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.city}</h6>
                  <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.state}</h6>
                  <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.country}</h6>
                  <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.pin}</h6>
                  <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.phone}</h6>

                </div>

              ))}
            </div>
            <div style={{ display: "inline-block", marginLeft: "110px" ,position:"absolute"}}>

              {order.length > 0 && order.map(ord => (
                <div>
                  <h6 style={{ marginTop: "15px", display: "inline-block" }}>Payment Method&nbsp;&nbsp;&nbsp;&nbsp; <h6 style={{ marginLeft:"30px",fontSize:"larger",display: "inline-block", color: "green" }}>{ord.status}</h6></h6>
                  <div>
                    <img src={hosturl + "Razorpay_payments.png"} style={{ width: "120px", marginBottom: "300px" }} />
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col className='ordcol2'>
            <h5>Order Summary</h5>
            {order.length > 0 && order.map(ord => (
              <>
                <h6 style={{ display: "inline-block", fontFamily: "Rubik", fontWeight: "400" }}>Sub Total </h6><h6 style={{ display: "inline-block", float: "right", fontFamily: "Rubik", fontWeight: "400" }}>{ord.total}</h6><br />
                <h6 style={{ display: "inline-block", fontFamily: "Rubik", fontWeight: "400" }}>Delivery </h6><h6 style={{ display: "inline-block", float: "right", fontFamily: "Rubik", fontWeight: "400" }}>Free</h6>
                <hr />
                <h6 style={{ display: "inline-block", fontFamily: "Rubik", fontWeight: "500", color: "rgb(160, 0, 0)" }}>Grand Total </h6><h6 style={{ display: "inline-block", color: "rgb(160, 0, 0)", float: "right", fontFamily: "Rubik", fontWeight: "500" }}>₹{ord.total}.00</h6>
                <h6 style={{ fontFamily: "Rubik", fontSize: "smaller", fontWeight: "400" }}>Taxes Included</h6>
              </>
            ))}
          </Col>
        </Row >
        <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
          <Col className='ordcol3'>
            <table style={{ width: "max-content" }}>
              {order.length > 0 && order.map(ord => (
                <tbody>
                  {ord.products.map(product => (
                    <tr key={product[0]} >
                      <td style={{ height: "100px", fontSize: "larger", fontFamily: "Rubik", backgroundColor: "white" }}><img src={hosturl + product[2]} alt="" style={{ width: "70px" }}></img></td>
                      <td style={{ height: "100px", fontSize: "small", fontFamily: "Rubik", backgroundColor: "white" }}>{product[1]}</td>
                      <td style={{ height: "100px", fontSize: "small", fontFamily: "Rubik", backgroundColor: "white" }}> ₹{product[3]}.00 </td>
                      <td style={{ height: "100px", fontSize: "small", fontFamily: "Rubik", backgroundColor: "white" }}> x{product[4]}</td>
                      <td style={{ height: "100px", fontSize: "small", fontFamily: "Rubik", backgroundColor: "white" }}>₹{product[3] * product[4]}.00 </td>
                    </tr>))}
                </tbody>))}
            </table>
          </Col>
        </Row>
      </div>




      <div className="moborddetails">
        
        {order.length > 0 && order.map(ord => (
          <>
          <div className="orddet">
            <h6 >Order# &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ord.orderid}</h6>
            <h6 >Order Date &nbsp;&nbsp;&nbsp;{ord.orderdate}</h6>
            <h6 >Order Total &nbsp;&nbsp;&nbsp;₹{ord.total}.00</h6>
          </div>
          <Tracking status={ord.status}/>
          <div className='orddiv'>
            {ord.products.map((product, index) => (
              <div key={product[0]}>
                <div className='ordiv'>
                  <img src={hosturl + product[2]} style={{ width: "50px", height: "50px", display: "inline-block" }} />
                  <h6 style={{ marginLeft: "30px", display: "inline-block" }}>{product[1]}</h6>
                  <h6 style={{ marginLeft: "60px", display: "inline-block" }}>x{product[4]}</h6>
                  <h6 style={{ marginLeft: "80px", marginTop: "-20px" }}>{ord.status}</h6>
                </div>
              </div>))}
          </div>
          </>
        ))}

        {order.length > 0 && order.map(ord => (
          <div className="ordadrsdiv">
            <div className="userstatusdiv">
              <h6 style={{ marginTop: "15px" }}>Shipping Address</h6>
              <div >

                <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500", marginTop: "15px" }}>{ord.shipaddress.name}</h6>
                <h6 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.address}</h6>
                <h6 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.city}</h6>
                <h6 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.state}</h6>
                <h6 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.country}</h6>
                <h6 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.pin}</h6>
                <h6 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.shipaddress.phone}</h6>

              </div>


            </div>
            <div className="userstatusdiv">
              <h6 style={{ marginTop: "15px" }}>Billing Address</h6>



              <div>
                <h6 style={{ fontSize: "15px", fontFamily: "Rubik", fontWeight: "500", marginTop: "15px" }}>{ord.billaddress.name}</h6>
                <h6 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.address}</h6>
                <h6 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.city}</h6>
                <h6 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.state}</h6>
                <h6 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.country}</h6>
                <h6 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.pin}</h6>
                <h6 style={{ fontSize: "13px", fontFamily: "Rubik", fontWeight: "500" }}>{ord.billaddress.phone}</h6>
              </div>
            </div>
          </div>))}
      </div>



    </Layout >
  )

}


export default UserOrderDetails