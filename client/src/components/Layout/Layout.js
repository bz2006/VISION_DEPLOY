import React from 'react'
import Footer from "./footer.js"
import Header from './header.js';
import { Toaster } from 'react-hot-toast';



function Layout(props) {
  return (
    
    <div>
      <Header/>
      <main>
        {props.children}
      </main>
      <Toaster />
      <Footer />
    </div>
  )
}

export default Layout