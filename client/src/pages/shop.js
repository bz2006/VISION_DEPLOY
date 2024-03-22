import React, { useState, useEffect } from "react";
import Layout from './../components/Layout/Layout.js';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Row from 'react-bootstrap/Row';
import axios from "axios";
import "./productpage.css"




const ShopPage = () => {
    var hosturl = window.location.protocol + "//" + window.location.host+"/uploads/"
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    const getAllproducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/shop-products");
            setProducts(data.productList);
            console.log(data)
            if (data.success) {
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

    return (

        <Layout>
            <div style={{ margin: '50px 80px' }}>

                <Row xs={1} md={2} className="g-4 row row-cols-md-4 row-cols-1">
                    {products.map(product => (
                        <Col key={product._id} className="colone">
                            <Card className="shcard" onClick={() => { navigate(`/product-page/${product._id}`) }} style={{borderColor:"white",cursor:"pointer"}}>
                                <Card.Img variant="top" src={hosturl+product.images[0]}  />
                                <Card.Body >
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text style={{fontSize:"larger", color:"rgb(201, 8, 8)",fontWeight:"500"}}>
                                        ₹{product.mrp}.00 </Card.Text>
                                    <Card.Text style={{fontSize:"x-small",fontWeight:"500",marginTop:"-15px"}}>Sales Tax Included</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

        </Layout >

    )
}


export default ShopPage