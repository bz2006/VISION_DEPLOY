import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import "./header.css"
import Image from 'react-bootstrap/Image';
import { useAuth } from '../../context/auth';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useCart } from '../../context/cart';


const Header = () => {
  var hosturl = window.location.protocol + "//" + window.location.host + "/uploads/"
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth();
  const [cart] = useCart()
  const [categories, setCategories] = useState([]);
  const [sidebar, setShowsidebar] = useState(false);
  const [catbar, setShowcatbar] = useState(false);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    toast.success("Logout Successfully");
  };

  const showSidebar = () => setShowsidebar(!sidebar);
  const closeSidebar = () => setShowsidebar(false);
  const showCatbar = () => setShowcatbar(!catbar);
  const closeCatbar = () => setShowcatbar(false);


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/get-category");
      if (data.success) {
        setCategories(data.category);

      }
    } catch (error) {
      toast.error("Something went wrong in getting catgeory");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <div className='mobhead'>

        <FontAwesomeIcon icon={faBars} size='2xl' onClick={showSidebar} />
        <img src="https://static.wixstatic.com/media/c1ec53_cdb43083bb05441ca9fb28a5027a7306~mv2.webp" onClick={() => { navigate("/") }} className='mobbrimg' alt=''></img>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "-27px" }}>
          {!auth.user ? (<a href='login' style={{ textDecoration: "none", fontSize: "large" }}>Log In</a>) : (<FontAwesomeIcon icon={faUser} size='xl' onClick={() => { navigate("/dashboard/my_account") }} />)}
          <FontAwesomeIcon icon={faCartShopping} onClick={() => { navigate("/cart") }} size='xl' style={{ marginLeft: "25px" }} />
        </div>

        {/* Side Nav */}
        <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <FontAwesomeIcon icon={faXmark} onClick={closeSidebar} size='2x' color='black' style={{ float: "right" }} />
          {!auth.user ? (<a href='login' style={{ textDecoration: "none", fontSize: "larger" }}>Log In</a>) : (<h3>Hi, {auth.user.username}</h3>)}
          <div className='navigators'>
            <a onClick={() => { closeSidebar(); navigate("/") }} className='mobnav'>Home</a><br />
            <a onClick={() => { closeSidebar(); showCatbar() }} className='mobnav' >Category</a><br />
            <a onClick={() => { closeSidebar(); navigate("/about") }} className='mobnav' >Who Are We</a><br />
            <a onClick={() => { closeSidebar(); navigate("/contactus") }} className='mobnav'>Contact Us</a><br />
            {!auth.user ? (<hr />) : (<a onClick={handleLogout} className='mobnav'>Log Out</a>)}
          </div>

        </div>
        <div className={catbar ? 'nav-cat-menu active' : 'nav-cat-menu'}>
          <FontAwesomeIcon icon={faXmark} onClick={closeCatbar} size='2x' color='black' style={{ float: "right" }} />
          <Container className='catnavigators'>
            {categories.map(c => (
              <div key={c._id} >
                <a onClick={() => { closeSidebar(); navigate(`/shop/${c._id}`) }}  className='mobnav'>{c.name}</a>
              </div>
            ))}
          </Container>
        </div>
      </div>
      <div className='pcheader'>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Brand href="/" className='brimg'><><Image src="https://static.wixstatic.com/media/c1ec53_cdb43083bb05441ca9fb28a5027a7306~mv2.webp" fluid className='brimg' /></></Navbar.Brand>
          <Container className='head'>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <div className='hddiv'>
                  <Nav.Link href="/" className='homm'>Home</Nav.Link>
                  <NavDropdown title="Shop" id="basic-nav-dropdown" className='hom'>
                  {categories.map((c) => (
    <NavDropdown.Item key={c._id} href={`/shop/${c._id}`} >{c.name}</NavDropdown.Item>
  ))}


                  </NavDropdown>
                  <Nav.Link href='/about' className='hom'>Who Are We</Nav.Link>
                  <Nav.Link href="/contactus" className='hom'>Contact Us</Nav.Link>

                  {!auth.user ? (<>
                    <Dropdown>
                      <Dropdown.Toggle variant="succss" className='drop' >
                        Log In
                      </Dropdown.Toggle>

                      <Dropdown.Menu className='dropmenu '>
                        <Link to="/login">
                          {sessionStorage.setItem("redirectUrl", window.location.pathname)}
                          <button className='lrrbtn' style={{ backgroundColor: "white", color: "black" }}>Log In</button>
                        </Link>
                        <Link to="/signup">
                          <button className='lrrbtn'>Sign Up</button>
                        </Link>

                      </Dropdown.Menu>
                    </Dropdown>
                  </>) : (<Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic" ><img className='gif' src={hosturl+"Account.gif"}/>Account
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='drop2'>
                      <Dropdown.ItemText>Welcome, {auth?.user?.username}</Dropdown.ItemText>
                      <Dropdown.Item href="/dashboard/my_account/your-orders">My Orders</Dropdown.Item>
                      <Dropdown.Item href={`/dashboard/${auth?.user?.role === 1 ? "manage.vision/admin" : "my_account"}`}>My Account</Dropdown.Item>
                      <Dropdown.Item href="/" onClick={handleLogout}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>)}
                  <Nav.Link href="/cart" className='hom'><FontAwesomeIcon icon={faCartShopping} /> {cart?.length} Items</Nav.Link>
                </div>
              </Nav>


            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

export default Header