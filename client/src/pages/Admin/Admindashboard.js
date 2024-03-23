import React from 'react'
import AdminSidebar from '../../components/Layout/admin/adminSidebar'
import AdminHeader from '../../components/Layout/admin/adminheader'
import "./Admindashboard.css"


const Admindashboard = () => {
  var hosturl = window.location.protocol + "//" + window.location.host+"/uploads/"
  return (
    <body className='body'>
      <div className="container-fluid ">
        <div className="row">
          <AdminHeader />

          <AdminSidebar />

          <div className="col-md-3">
            <div>
              <img src={hosturl+"Screenshot_(41).png"} style={{width:"1020px"}}></img>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Admindashboard