import React from 'react'
import "./404.css"

function Pagenf() {
    var hosturl = window.location.protocol + "//" + window.location.host + "/uploads/"
    return (
        <>
            <img src={hosturl + "404.png"} className='pof' alt='' />
            <img src={hosturl + "404mob-min.png"} className='mobpof' alt='' />
        </>
    )
}

export default Pagenf