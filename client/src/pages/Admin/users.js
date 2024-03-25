import React, { useState, useEffect } from "react";
import AdminSidebar from '../../components/Layout/admin/adminSidebar'
import AdminHeader from '../../components/Layout/admin/adminheader'
import axios from "axios";
import toast from "react-hot-toast";
import "./Admindashboard.css"
const Users = () => {
  const [users, setUsers] = useState([]);


  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/getall-users");
      setUsers(data.usersList);
      if (data.success) {

        console.log(data)
        console.log("Products State:", setUsers);
        console.log(Users)


      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };


  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //delete product
  const handleDelete = async (Id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${Id}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    <body className='body'>
      <div className="container-fluid ">
        <div className="row">
          <AdminHeader />

          <AdminSidebar />

          <div className="col-md-3">
            <div>
              <h3>Users</h3>
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
                        <td>{user.ordersNo === 0 ? 'No Orders Placed' : user.ordersNo + " Orders"}</td>
                        <td>{user.createdAt}</td>
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