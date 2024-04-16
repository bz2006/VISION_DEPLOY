import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout.js';
import { useAuth } from '../context/auth.js';
import "./home.css"
import Featuredproducts from './featuredproducts.js';


function HomePage() {
    const [auth] = useAuth()
    var mainUrl = window.location.protocol + "//" + window.location.host;
    return (
        <Layout>
            <>
                <img src="https://static.wixstatic.com/media/c1ec53_be8960ac122345d59d16a1aaa2853c31~mv2.webp" className="responsive" />
                <img src={hosturl+"home_logo_2p.png"} className="responsive1" />
            </>
          <Featuredproducts/>
        </Layout>
    )
}

export default HomePage