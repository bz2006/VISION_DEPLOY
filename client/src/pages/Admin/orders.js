import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/Layout/admin/adminSidebar'
import AdminHeader from '../../components/Layout/admin/adminheader'
import axios from 'axios'
import "./Admindashboard.css"


const Orders = () => {

  const [allorders, setAllorders] = useState([])
  var hosturl = window.location.protocol + "//" + window.location.host + "/uploads/"

  const getallOrders = async () => {

    const orders = await axios.get("/api/v1/orders/get-allorders");
    setAllorders(orders.data)

  }
  useEffect(() => {
    getallOrders()
  }, [])
  return (
    <body className='body'>
      <div className="container-fluid ">
        <div className="row">
          <AdminHeader />

          <AdminSidebar />

          <div className="col-md-3">
            <div>
            <h2 style={{ margin: "30px", fontFamily: "Rubik", fontWeight: "400" }}>Orders</h2>
              <div>
                <div className='tb'>
                  <table>
                    <thead>
                      <tr>
                        <th>Order #</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody >
                      {allorders.length > 0 && allorders.map(ord => (
                          <tr key={ord._id} className='orderow' onClick={()=>{
                            window.location.href = `/dashboard/manage.vision/admin/order/${ord.orderid}`;
                          }}>
                            <td>#{ord.orderid}</td>
                            <td>{ord.orderdate}</td>
                            <td>{ord.shipaddress.name}</td>
                            <td>{ord.total}.00</td>
                            <td>{ord.status}</td>

                          </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body >
  )
}

export default Orders