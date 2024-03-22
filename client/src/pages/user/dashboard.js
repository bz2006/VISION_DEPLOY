import React from 'react';
import Layout from '../../components/Layout/Layout';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import "./dashboard.css";

const Dashboard = () => {
    return (
        <Layout>
            <div style={{ margin: '50px 220px' }}>
                <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
                    <Col >
                        <a href='my_account/your-orders' style={{ textDecoration: "none", color: "black" }}>
                            <div className='btns d-flex align-items-center'>
                                <div className='column'>
                                    <FontAwesomeIcon icon={faBox} size="3x" style={{ color: "#01403F" }} />
                                </div>
                                <div className='column2'>
                                    <h4 style={{ fontFamily: "Rubik", fontWeight: "400" }}>Your Orders</h4>
                                    <h6 style={{ marginTop: "-6px", fontFamily: "Rubik", fontWeight: "300" }}>Track, return and more</h6>
                                </div>
                            </div>
                        </a>
                    </Col>
                    <Col >
                        <a href="/" style={{ textDecoration: "none", color: "black" }}>
                            <div className='btns d-flex align-items-center'>
                                <div className='column'>
                                    <FontAwesomeIcon icon={faLock} size='3x' style={{ color: "#01403F" }} />
                                </div>
                                <div className='column2'>
                                    <h4 style={{ fontFamily: "Rubik", fontWeight: "400" }}>Login & Security</h4>
                                    <h6 style={{ marginTop: "-6px", fontFamily: "Rubik", fontWeight: "300" }}>Edit login, name, mobile number</h6>
                                </div>
                            </div>
                        </a>
                    </Col>
                    <Col>
                        <a href="my_account/your-address" style={{ textDecoration: "none", color: "black" }}>
                            <div className='btns d-flex align-items-center'>
                                <div className='column'>
                                    <FontAwesomeIcon icon={faMapLocationDot} size="3x" style={{ color: "#01403F" }} />
                                </div>
                                <div className='column2'>
                                    <h4 style={{ fontFamily: "Rubik", fontWeight: "400" }}>Your Addresses</h4>
                                    <h6 style={{ marginTop: "-6px", fontFamily: "Rubik", fontWeight: "300" }}>Add, edit or remove address</h6>
                                </div>
                            </div>
                        </a>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Dashboard;
