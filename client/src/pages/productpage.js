import React, { useState, useEffect } from "react";
import Layout from './../components/Layout/Layout.js';
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./productpage.css"
import { useCart } from "../context/cart";

const ProductPage = () => {
    var hosturl = window.location.protocol + "//" + window.location.host+"/uploads/"
    const [product, setProducts] = useState([]);
    //const navigate = useNavigate();
    const [cart, setCart] = useCart()
    const params = useParams();
    const [pid, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mrp, setMrp] = useState("");
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState();
    const [Quantity, setQuantity] = useState(1)

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-page/${params.id}`);
            setProducts(data);
            setId(data.product._id);
            setName(data.product.name);
            setDescription(data.product.description);
            setImages(data.product.images);
            setMrp(data.product.mrp);
            setSelectedImage(data.product.images[0]);
            

            if (data.success) {
                // Do something if needed
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getSingleProduct(params.id);
    }, [params.id]); 

    return (
        <Layout>
            <div className="pdiv">
                <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
                    <Col className="colone">
                        <img src={hosturl+selectedImage} alt="" style={{ width: "80%" }}></img>
                        <div className="grid">
                            {images.map((image, index) => (
                                <div key={index} className="simg" >
                                        <img
                                            src={hosturl+image}
                                            alt=""
                                            className="cimg"
                                            // style={{ width: "50%" ,border: "1px solid black"}}
                                            onClick={() => setSelectedImage(image)} // Update selected image on click
                                        />
                                   
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col className="coltwo">
                        <h2 className="modln">{name}</h2>
                        <h3 className="mmrp">₹{mrp}.00</h3>
                        <label className="mrlabel">Sales Tax Included</label><br />
                        <label className="qtylabel">Quantity</label>
                        <input
                            type="number"
                            min={1}
                            defaultValue={1}
                            className="qty"
                            style={{ display: "block" }}
                            onChange={(e) => {
                                const newQuantity = parseInt(e.target.value); // Parse the value to an integer
                                setQuantity(newQuantity);
                            }}
                        />
                        <button className="addtc" onClick={() => {
                            const finalqty = [pid, name, images, mrp, Quantity];
                            setCart([...cart, finalqty]);
                        }}>Add to Cart</button><br />
                        <button className="buy">Buy Now</button>
                    </Col>
                </Row>
                <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
                    <pre className="descpre">{description}</pre>
                </Row>

            </div>

            <div className="spdiv">
                <h1>hai</h1>
                <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
                    <Col className="colone">
                        <img src={hosturl+selectedImage} alt="" style={{ width: "80%" }}></img>
                        <div className="grid">
                            {images.map((image, index) => (
                                <div key={index} className="simg" >
                                        <img
                                            src={hosturl+image}
                                            alt=""
                                            className="cimg"
                                            // style={{ width: "50%" ,border: "1px solid black"}}
                                            onClick={() => setSelectedImage(image)} // Update selected image on click
                                        />
                                   
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col className="coltwo">
                        <h2 className="modln">{name}</h2>
                        <h3 className="mmrp">₹{mrp}.00</h3>
                        <label className="mrlabel">Sales Tax Included</label><br />
                        <label className="qtylabel">Quantity</label>
                        <input
                            type="number"
                            min={1}
                            defaultValue={1}
                            className="qty"
                            style={{ display: "block" }}
                            onChange={(e) => {
                                const newQuantity = parseInt(e.target.value); // Parse the value to an integer
                                setQuantity(newQuantity);
                            }}
                        />
                        <button className="addtc" onClick={() => {
                            const finalqty = [pid, name, images, mrp, Quantity];
                            setCart([...cart, finalqty]);
                        }}>Add to Cart</button><br />
                        <button className="buy">Buy Now</button>
                    </Col>
                </Row>
                <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
                    <pre className="descpre">{description}</pre>
                </Row>

            </div>
        </Layout>
    );
}

export default ProductPage;
