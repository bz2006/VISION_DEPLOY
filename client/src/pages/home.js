import React from 'react'
import Layout from './../components/Layout/Layout.js';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { useAuth } from '../context/auth.js';
import "./home.css"


function HomePage() {
    const [auth] = useAuth()
    var hosturl = window.location.protocol + "//" + window.location.host+"/uploads/"

    // Log the main URL to the console
    console.log("Main URL: " + mainUrl);
    return (
        <Layout>
            <>

                <Image  src="https://static.wixstatic.com/media/c1ec53_be8960ac122345d59d16a1aaa2853c31~mv2.webp" className="responsive" />
                 <Image  src={hosturl+"home_logo_2p.png"} className="responsive1"  />
            </>
            <pre>{JSON.stringify(auth, null, 4)}</pre>


            <>
                <Container>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://static.wixstatic.com/media/c1ec53_f4c5c3b4d040405da443f39a5bfc47cb~mv2.png/v1/fill/w_625,h_625,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/c1ec53_f4c5c3b4d040405da443f39a5bfc47cb~mv2.png" className='crdimg' />
                        <Card.Body>
                            <Card.Title className='model'>2003 DLX</Card.Title>
                            <Card.Text className='price'>₹3550.00</Card.Text>


                            <Button variant="outline-success" size="lg" className='cardbtn'>Add To Cart</Button>
                        </Card.Body>
                    </Card>
                </Container>

            </>
        </Layout>
    )
}

export default HomePage