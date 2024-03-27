import React, { useState, useEffect } from "react";
import AdminSidebar from '../../components/Layout/admin/adminSidebar'
import AdminHeader from '../../components/Layout/admin/adminheader'
import axios from "axios";
import { toast } from 'react-toastify';
import "./Admindashboard.css"
const Users = () => {
  const [users, setUsers] = useState([]);


  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/getall-users");
      setUsers(data.usersList);
    } catch (error) {
      toast.error("Something went wrong in getting users");
    }
  };


  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <body className='body'>
      <div className="container-fluid ">
        <div className="row">
          <AdminHeader />

          <AdminSidebar />

          <div className="col-md-3">
            <div>
            <h2 style={{ margin: "30px", fontFamily: "Rubik", fontWeight: "400" }}>Users</h2>
              <div className='tb'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Orders Placed</th>
                      <th>Date of Sign Up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 && users.map(user => (
                      <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.ordersNo === 0 ? 'No Orders Placed' :     user.ordersNo}</td>
                        <td>{user.date}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Users