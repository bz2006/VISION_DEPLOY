import React, { useState, useEffect } from "react";
import AdminSidebar from '../../components/Layout/admin/adminSidebar'
import AdminHeader from '../../components/Layout/admin/adminheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import toast from "react-hot-toast";
import "./Admindashboard.css"
const Products = () => {
  var hosturl = window.location.protocol + "//" + window.location.host+"/uploads/"

  const [products, setProducts] = useState([]);


  const getAllproducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/getall-product");
      setProducts(data.productList);
      if (data.success) {

        console.log(data)
        console.log("Products State:", setProducts);
        console.log(products)


      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };


  useEffect(() => {
    getAllproducts();
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

        getAllproducts();
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
              <h3>Products</h3>
              <div className='tb'>
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Inventory</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 && products.map(product => (
                      <tr key={product._id}>
                        <td><img src={hosturl+product.images[0]} alt="" style={{ height: "60px" }}></img></td>
                        <td>{product.name}</td>
                        <td>{product.mrp}</td>
                        <td>{product.InStock === 0 ? 'In stock' : 'Out of stock'}</td>
                        <td><a href={`/dashboard/manage.vision/admin/update-product/${product._id}`}><FontAwesomeIcon icon={faPen} className="prupd" /></a></td>
                        <td className="delth"><FontAwesomeIcon className="delpr" icon={faTrashCan} onClick={() => {
                          handleDelete(product._id);
                        }} /></td>
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

export default Products