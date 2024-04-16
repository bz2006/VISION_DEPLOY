import { Routes, Route } from "react-router-dom"
import React from 'react';
import HomePage from "./pages/home"
import Whoarewe from "./pages/about"
import Contact from "./pages/contact"
import Pagenf from "./pages/404";
import Signup from "./pages/Auth/signup";
import Login from "./pages/Auth/login";
import axios from "axios"
import { AuthProvider } from "./context/auth";
import Dashboard from "./pages/user/dashboard";
import PrivateRoute from "./components/Layout/Routes/private";
import AdminRoute from "./components/Layout/Routes/adminRoute";
import Admindashboard from "./pages/Admin/Admindashboard";
import Users from "./pages/Admin/users";
import Orders from "./pages/Admin/orders";
import CreateCategory from "./pages/Admin/catagory";
import Products from "./pages/Admin/products";
import Youraddress from "./pages/user/youraddress";
import CreateProduct from "./pages/Admin/createproducts";
import UpdateProduct from "./pages/Admin/updateproducts";
import Yourorders from "./pages/user/yourorders";
import ShopPage from "./pages/shop";
import ProductPage from "./pages/productpage";
import CartPage from "./pages/cartPage";
import Checkout from "./pages/user/checkout"
import OrderDetails from "./pages/Admin/orderDetails";
import UserOrderDetails from "./pages/user/userorderDetails";

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true



function App() {
  return (
    <AuthProvider>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<Whoarewe />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/shop/:id" element={<ShopPage />} />
          <Route path="/product-page/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Pagenf />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="my_account" element={<Dashboard />} />
            <Route path="my_account/your-orders" element={<Yourorders />} />
            <Route path="my_account/your-address" element={<Youraddress />} />
            <Route path="my_account/your-orders/order/:id" element={<UserOrderDetails />} />
          </Route>
          <Route path="/order" element={<PrivateRoute />}>
            <Route path="checkout-order" element={<Checkout />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="manage.vision/admin" element={<Admindashboard />} />
            <Route path="manage.vision/admin/products" element={<Products />} />
            <Route path="manage.vision/admin/users" element={<Users />} />
            <Route path="manage.vision/admin/orders" element={<Orders />} />
            <Route path="manage.vision/admin/catagory" element={<CreateCategory />} />
            <Route path="manage.vision/admin/create-product" element={<CreateProduct />} />
            <Route path="manage.vision/admin/update-product/:id" element={<UpdateProduct />} />
            <Route path="manage.vision/admin/order/:id" element={<OrderDetails />} />
          </Route>
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
