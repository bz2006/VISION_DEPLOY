import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import "./header.css"
import Image from 'react-bootstrap/Image';
//import Button from 'react-bootstrap/Button';
import { useAuth } from '../../context/auth';
import Dropdown from 'react-bootstrap/Dropdown';
//import {NavLink} from "react-router-dom"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';


const Header = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth();
  const [cart] = useCart()
  const [sidebar, setShowsidebar] = useState(false);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const showSidebar = () => setShowsidebar(!sidebar);
  const closeSidebar = () => setShowsidebar(false);

  return (
    <>
      <div className='mobhead'>
        <FontAwesomeIcon icon={faBars} size='2xl' onClick={showSidebar} />
        <img src="https://static.wixstatic.com/media/c1ec53_cdb43083bb05441ca9fb28a5027a7306~mv2.webp" onClick={() => { navigate("/") }} className='mobbrimg'></img>
        <FontAwesomeIcon icon={faCartShopping} onClick={() => { navigate("cart") }} size='2xl' style={{ float: "right" }} />
      </div>
      <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <FontAwesomeIcon icon={faXmark} onClick={closeSidebar} size='2x' color='black' style={{float:"right"}}/>
        <a herf="/"className='mobnav' >Home</a><br/>
        <a herf="about"className='mobnav'>Who Are We</a><br/>
        <a herf="contactus"className='mobnav'>Contact Us</a>

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
                    <NavDropdown.Item href="/shop" >Plain</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Musical
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Antique</NavDropdown.Item>


                  </NavDropdown>
                  <Nav.Link href='about' className='hom'>Who Are We</Nav.Link>
                  <Nav.Link href="contactus" className='hom'>Contact Us</Nav.Link>
                  <Nav.Link href="/cart" className='hom'><FontAwesomeIcon icon={faCartShopping} /> {cart?.length} Items</Nav.Link>
                  {!auth.user ? (<>
                    <Dropdown>
                      <Dropdown.Toggle variant="succss" className='drop' >
                        Account
                      </Dropdown.Toggle>

                      <Dropdown.Menu className='dropmenu'>
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
                    <Dropdown.Toggle variant="" id="dropdown-basic" >Account
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='drop2'>
                      <Dropdown.ItemText>Welcome, {auth?.user?.username}</Dropdown.ItemText>
                      <Dropdown.Item href="#/action-2">My Orders</Dropdown.Item>
                      <Dropdown.Item href={`/dashboard/${auth?.user?.role === 1 ? "manage.vision/admin" : "my_account"}`}>My Account</Dropdown.Item>
                      <Dropdown.Item href="/" onClick={handleLogout}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>)}

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