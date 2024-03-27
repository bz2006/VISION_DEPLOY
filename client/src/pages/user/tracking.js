import React from 'react'
import "./tracking.css"

export default function Tracking({status}) {
    
  return (
    <div className="container">
  {status === "Proccesing" && (
    <div className="row">
      <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
        <div className="row justify-content-between">
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Order Placed</p>
          </div>
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Proccesing</p>
          </div>
          <div className="order-tracking">
            <span className="is-complete"></span>
            <p>Shipped</p>
          </div>
          <div className="order-tracking">
            <span className="is-complete"></span>
            <p>Out for delivery</p>
          </div>
          <div className="order-tracking">
            <span className="is-complete"></span>
            <p>Delivered</p>
          </div>
        </div>
      </div>
    </div>
  )}
  {status === "Shipped" && (
    <div className="row">
      <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
      <div className="row justify-content-between">
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Order Placed</p>
          </div>
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Proccesing</p>
          </div>
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Shipped</p>
          </div>
          <div className="order-tracking">
            <span className="is-complete"></span>
            <p>Out for delivery</p>
          </div>
          <div className="order-tracking">
            <span className="is-complete"></span>
            <p>Delivered</p>
          </div>
        </div>
      </div>
    </div>
  )}
  {status === "Out for delivery" && (
    <div className="row">
      <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
      <div className="row justify-content-between">
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Order Placed</p>
          </div>
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Proccesing</p>
          </div>
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Shipped</p>
          </div>
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Out for delivery</p>
          </div>
          <div className="order-tracking">
            <span className="is-complete"></span>
            <p>Delivered</p>
          </div>
        </div>
      </div>
    </div>
  )}
  
  {status === "Delivered" && (
    <div className="row">
      <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
      <div className="row justify-content-between">
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Order Placed</p>
          </div>
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Proccesing</p>
          </div>
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Shipped</p>
          </div>
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Out for delivery</p>
          </div>
          <div className="order-tracking completed">
            <span className="is-complete"></span>
            <p>Delivered</p>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

  )
}
