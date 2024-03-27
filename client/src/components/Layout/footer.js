import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import "./footer.css"

const Footer = () => {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/get-category");
      if (data.success) {
        setCategories(data.category);

      }
    } catch (error) {
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);


  return (
    <footer style={{ backgroundColor: "rgb(218, 218, 218)", color: "black", marginTop: "100px" }}>
      <Container>
        < Row xs={1} md={4} className="g-4 row-cols-md-2 row-cols-1">
          <Col className='coool'>
             <a href="/">
              <img src="https://static.wixstatic.com/media/c1ec53_cdb43083bb05441ca9fb28a5027a7306~mv2.webp" className='brimg' alt="" />
            </a>
            <p className="my-3" style={{ maxWidth: '250px', textDecoration: "none", color: "black" }}>
              We are creating High-Quality Resources and tools to Aid developers during the development of their projects
            </p> 
          </Col>
          <Col className='one'>
            <h4>CATEGORIES</h4>
            
              {categories.map(c => (
                <div className='cont1' key={c._id}>
                  <a onClick={() => {  navigate(`/shop/${c._id}`) }} style={{ textDecoration: "none", color: "black" }} className='mobnav'>{c.name}</a>
                </div>
              ))}
          </Col>
          <Col className='one'>
            <h4>HELP</h4>
            <div className='cont1'>
              <a href="/" style={{ textDecoration: "none", color: "black" }}>Warranty  Support</a><br />
              <a href="/" style={{ textDecoration: "none", color: "black" }}>Replacement & Cancellation</a><br />
              <a href="/" style={{ textDecoration: "none", color: "black" }}>Shipping & Delivery</a><br /></div>
          </Col>
          <Col className='one' >
            <h4>COMPANY</h4>
            <div className='cont1'>
              <a href="/" style={{ textDecoration: "none", color: "black" }}>About Vision Quartz</a><br />
              <a href="/" style={{ textDecoration: "none", color: "black" }}>Terms And Conditions</a><br />
              <a href="/" style={{ textDecoration: "none", color: "black" }}>Privacy Policy</a><br /></div>
          </Col>
        </Row></Container >
    </footer >
  )
}

export default Footer