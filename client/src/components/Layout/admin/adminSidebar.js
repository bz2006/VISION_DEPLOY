// AdminSidebar.js

import React from 'react';
import { Nav } from 'react-bootstrap';
import "./adminSidebar.css";

function AdminSidebar() {
  return (
    <div className='sidebar'>
      <ul className='ul'>
        <li className='li'><Nav.Link href="/dashboard/manage.vision/admin" className='a'>Home</Nav.Link></li>

        <li className='li'>
          <Nav.Link href="/dashboard/manage.vision/admin/products" className='a'>Store Products      </Nav.Link>
          <ul className='submenu'>
            <li className='subli'><Nav.Link href="/dashboard/manage.vision/admin/products" className='a'>All Products</Nav.Link></li>
            <li className='subli'><Nav.Link href="/dashboard/manage.vision/admin/create-product" className='a'>Create Product</Nav.Link></li>
          </ul>
        </li>

        <li className='li'><Nav.Link href="/dashboard/manage.vision/admin/orders" className='a'>Orders</Nav.Link></li>
        <li className='li'><Nav.Link href="/dashboard/manage.vision/admin/users" className='a'>Users</Nav.Link></li>
        <li className='li'><Nav.Link href="/dashboard/manage.vision/admin/catagory" className='a'>Category</Nav.Link></li>



      </ul>
    </div>
  );
}

export default AdminSidebar;
